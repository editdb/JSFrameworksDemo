using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TennisPostgresGraphQLCSharp.Exceptions;
using TennisPostgresGraphQLCSharp.Models;

namespace TennisPostgresGraphQLCSharp.Services
{
    public class CountryService
    {
        private readonly TennisDBContext _context;
        public CountryService(TennisDBContext context)
        {
            _context = context;
        }

        public async Task<List<Country>> GetAll()
        {
            return await _context.Country.OrderBy(c => c.Name).ToListAsync();
        }

        public async Task<Country> GetById(long id)
        {
            var record = await _context.Country.FindAsync(id);

            return record;
        }

        public async Task<Country> Add(Country country)
        {
            var result = await _context.Country.AddAsync(country);

            await _context.SaveChangesAsync();

            return result.Entity;
        }

        public async Task<Country> Update(long id, Country country)
        {
            country.Id = id;

            if (string.IsNullOrWhiteSpace(country.Code)) {
                throw new DataValidationError("Code", "The Code must be supplied");
            }

            if (country.Name.Trim().Length <= 4) {
                throw new DataValidationError("Name", "The Name does not have enough letters");
            }

            _context.Entry(country).State = EntityState.Modified;

            try {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) {
                if (_context.Country.Find(id) == null) {
                    throw new DataValidationError("Id", "Updated country not found");
                }
                else {
                    throw;
                }
            }

            _context.Entry(country).State = EntityState.Detached;
            return _context.Country.Find(id);
        }
    }

}
