using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TennisAngular10.Models
{
    public partial class Player
    {
        public Player()
        {
            Ranking = new HashSet<Ranking>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public long CountryId { get; set; }
        public char? Handed { get; set; }
        public DateTime? Dob { get; set; }
        public string HomeTown { get; set; }
        public int? HeightFeet { get; set; }
        public int? HeightInches { get; set; }
        public int? Weight { get; set; }
        public byte[] Photo { get; set; }
        public char Gender { get; set; }
        public int? TurnedPro { get; set; }

        public virtual Country Country { get; set; }

        [JsonIgnore]
        public virtual ICollection<Ranking> Ranking { get; set; }
    }
}
