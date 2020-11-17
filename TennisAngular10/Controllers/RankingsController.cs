using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TennisAngular10.Models;
using TennisAngular10.ViewModels;

namespace TennisAngular10.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RankingsController : ControllerBase
    {
        private readonly TennisDBContext _context;

        public RankingsController(TennisDBContext context)
        {
            _context = context;
        }

        // GET: api/Rankings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ranking>>> GetRanking()
        {
            return await _context.Ranking.ToListAsync();
        }

        // GET: api/RankingsList
        [HttpGet]
        [Route("/api/rankingsList/{year}/{gender}")]
        public async Task<ActionResult<IEnumerable<RankingsList>>> GetRankingsList(int year, char gender)
        {
            var q =
            from r in _context.Ranking
            join p in _context.Player on r.PlayerId equals p.Id
            join c in _context.Country on p.CountryId equals c.Id
            where r.Year == year && p.Gender == gender
            orderby r.Rank
            select new RankingsList
            {
                Id = r.Id,
                PlayerId = r.PlayerId,
                PlayerName = p.Name,
                CountryId = p.CountryId,
                CountryCode = c.Code,
                CountryName = c.Name,
                CountryImageLink = c.ImageLink,
                Movement = r.Movement,
                Rank = r.Rank,
                Points = r.Points,
                PrizeMoney = r.PrizeMoney,
                SinglesTitles = r.SinglesTitles,
                DoublesTitles = r.DoublesTitles,
                SinglesWin = r.SinglesWin,
                SinglesLoss = r.SinglesLoss,
                Year = r.Year.Value,
                Gender = p.Gender
            };

            return await q.ToListAsync();
        }

        // GET: api/FirstYear
        [HttpGet]
        [Route("/api/years")]
        public async Task<ActionResult<IEnumerable<int>>> years()
        {
            ActionResult<IEnumerable<int>> result = null;
            await Task.Run(() =>
            {
                int? iYear =
                (from r in _context.Ranking
                 select r.Year).Min();
                if (!iYear.HasValue) {
                    iYear = 2000;
                }

                result = new ActionResult<IEnumerable<int>>(Enumerable.Range(iYear.Value, 1 + DateTime.Today.Year - iYear.Value).Reverse());
            });
            return result;
        }

        // GET: api/Rankings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ranking>> GetRanking(long id)
        {
            var ranking = await _context.Ranking.FindAsync(id);

            if (ranking == null)
            {
                return NotFound();
            }

            return ranking;
        }

        // PUT: api/Rankings/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRanking(long id, Ranking ranking)
        {
            if (id != ranking.Id)
            {
                return BadRequest();
            }

            Ranking oldRanking = _context.Ranking.AsNoTracking().Single(r => r.Id == id);
            if (oldRanking.PlayerId != ranking.PlayerId
             || oldRanking.Year != ranking.Year) {
                return BadRequest("The ranking's Player or Year cannot be modified");
            }

            bool bPointsChanged = oldRanking.Points != ranking.Points;

            _context.Entry(ranking).State = EntityState.Modified;

            using (var transaction = _context.Database.BeginTransaction()) {

                try {
                    await _context.SaveChangesAsync();

                    if (bPointsChanged) {
                        char rankingPlayerGender = _context.Player.Single(p => p.Id == ranking.PlayerId).Gender;
                        Debug.WriteLine("rankingPlayerGender=" + rankingPlayerGender);
                        List<Ranking> lstRanking = _context.Ranking
                            //.Include(r => r.Player)
                            .Where(r => r.Year == ranking.Year && r.Player.Gender == rankingPlayerGender)
                            .OrderByDescending(r => r.Points)
                            .ToList();

                        int rank = 0;
                        foreach (var eRanking in lstRanking) {
                            rank++;
                            if (eRanking.Rank != rank) {
                                if (eRanking.Id == ranking.Id) {
                                    ranking.Rank = rank;
                                    //_context.Entry(ranking).State = EntityState.Modified;
                                }
                                else {
                                    eRanking.Rank = rank;
                                    _context.Entry(eRanking).State = EntityState.Modified;
                                }
                            }
                        }
                    }

                    await _context.SaveChangesAsync();

                    transaction.Commit();
                }
                catch (DbUpdateConcurrencyException) {
                    if (!RankingExists(id)) { 
                        transaction.Rollback();
                        return NotFound();
                    } else {
                        transaction.Rollback();
                        throw;
                    }
                }
                catch (Exception) {
                    transaction.Rollback();
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Rankings
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Ranking>> PostRanking(Ranking ranking)
        {
            _context.Ranking.Add(ranking);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRanking", new { id = ranking.Id }, ranking);
        }

        // DELETE: api/Rankings/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Ranking>> DeleteRanking(long id)
        {
            var ranking = await _context.Ranking.FindAsync(id);
            if (ranking == null)
            {
                return NotFound();
            }

            _context.Ranking.Remove(ranking);
            await _context.SaveChangesAsync();

            return ranking;
        }

        private bool RankingExists(long id)
        {
            return _context.Ranking.Any(e => e.Id == id);
        }
    }
}
