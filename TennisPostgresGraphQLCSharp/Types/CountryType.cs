using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TennisPostgresGraphQLCSharp.Models;

namespace TennisPostgresGraphQLCSharp.Types
{
    public class CountryType : ObjectGraphType<Country>
    {
        public CountryType ()
        {
            Name = "Country";
            Field(_ => _.Id).Description("Country's Id");
            Field(_ => _.Code).Description("Short code that identifies the country");
            Field(_ => _.Name).Description("Name of the country");
            Field(_ => _.ImageLink).Description("Link to an image of the country's flag");
        }
    }
}
