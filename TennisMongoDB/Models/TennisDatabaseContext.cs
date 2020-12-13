using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TennisMongoDB.Models
{
    public class TennisDatabaseContext
    {
        ITennisDatabaseSettings _settings;

        public readonly IMongoCollection<BsonDocument> rankings;
        public readonly IMongoCollection<BsonDocument> players;
        public readonly IMongoCollection<BsonDocument> countries;

        public TennisDatabaseContext(ITennisDatabaseSettings settings)
        {
            this._settings = settings;
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            rankings = database.GetCollection<BsonDocument>(settings.RankingsCollectionName);
            players = database.GetCollection<BsonDocument>(settings.PlayersCollectionName);
            countries = database.GetCollection<BsonDocument>(settings.CountriesCollectionName);
        }
    }
}
