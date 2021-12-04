using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

using TennisMongoDB.Models;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TennisMongoDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayersController : ControllerBase
    {
        TennisDatabaseContext _context;

        public PlayersController(TennisDatabaseContext context) : base()
        {
            _context = context;
        }

            // GET: api/Players
            [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> GetPlayers()
        {
            var q =
            from p in _context.players.AsQueryable() orderby p["Name"] select new { 
                Id              = (long)    p["_id"],
                Name            = (string)  p["Name"],
                CountryId       = (long)    p["Country_id"],
                Handed          = (string)  p["Handed"],
                Dob             = (DateTime)p["Dob"],
                HomeTown        = (string)  p["HomeTown"],
                HeightFeet      = (int?)    p["HeightFeet"],
                HeightInches    = (int?)    p["HeightInches"],
                Weight          = (int?)    p["Weight"],
                Gender          = (string)  p["Gender"],
                TurnedPro       = (int?)    p["TurnedPro"],
                Photo           = (string)  p["Photo"]
            };
            return await q.ToListAsync();
            //return await _context.players.AsQueryable().OrderBy(p => p["Name"]).ToListAsync();
        }

        // GET: api/PlayersWithCountry
        [HttpGet]
        [Route("/api/PlayersWithCountry")]
        public async Task<ActionResult<IEnumerable<Object>>> GetPlayersWithCountry()
        {
            var q =
                from p in _context.players.AsQueryable()
                join c in _context.countries.AsQueryable() on p["Country_id"] equals c["_id"]
                orderby p["Name"]
                select new
                {
                    Id = (long)p["_id"],
                    Name = (string)p["Name"],
                    CountryId = (long)p["Country_id"],
                    Handed = (string)p["Handed"],
                    Dob = (DateTime)p["Dob"],
                    HomeTown = (string)p["HomeTown"],
                    HeightFeet = (int?)p["HeightFeet"],
                    HeightInches = (int?)p["HeightInches"],
                    Weight = (int?)p["Weight"],
                    Gender = (string)p["Gender"],
                    TurnedPro = (int?)p["TurnedPro"],
                    Photo = (string)p["Photo"],
                    Country = new {
                        Id =        (long)  c["_id"],
                        Code =      (string)c["Code"],
                        Name =      (string)c["Name"],
                        ImageLink = (string)c["ImageLink"]
                    }
                };
            return await q.ToListAsync();

            //return await _context.Player.Include(p => p.Country).OrderBy(p => p.Name).ToListAsync();
        }

        // GET api/Players/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Object>> Get(long id)
        {

            var q =
                from p in _context.players.AsQueryable()
                join c in _context.countries.AsQueryable() on p["Country_id"] equals c["_id"]
                where p["_id"] == id
                select new
                {
                    Id = (long)p["_id"],
                    Name = (string)p["Name"],
                    CountryId = (long)p["Country_id"],
                    Handed = (string)p["Handed"],
                    Dob = (DateTime)p["Dob"],
                    HomeTown = (string)p["HomeTown"],
                    HeightFeet = (int?)p["HeightFeet"],
                    HeightInches = (int?)p["HeightInches"],
                    Weight = (int?)p["Weight"],
                    Gender = (string)p["Gender"],
                    TurnedPro = (int?)p["TurnedPro"],
                    Photo = (string)p["Photo"],
                    Country = new
                    {
                        Id = (long)c["_id"],
                        Code = (string)c["Code"],
                        Name = (string)c["Name"],
                        ImageLink = (string)c["ImageLink"]
                    }
                };
            var res = await q.ToListAsync();
            if (res.Count > 0) {
                return res[0];
            } else { 
                return NotFound();
            }
        }

        // POST api/Players
        [HttpPost]
        public async Task<ActionResult<object>> PostPlayer(object playerJSON)
        {
            BsonDocument player = BsonDocument.Parse(playerJSON.ToString());
            player.InsertAt(0, new BsonElement("_id", nextPlayerId()));
            player.Remove("Id");
            player.InsertAt(2, new BsonElement("Country_id", player["CountryId"]));
            player.Remove("CountryId");

            player.Remove("Country");
            player.Remove("DobDMY");

            if (((string)player["Name"]).Trim().Length <= 4) {
                return BadRequest("The Name does not have enough letters");
            }

            return await _context.players.InsertOneAsync(player)
                .ContinueWith(b4 => {
                    player.InsertAt(0, new BsonElement("Id", player["_id"]));
                    player.Remove("_id");
                    player.InsertAt(2, new BsonElement("CountryId", player["Country_id"]));
                    player.Remove("Country_id");
                    return player.ToJson();
                });

            //return NoContent();
        }

        // PUT: api/Players/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlayer(long id, object playerJSON)
        {
            BsonDocument player = BsonDocument.Parse(playerJSON.ToString());
            player.InsertAt(0, new BsonElement("_id", player["Id"]));
            player.Remove("Id");
            player.InsertAt(2, new BsonElement("Country_id", player["CountryId"]));
            player.Remove("CountryId");

            player.Remove("Country");
            player.Remove("DobDMY");


            if (id != (int) player["_id"]) {
                return BadRequest();
            }

            if (((string) player["Name"]).Trim().Length <= 4) {
                return BadRequest("The Name does not have enough letters");
            }

            return await _context.players.ReplaceOneAsync(plyr => (int)plyr["_id"] == id, player)
                .ContinueWith(b4 => {
                    return Ok(b4.Result.ModifiedCount) ;
                });

        }



        [HttpGet]
        [Route("/api/nextPlayerId")]
        public int nextPlayerId()
        {
            // OK this doesn't prevent two records from having the same _id - it's quick and nasty

            ActionResult<IEnumerable<int>> result = null;

            var options = new FindOptions<BsonDocument, BsonDocument>
            {
                Sort = Builders<BsonDocument>.Sort.Descending(o => o["_id"]),
                Limit = 1
            };

            var docMaxId = _context.players.FindSync(FilterDefinition<BsonDocument>.Empty, options).FirstOrDefault();

            int maxId = (int)docMaxId["_id"];

            return maxId + 1;
        }

    }
}
