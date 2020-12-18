using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TennisPostgresGraphQLCSharp.Services;
using TennisPostgresGraphQLCSharp.Types;

namespace TennisPostgresGraphQLCSharp.Queries
{
    public class TennisQuery : ObjectGraphType<object>
    {
        public TennisQuery(CountryService countryService, PlayerService playerService, RankingService rankingService)
        {
            Name = "TennisQuery";
            Description = "A database of tennis players, their countries and their rankings throughout recent years";

            Field<ListGraphType<CountryType>>(
                name: "countries", 
                resolve: context => countryService.GetAll()
            );

            Field<CountryType>(
                name: "country",
                description: "Retrieves one country for Id",
                arguments: new QueryArguments(
                    new QueryArgument<LongGraphType> { Name = "id" }),
                resolve: context =>
                {
                    long id = (long)context.Arguments["id"]; //.GetArgument<int>("id");
                    return countryService.GetById(id);
                }
            );

            Field<ListGraphType<PlayerType>>(
                name: "country_players",
                description: "Retrieves a list of players for a country for country Id",
                arguments: new QueryArguments(
                    new QueryArgument<LongGraphType> { Name = "countryId" }),
                resolve: context =>
                {
                    long id = (long)context.Arguments["countryId"];
                    return playerService.GetByCountry(id);
                }
            );

            Field<ListGraphType<PlayerType>>(
                name: "players",
                description: "Retrieves a list of players with optional filtering",
                arguments: new QueryArguments(
                    new QueryArgument<StringGraphType> { Name = "gender", DefaultValue = "", Description = "Gender (M/F) of players to select. Omit for all." },
                    new QueryArgument<StringGraphType> { Name = "name", DefaultValue = "", Description = "Partial name of players to select. Omit for all." }
                ),
                resolve: context =>
                {
                    string gender = (string)context.Arguments["gender"];
                    string name = (string)context.Arguments["name"];
                    // Choosing whether to include Photo because it can be large
                    bool includePhoto = false;
                    if (context.SubFields.ContainsKey("photo")) {
                        includePhoto = true;
                    }

                    return playerService.GetAll(gender, name, includePhoto);
                }
            );

            Field<PlayerType>(
                name: "player",
                description: "Retrieves one player for Id",
                arguments: new QueryArguments(
                    new QueryArgument<LongGraphType> { Name = "id" }),
                resolve: context =>
                {
                    long id = (long)context.Arguments["id"];
                    return playerService.GetById(id);
                }
            );


            Field<ListGraphType<RankingType>>(
                description: "Retrieves rankings for optional filtering",
                name: "rankings",
                arguments: new QueryArguments(
                    new QueryArgument<IntGraphType> { Name = "year", DefaultValue = null, Description = "Year of rankings to return. Omit for all." },
                    new QueryArgument<StringGraphType> { Name = "gender", DefaultValue = "", Description = "Gender (M/F) of players to select. Omit for all." }
                ),
                resolve: context =>
                {
                    int? year = (int?)context.Arguments["year"];
                    string gender = (string)context.Arguments["gender"];
                    // Choosing whether to include Photo because it can be large
                    bool includePhoto = false;
                    if (context.SubFields.ContainsKey("player")) {
                        foreach (var selection in context.SubFields["player"].SelectionSet.Selections) {
                            if (selection is GraphQL.Language.AST.Field) {
                                if (((GraphQL.Language.AST.Field)selection).Name.Equals("photo")) {
                                    includePhoto = true;
                                }
                            }
                        }
                    }
                    return rankingService.GetAll(year, gender, includePhoto);
                }
            );


            Field<RankingType>(
                description: "Retrieves a ranking for id",
                name: "ranking",
                arguments: new QueryArguments(
                    new QueryArgument<LongGraphType> { Name = "id", DefaultValue = null, Description = "Id of ranking to return" }
                ),
                resolve: context =>
                {
                    long id = (long)context.Arguments["id"];
                    return rankingService.GetById(id);
                }
            );

            Field<ListGraphType<IntNullableType>>(
                description: "Retrieves a list of years in descending order from the current year to the first year for which there is a ranking",
                name: "years", 
                resolve: context => rankingService.GetYears()
            );

        }
    }
}
