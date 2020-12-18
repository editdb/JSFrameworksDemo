using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using TennisPostgresGraphQLCSharp.Queries;

namespace TennisPostgresGraphQLCSharp.Queries
{
    public class GraphQLTennisSchema : Schema, ISchema
    {
        //public GraphQLDemoSchema(IDependencyResolver resolver) : base(resolver)
        public GraphQLTennisSchema(IServiceProvider services) : base(services)
        {
            //Query = resolver.Resolve<CountryQuery>();

            Query = services.GetService<TennisQuery>();
        }
    }
}
