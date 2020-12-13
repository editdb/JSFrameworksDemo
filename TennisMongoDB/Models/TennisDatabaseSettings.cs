using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TennisMongoDB.Models
{
    public class TennisDatabaseSettings : ITennisDatabaseSettings
    {
        public string PlayersCollectionName { get; set; }
        public string RankingsCollectionName { get; set; }
        public string CountriesCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface ITennisDatabaseSettings
    {
        string PlayersCollectionName { get; set; }
        string RankingsCollectionName { get; set; }
        string CountriesCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
