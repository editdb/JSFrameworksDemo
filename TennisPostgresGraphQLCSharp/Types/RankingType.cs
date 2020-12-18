using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TennisPostgresGraphQLCSharp.Models;
using TennisPostgresGraphQLCSharp.Services;

namespace TennisPostgresGraphQLCSharp.Types
{
    public class RankingType : ObjectGraphType<Ranking>
    {
        public RankingType(PlayerService playerService)
        {
            Name = "Ranking";
            Field(_ => _.Id).Description("Ranking's Id");
            Field(_ => _.PlayerId).Description("Id of the ranking's player");
            Field(_ => _.Year).Description("The year of the player's ranking");
            Field(_ => _.Movement, nullable: true).Description("The movement since the last ranking");
            Field(_ => _.Rank, nullable: true).Description("The current rank for this player/year (1 = top)");
            Field(_ => _.Points, nullable: true).Description("Points for this year");
            Field(_ => _.PrizeMoney, nullable: true).Description("Prize money for this year");
            Field(_ => _.SinglesTitles, nullable: true).Description("Singles titles for this year");
            Field(_ => _.DoublesTitles, nullable: true).Description("Doubles titles for this year");
            Field(_ => _.SinglesWin, nullable: true).Description("Singles wins for this year");
            Field(_ => _.SinglesLoss, nullable: true).Description("Singles losses for this year");
            // Populating Player via a join in the database layer, else Player lookup SQL is issued for each Ranking record
            Field(_ => _.Player, nullable: true, typeof(PlayerType)).Description("The player of the ranking");
            //   .Resolve(c => playerService.GetByIdSync(c.Source.PlayerId));
        }
    }
}
