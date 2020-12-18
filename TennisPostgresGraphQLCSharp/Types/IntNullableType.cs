using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TennisPostgresGraphQLCSharp.Models;

namespace TennisPostgresGraphQLCSharp.Types
{
    public class IntNullableType : ObjectGraphType<int?>
    {
        public IntNullableType()
        {
            Name = "IntNullable";
            Field(_ => _.Value).Description("The value of the int");
        }
    }
}
