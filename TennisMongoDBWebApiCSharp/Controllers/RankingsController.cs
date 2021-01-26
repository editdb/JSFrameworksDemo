using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TennisMongoDB.Models;
using TennisMongoDB.Utils;
using TennisMongoDB.ViewModels;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TennisMongoDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RankingsController : ControllerBase
    {
        TennisDatabaseContext _context;

        public RankingsController(TennisDatabaseContext context) : base()
        {
            _context = context;
        }

        [HttpGet]
        [Route("/api/rankingsListv2/{year}/{gender}")]
        public async Task<ActionResult<IEnumerable<string>>> GetRankingsListv2(int year, char gender)
        {
            var filterYear = Builders<BsonDocument>.Filter.Eq("Year", year);
            var filterGender = Builders<BsonDocument>.Filter.Eq("Player.Gender", gender.ToString());
            var filter = Builders<BsonDocument>.Filter.And(filterYear, filterGender);

            IAggregateFluent<BsonDocument> rankingsPlayer = _context.rankings.Aggregate()
               .Lookup<BsonDocument, BsonDocument, BsonDocument>(
                    _context.players,
                    r => r["Player_id"],
                    p => p["_id"],
                    r => r["Player"]
                )
               .Sort(Builders<BsonDocument>.Sort.Ascending(o => o["Rank"]))
               .Unwind(r => r["Player"])
               .Lookup<BsonDocument, BsonDocument, BsonDocument>(
                    _context.countries,
                    p => p["Player.Country_id"],
                    c => c["_id"],
                    p => p["Country"]
                )
               .Unwind(p => p["Country"]);


            rankingsPlayer = rankingsPlayer.Match(filter);

            var listRankings = await rankingsPlayer.ToListAsync();

            foreach (BsonDocument doc in listRankings) {
                doc.InsertAt(0, new BsonElement("Id", doc["_id"]));
                doc.Remove("_id");
                doc.InsertAt(1, new BsonElement("PlayerId", doc["Player_id"]));
                doc.Remove("Player_id");
                doc.InsertAt(2, new BsonElement("PlayerName", doc["Player"]["Name"]));
                doc.InsertAt(3, new BsonElement("CountryId", doc["Player"]["Country_id"]));
                doc.InsertAt(4, new BsonElement("CountryCode", doc["Country"]["Code"]));
                doc.InsertAt(5, new BsonElement("CountryName", doc["Country"]["Name"]));
                doc.InsertAt(6, new BsonElement("CountryImageLink", doc["Country"]["ImageLink"]));
                doc.Remove("Player");
                doc.Remove("Country");
            }

            return Ok(listRankings.ToJson());
        }

        [HttpGet]
        [Route("/api/rankingsList/{year}/{gender}")]
        public async Task<ActionResult<IEnumerable<object>>> GetRankingsList(int year, char gender)
        {
            var q =
            from r in _context.rankings.AsQueryable()
            join p in _context.players.AsQueryable() on r["Player_id"] equals p["_id"]
            join c in _context.countries.AsQueryable() on p["Country_id"] equals c["_id"]
            where r["Year"] == year && p["Gender"] == gender.ToString()
            orderby r["Rank"]
            select new RankingsList
            {
                Id = (long)r["_id"],
                PlayerId = (long)r["Player_id"],
                PlayerName = (string)p["Name"],
                CountryId = (long)p["Country_id"],
                CountryCode = (string)c["Code"],
                CountryName = (string)c["Name"],
                CountryImageLink = (string)c["ImageLink"],
                Movement = (int?)r["Movement"],
                Rank = (int?)r["Rank"],
                Points = (int?)r["Points"],
                PrizeMoney = (int?)r["PrizeMoney"],
                SinglesTitles = (int?)r["SinglesTitles"],
                DoublesTitles = (int?)r["DoublesTitles"],
                SinglesWin = (int?)r["SinglesWin"],
                SinglesLoss = (int?)r["SinglesLoss"],
                Year = (int)r["Year"],
                Gender = (string)p["Gender"]
            };

            return await q.ToListAsync();
        }


        // GET api/Rankings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Object>> Get(long id)
        {

            var q =
                from r in _context.rankings.AsQueryable()
                where r["_id"] == id
                select new
                {
                    Id = (long)r["_id"],
                    PlayerId = (long)r["Player_id"],
                    Movement = (int?)r["Movement"],
                    Rank = (int?)r["Rank"],
                    Points = (int?)r["Points"],
                    PrizeMoney = (int?)r["PrizeMoney"],
                    SinglesTitles = (int?)r["SinglesTitles"],
                    DoublesTitles = (int?)r["DoublesTitles"],
                    SinglesWin = (int?)r["SinglesWin"],
                    SinglesLoss = (int?)r["SinglesLoss"],
                    Year = (int)r["Year"],
                };
            var res = await q.ToListAsync();
            if (res.Count > 0) {
                return res[0];
            }
            else {
                return NotFound();
            }
        }

        [HttpGet]
        [Route("/api/years")]
        public async Task<ActionResult<IEnumerable<int>>> years()
        {
            ActionResult<IEnumerable<int>> result = null;

            var options = new FindOptions<BsonDocument, BsonDocument>
            {
                Limit = 1,
                Sort = Builders<BsonDocument>.Sort.Ascending(o => o["Year"])
            };

            var docMaxYear = (await _context.rankings.FindAsync(FilterDefinition<BsonDocument>.Empty, options)).FirstOrDefault();

            int maxYear = 2000;
            if (docMaxYear != null) {
                maxYear = docMaxYear["Year"].ToInt32();
            }

            result = new ActionResult<IEnumerable<int>>(Enumerable.Range(maxYear, 1 + DateTime.Today.Year - maxYear).Reverse());

            return result;
        }


        // PUT: api/Rankings/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRanking(long id, object rankingJSON)
        {
            BsonDocument ranking = BsonDocument.Parse(rankingJSON.ToString());
            ranking.InsertAt(0, new BsonElement("_id", ranking["Id"]));
            ranking.Remove("Id");
            ranking.InsertAt(2, new BsonElement("Player_id", ranking["PlayerId"]));
            ranking.Remove("PlayerId");


            if (id != (int)ranking["_id"]) {
                return BadRequest();
            }

            var q =
                from r in _context.rankings.AsQueryable()
                join p in _context.players.AsQueryable() on r["Player_id"] equals p["_id"]
                where r["_id"] == id
                select new
                {
                    PlayerId = (long)r["Player_id"],
                    Year = (int)r["Year"],
                    Points = (int)r["Points"],
                    Gender = (string) p["Gender"]
                };
            var oldRanking = q.FirstOrDefault();

            if (oldRanking.PlayerId != ranking["Player_id"]
             || oldRanking.Year != ranking["Year"]) {
                return BadRequest("The ranking's Player or Year cannot be modified");
            }

            bool bPointsChanged = oldRanking.Points != (int)ranking["Points"];

            var toReturn = await _context.rankings.ReplaceOneAsync(rank => (int)rank["_id"] == id, ranking)
                .ContinueWith(b4 => {
                    return Ok(b4.Result.ModifiedCount);
                });

            // If the points have changed then need to re-evaluate the rank for the year and gender
            if (bPointsChanged) {
                var q2 =
                    from r in _context.rankings.AsQueryable()
                    join p in _context.players.AsQueryable() on r["Player_id"] equals p["_id"]
                    where r["Year"] == (int)ranking["Year"]
                    && p["Gender"] == (string)oldRanking.Gender
                    orderby r["Points"] descending
                    select new
                    {
                        Id = (long)r["_id"],
                    };
                var orderedRankingIds = q2.ToList();

                int newRank = 0;
                foreach (var oId in orderedRankingIds) {
                    newRank++;
                    var filter = Builders<BsonDocument>.Filter.Eq(x => x["_id"], oId.Id);
                    var update = Builders<BsonDocument>.Update.Set(x => x["Rank"], newRank);
                    _context.rankings.UpdateOne(filter, update);
                }
            }
            return toReturn;
        }

    }
}
