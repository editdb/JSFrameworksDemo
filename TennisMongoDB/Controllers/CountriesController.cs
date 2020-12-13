using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TennisMongoDB.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TennisMongoDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController : ControllerBase
    {
        ITennisDatabaseSettings _settings;
        private readonly IMongoCollection<BsonDocument> _countries;

        public CountriesController(ITennisDatabaseSettings settings) : base()
        {
            this._settings = settings;
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _countries = database.GetCollection<BsonDocument>(settings.CountriesCollectionName);
        }

        // GET: api/<CountriesController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<string>>> Get()
        {
            List<BsonDocument> countries = await _countries.Find(Builders<BsonDocument>.Filter.Empty).ToListAsync();
            foreach(BsonDocument doc in countries) {
                doc.InsertAt(0, new BsonElement("Id", doc["_id"]));
                doc.Remove("_id");
            }
            return Ok(countries.ToJson());
        }
    }
}
