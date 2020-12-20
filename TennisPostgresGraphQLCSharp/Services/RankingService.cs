using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TennisPostgresGraphQLCSharp.Exceptions;
using TennisPostgresGraphQLCSharp.InputTypes;
using TennisPostgresGraphQLCSharp.Models;

namespace TennisPostgresGraphQLCSharp.Services
{
    public class RankingService
    {
        private readonly TennisDBContext _context;
        public RankingService(TennisDBContext context)
        {
            _context = context;
        }

        public async Task<List<Ranking>> GetAll(int? year, string gender, bool includePhoto = false)
        {
            /* This just returns the Ranking records. Instead, going to join to get results to avoid 
             * individual Player lookups 
            return await _context.Ranking
                .Where(r =>
                    !year.HasValue || r.Year == year.Value
                )
                .OrderBy(r => r.Year).ThenBy(r => r.Rank)
                .ToListAsync();
            */
            /* 
            return await _context.Ranking
                .Join(_context.Player, r=>r.PlayerId, p=>p.Id, (r, p) => new {r, p} )
                .Where(n =>
                    (!year.HasValue || n.r.Year == year.Value)
                 && (string.IsNullOrWhiteSpace(gender) || n.p.Gender == gender)
                )
                .OrderBy(n => n.r.Year).ThenBy(n => n.p.Gender).ThenBy(n => n.r.Rank)
                .ToListAsync();
            */

            var q =
                from r in _context.Ranking
                join p in _context.Player on r.PlayerId equals p.Id
                join c in _context.Country on p.CountryId equals c.Id
                where 
                    (!year.HasValue || r.Year == year)
                 && (string.IsNullOrWhiteSpace(gender) || p.Gender == gender)
                orderby r.Rank
                select Ranking.RankingFullRecord(r, p, c, includePhoto);

            return await q.ToListAsync();
        }

        public async Task<Ranking> GetById(long id)
        {

            var q =
                from r in _context.Ranking
                join p in _context.Player on r.PlayerId equals p.Id
                join c in _context.Country on p.CountryId equals c.Id
                where r.Id == id
                orderby r.Rank
                select Ranking.RankingFullRecord(r, p, c, true);

            return await q.FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<int>> GetYears()
        {
            IEnumerable<int> result = null;
            await Task.Run(() =>
            {
                int? iYear =
                (from r in _context.Ranking
                 select r.Year).Min();
                if (!iYear.HasValue) {
                    iYear = 2000;
                }

                result = Enumerable.Range(iYear.Value, 1 + DateTime.Today.Year - iYear.Value).Reverse();
            });
            return result;
        }


        public async Task<Ranking> Update(long id, RankingInput input)
        {

            Ranking record = _context.Ranking.Find(id);

            bool bPointsChanged = input.Points.HasValue && (
                input.Points.HasValue && !record.Points.HasValue
            || !input.Points.HasValue && record.Points.HasValue
            ||      input.Points.HasValue && record.Points.HasValue
                 && input.Points.Value != record.Points.Value);

            if (input.Movement.HasValue) record.Movement = input.Movement.Value;
            if (input.Rank.HasValue) record.Rank = input.Rank.Value;
            if (input.Points.HasValue) record.Points = input.Points.Value;
            if (input.PrizeMoney.HasValue) record.PrizeMoney = input.PrizeMoney.Value;
            if (input.SinglesTitles.HasValue) record.SinglesTitles = input.SinglesTitles.Value;
            if (input.DoublesTitles.HasValue) record.DoublesTitles = input.DoublesTitles.Value;
            if (input.SinglesWin.HasValue) record.SinglesWin = input.SinglesWin.Value;
            if (input.SinglesLoss.HasValue) record.SinglesLoss = input.SinglesLoss.Value;


            _context.Entry(record).State = EntityState.Modified;


            using (var transaction = _context.Database.BeginTransaction()) {

                try {
                    await _context.SaveChangesAsync();

                    if (bPointsChanged) {
                        string rankingPlayerGender = _context.Player.Single(p => p.Id == record.PlayerId).Gender;
                        Debug.WriteLine("rankingPlayerGender=" + rankingPlayerGender);
                        List<Ranking> lstRanking = _context.Ranking
                            //.Include(r => r.Player)
                            .Where(r => r.Year == record.Year && r.Player.Gender == rankingPlayerGender)
                            .OrderByDescending(r => r.Points)
                            .ToList();

                        int rank = 0;
                        foreach (var eRanking in lstRanking) {
                            rank++;
                            if (eRanking.Rank != rank) {
                                if (eRanking.Id == record.Id) {
                                    record.Rank = rank;
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
                    if (_context.Ranking.Find(id) == null) {
                        throw new DataValidationError("Id", "Updated ranking not found");
                    }
                    else {
                        throw;
                    }
                }
            }
            _context.Entry(record).State = EntityState.Detached;
            return _context.Ranking.Find(id);
        }

    }
}
