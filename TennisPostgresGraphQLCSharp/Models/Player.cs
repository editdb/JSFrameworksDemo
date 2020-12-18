using System;
using System.Collections.Generic;

namespace TennisPostgresGraphQLCSharp.Models
{
    public partial class Player
    {
        //public Player()
        //{
        //    Ranking = new HashSet<Ranking>();
        //}

        public long Id { get; set; }
        public string Name { get; set; }
        public long CountryId { get; set; }
        public string /*char?*/ Handed { get; set; }
        public DateTime? Dob { get; set; }
        public string HomeTown { get; set; }
        public int? HeightFeet { get; set; }
        public int? HeightInches { get; set; }
        public int? Weight { get; set; }
        public byte[]? Photo { get; set; }
        public string /*char*/ Gender { get; set; }
        public int? TurnedPro { get; set; }

        public virtual Country Country { get; set; }
        //public virtual ICollection<Ranking> Ranking { get; set; }


        public static Player PlayerFullRecord(Player p, Country c, bool includePhoto)
        {
            Player newPlayer = new Player
            {
                Id = p.Id,
                Name = p.Name,
                Gender = p.Gender,
                CountryId = p.CountryId,
                Dob = p.Dob,
                Handed = p.Handed,
                HeightFeet = p.HeightFeet,
                HeightInches = p.HeightInches,
                Weight = p.Weight,
                HomeTown = p.HomeTown,
                Photo = includePhoto ? p.Photo : null,  // Choosing whether to include Photo because it can be large
                TurnedPro = p.TurnedPro,
                Country = new Country
                {
                    Id = c.Id,
                    Code = c.Code,
                    Name = c.Name,
                    ImageLink = c.ImageLink
                }
            };

            return newPlayer;

        }

    }
}
