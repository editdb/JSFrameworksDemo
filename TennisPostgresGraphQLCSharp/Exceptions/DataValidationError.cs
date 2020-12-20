using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TennisPostgresGraphQLCSharp.Exceptions
{
    public class DataValidationError : GraphQL.Execution.InvalidVariableError
    {
        private string _fieldName;
        public string variableName {get { return _fieldName; } }
        public DataValidationError(string fieldName, string message) : base(fieldName, message)
        {
            _fieldName = fieldName;
        }
    }
}
