using System;
using System.Collections.Generic;

namespace TennisAngular10.Models
{
    public partial class Ranking
    {
        public long Id { get; set; }
        public long? PlayerId { get; set; }
        public int? Year { get; set; }
        public int? Movement { get; set; }
        public int? Rank { get; set; }
        public int? Points { get; set; }
        public int? PrizeMoney { get; set; }
        public int? SinglesTitles { get; set; }
        public int? DoublesTitles { get; set; }
        public int? SinglesWin { get; set; }
        public int? SinglesLoss { get; set; }

        public virtual Player Player { get; set; }
    }
}
