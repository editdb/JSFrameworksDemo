using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TennisPostgresGraphQLCSharp.InputTypes
{
    public class CountryInputType : InputObjectGraphType
    {
        public CountryInputType()
        {
            Name = "CountryInput";
            Field<NonNullGraphType<StringGraphType>>("code");
            Field<NonNullGraphType<StringGraphType>>("name");
            Field<NonNullGraphType<StringGraphType>>("imageLink");
        }
    }
}
