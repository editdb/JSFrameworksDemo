using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

using TennisMongoDB.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TennisMongoDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController : ControllerBase
    {
        TennisDatabaseContext _context;


        public CountriesController(TennisDatabaseContext context) : base()
        {
            _context = context;
        }

        // GET: api/<CountriesController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> Get()
        {
            var q =
            from c in _context.countries.AsQueryable()
            orderby c["Name"]
            select new
            {
                Id = (long)c["_id"],
                Code = (string)c["Code"],
                Name = (string)c["Name"],
                ImageLink = (string)c["ImageLink"]
            };
            return await q.ToListAsync();
        }
    }
}
