using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TennisPostgresGraphQLCSharp.InputTypes
{
    public class PlayerInputType : InputObjectGraphType
    {
        public PlayerInputType()
        {
            Name = "PlayerInput";
            Description = "Specify the attributes you want to set. Note that for updatePlayer, Id must be specified and for createPlayer Id will be ignored.";

            Field<LongGraphType>("id");
            Field<StringGraphType>("name");
            Field<LongGraphType>("countryId");
            Field<StringGraphType>("handed");
            Field<DateGraphType>("dob");
            Field<StringGraphType>("homeTown");
            Field<IntGraphType>("heightFeet");
            Field<IntGraphType>("heightInches");
            Field<IntGraphType>("weight");
            Field<ListGraphType<ByteGraphType>>("photo");
            Field<StringGraphType>("gender");
            Field<IntGraphType>("turnedPro");
        }
    }
}
