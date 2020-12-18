using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TennisPostgresGraphQLCSharp.Models;

namespace TennisPostgresGraphQLCSharp.Types
{
    public class PlayerType : ObjectGraphType<Player>
    {
        public PlayerType()
        {
            Name = "Player";
            Field(_ => _.Id).Description("Player's Id");
            Field(_ => _.Name).Description("Name of the country");
            Field(_ => _.CountryId).Description("Id of the player's country");
            Field(_ => _.Handed).Description("Whether the player is left or right handed");
            Field(_ => _.Dob, nullable: true).Description("Date of birth");
            Field(_ => _.HomeTown).Description("Home town");
            Field(_ => _.HeightFeet, nullable: true).Description("Height in feet");
            Field(_ => _.HeightInches, nullable: true).Description("Height inches above height in feet");
            Field(_ => _.Weight, nullable: true).Description("Weight in pounds");
            Field(_ => _.Photo, nullable: true).Description("Photo held as byte array");
            Field(_ => _.Gender).Description("Gender M/F");
            Field(_ => _.TurnedPro, nullable: true).Description("Year turned professional");
            // Populating Country via a join in the database layer, else Country lookup SQL is issued for each Player record
            Field(_ => _.Country, nullable: true, typeof(CountryType)).Description("The country of the player");
            //   .Resolve(c => countryService.GetByIdSync(c.Source.CountryId));
        }
    }
}
