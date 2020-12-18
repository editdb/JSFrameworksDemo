using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

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

    }
}
