using Microsoft.CodeAnalysis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TennisPostgresGraphQLCSharp.InputTypes
{
    public class RankingInput
    {
        public Optional<long> Id { get; set; }
        public Optional<long> PlayerId { get; set; }
        public Optional<int> Year { get; set; }
        public Optional<int?> Movement { get; set; }
        public Optional<int?> Rank { get; set; }
        public Optional<int?> Points { get; set; }
        public Optional<int?> PrizeMoney { get; set; }
        public Optional<int?> SinglesTitles { get; set; }
        public Optional<int?> DoublesTitles { get; set; }
        public Optional<int?> SinglesWin { get; set; }
        public Optional<int?> SinglesLoss { get; set; }
    }
}
