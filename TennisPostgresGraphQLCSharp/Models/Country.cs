using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TennisPostgresGraphQLCSharp.Models
{
    public partial class Country
    {
        //public Country()
        //{
        //    Player = new HashSet<Player>();
        //}

        public long Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string ImageLink { get; set; }

        //[JsonIgnore]
        //public virtual ICollection<Player> Player { get; set; }
    }
}
