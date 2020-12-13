using System;
using MongoDB.Bson;

namespace TennisMongoDB.ViewModels
{
    public class RankingsListCustomMapper : ICustomBsonTypeMapper
    {
        public bool TryMapToBsonValue(object value, out BsonValue bsonValue)
        {
            bsonValue = ((RankingsList)value).ToBsonDocument();
            return true;
        }
    }
}
