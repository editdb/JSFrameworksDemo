﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TennisAngular10.ViewModels
{
    public partial class RankingsList
    {
        public long Id { get; set; }
        public long? PlayerId { get; set; }
        public string PlayerName { get; set; }
        public long CountryId { get; set; }
        public string CountryCode { get; set; }
        public string CountryName { get; set; }
        public string CountryImageLink { get; set; }
        public int? Movement { get; set; }
        public int? Rank { get; set; }
        public int? Points { get; set; }
        public int? PrizeMoney { get; set; }
        public int? SinglesTitles { get; set; }
        public int? DoublesTitles { get; set; }
        public int? SinglesWin { get; set; }
        public int? SinglesLoss { get; set; }
        public int Year { get; set; }
        public char Gender { get; set; }
    }
}
