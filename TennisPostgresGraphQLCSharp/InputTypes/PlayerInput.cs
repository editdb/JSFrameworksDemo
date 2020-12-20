using Microsoft.CodeAnalysis;
using System;

namespace TennisPostgresGraphQLCSharp.InputTypes
{
    public class PlayerInput
    {
        public Optional<long> Id { get; set; }
        public Optional<string> Name { get; set; }
        public Optional<long> CountryId { get; set; }
        public Optional<string> /*char?*/ Handed { get; set; }
        public Optional<DateTime?> Dob { get; set; }
        public Optional<string> HomeTown { get; set; }
        public Optional<int?> HeightFeet { get; set; }
        public Optional<int?> HeightInches { get; set; }
        public Optional<int?> Weight { get; set; }
        public Optional<byte[]?> Photo { get; set; }
        public Optional<string> /*char*/ Gender { get; set; }
        public Optional<int?> TurnedPro { get; set; }


    }
}
