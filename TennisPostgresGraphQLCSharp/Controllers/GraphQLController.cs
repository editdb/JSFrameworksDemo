using GraphQL;
using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//using System.Web.Mvc;
using Microsoft.AspNetCore.Mvc;
using GraphQL.NewtonsoftJson;

namespace TennisPostgresGraphQLCSharp.Controllers
{
    [Route("null")]
    public class GraphQLController : Controller
    {
        private readonly ISchema _schema;
        private readonly IDocumentExecuter _executer;
        public GraphQLController(ISchema schema, IDocumentExecuter executer)
        {
            _schema = schema;
            _executer = executer;
        }


        [Route("/graphql")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] GraphQLQueryDTO query)
        {
            var result = await _executer.ExecuteAsync(_ =>
            {
                _.Schema = _schema;
                _.Query = query.Query;
                _.Inputs = query.Variables?.ToInputs();

            });

            if (result.Errors?.Count > 0) {
                return BadRequest(result.Errors[0].ToString());
            }

            // The response json is not starting with "data" - maybe to look prettier
            // This issue with this is that when GraphiQL requests the schema, GraphiQL
            // is expecting a response that starts "data". So I am adding "data" to the
            // front of the response if this is a schema request.  
            // I don't know why I can't find any mention of this problem on internet.
            if (typeof(Dictionary<string, object>).IsInstanceOfType(result.Data)) {
                var dictData = (Dictionary<string, object>)result.Data;
                if (dictData.ContainsKey("__schema")) {
                    var result2 = new Dictionary<string, object>();
                    result2.Add("data", dictData);
                    return Ok(result2);
                } else { 
                    return Ok(result.Data);
                }
            }
            return Ok(result);
        }
    }
}
