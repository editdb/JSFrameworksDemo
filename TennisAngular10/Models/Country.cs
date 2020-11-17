﻿using System;
using System.Collections.Generic;

namespace TennisAngular10.Models
{
    public partial class Country
    {
        public Country()
        {
            Player = new HashSet<Player>();
        }

        public long Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string ImageLink { get; set; }

        public virtual ICollection<Player> Player { get; set; }
    }
}
