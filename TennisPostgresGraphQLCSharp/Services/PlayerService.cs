using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using TennisPostgresGraphQLCSharp.Models;

namespace TennisPostgresGraphQLCSharp.Services
{
    public class PlayerService
    {
        private readonly TennisDBContext _context;
        public PlayerService(TennisDBContext context)
        {
            _context = context;
        }

        public async Task<List<Player>> GetAll(string gender, string partialName, bool includePhoto = false)
        {
            var q =
                from p in _context.Player
                join c in _context.Country on p.CountryId equals c.Id
                where
                    (string.IsNullOrWhiteSpace(gender) || p.Gender == gender)
                 && (string.IsNullOrWhiteSpace(partialName) || p.Name.ToLower().Contains(partialName.ToLower()))
                orderby p.Name
                select Player.PlayerFullRecord(p, c, includePhoto);

            return await q.ToListAsync();
        }

        public async Task<Player> GetById(long id)
        {
            var q =
                from p in _context.Player
                join c in _context.Country on p.CountryId equals c.Id
                where p.Id == id
                select Player.PlayerFullRecord(p, c, true);

            return await q.FirstOrDefaultAsync();
        }
        public Player GetByIdSync(long id)
        {
            var record = _context.Player.Find(id);

            return record;
        }

        public async Task<List<Player>> GetByCountry(long id)
        {
            var record = await _context.Player.Where(p => p.CountryId == id).ToListAsync();

            return record;
        }

    }
}
