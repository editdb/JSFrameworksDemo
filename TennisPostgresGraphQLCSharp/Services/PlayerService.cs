using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TennisPostgresGraphQLCSharp.Exceptions;
using TennisPostgresGraphQLCSharp.InputTypes;
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



        public async Task<Player> Add(Player player)
        {
            var result = await _context.Player.AddAsync(player);

            await _context.SaveChangesAsync();

            return result.Entity;
        }

        public async Task<Player> Update(long id, PlayerInput input)
        {

            if (input.Name.HasValue && input.Name.Value.Trim().Length <= 4) {
                throw new DataValidationError("Name", "The Name does not have enough letters");
            }

            Player record = _context.Player.Find(id);
            if (input.Id.HasValue)            record.Id =             input.Id.Value;
            if (input.Name.HasValue)          record.Name =           input.Name.Value;
            if (input.CountryId.HasValue)     record.CountryId =      input.CountryId.Value;
            if (input.Handed.HasValue)        record.Handed =         input.Handed.Value;
            if (input.Dob.HasValue)           record.Dob =            input.Dob.Value;
            if (input.HomeTown.HasValue)      record.HomeTown =       input.HomeTown.Value;
            if (input.HeightFeet.HasValue)    record.HeightFeet =     input.HeightFeet.Value;
            if (input.HeightInches.HasValue)  record.HeightInches =   input.HeightInches.Value;
            if (input.Weight.HasValue)        record.Weight =         input.Weight.Value.Value;
            if (input.Photo.HasValue)         record.Photo =          input.Photo.Value;
            if (input.Gender.HasValue)        record.Gender =         input.Gender.Value;
            if (input.TurnedPro.HasValue)     record.TurnedPro =      input.TurnedPro.Value;

            _context.Entry(record).State = EntityState.Modified;

            try {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) {
                if (_context.Player.Find(id) == null) {
                    throw new DataValidationError("Id", "Updated player not found");
                }
                else {
                    throw;
                }
            }

            _context.Entry(record).State = EntityState.Detached;
            return _context.Player.Find(id);
        }

    }
}
