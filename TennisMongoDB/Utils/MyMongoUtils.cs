using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TennisMongoDB.Utils
{
    public class MyMongoUtils
    {
        public static async Task<List<BsonDocument>> GetListFromCursor(IAsyncCursor<BsonDocument> cursor)
        {
            List<BsonDocument> list = new List<BsonDocument>();
            while (await cursor.MoveNextAsync()) {
                IEnumerable<BsonDocument> batch = cursor.Current;
                foreach (BsonDocument document in batch) {
                    list.Add(document);
                }
            }
            return list;
        }

    }
}
