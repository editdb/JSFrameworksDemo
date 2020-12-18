using System;
using System.Collections.Generic;

namespace TennisPostgresGraphQLCSharp.Models
{
    public partial class Ranking
    {
        public long Id { get; set; }
        public long PlayerId { get; set; }
        public int Year { get; set; }
        public int? Movement { get; set; }
        public int? Rank { get; set; }
        public int? Points { get; set; }
        public int? PrizeMoney { get; set; }
        public int? SinglesTitles { get; set; }
        public int? DoublesTitles { get; set; }
        public int? SinglesWin { get; set; }
        public int? SinglesLoss { get; set; }

        public virtual Player Player { get; set; }



        public static Ranking RankingFullRecord(Ranking r, Player p, Country c, bool includePhoto)
        {
            Ranking newRanking = new Ranking
            {
                Id = r.Id,
                PlayerId = r.PlayerId,
                Movement = r.Movement,
                Rank = r.Rank,
                Points = r.Points,
                PrizeMoney = r.PrizeMoney,
                SinglesTitles = r.SinglesTitles,
                DoublesTitles = r.DoublesTitles,
                SinglesWin = r.SinglesWin,
                SinglesLoss = r.SinglesLoss,
                Year = r.Year,
                Player = Player.PlayerFullRecord(p, c, includePhoto)
            };

            return newRanking;

        }

    }
}
