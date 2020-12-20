using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Types;

namespace TennisPostgresGraphQLCSharp.InputTypes
{
    public class RankingInputType : InputObjectGraphType
    {
        public RankingInputType() { 
            Name = "RankingInput";
            Description = "Specify the attributes you want to set. Note that for updateRank, Id must be specified and for creatRank Id will be ignored.";

            Field<LongGraphType>("id");
            Field<LongGraphType>("playerId");
            Field<IntGraphType>("year");
            Field<IntGraphType>("movement");
            Field<IntGraphType>("rank");
            Field<IntGraphType>("points");
            Field<IntGraphType>("prizeMoney");
            Field<IntGraphType>("singlesTitles");
            Field<IntGraphType>("doublesTitles");
            Field<IntGraphType>("singlesWin");
            Field<IntGraphType>("singlesLoss");
        }
    }
}
