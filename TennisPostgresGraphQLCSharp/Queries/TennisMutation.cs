using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TennisPostgresGraphQLCSharp.InputTypes;
using TennisPostgresGraphQLCSharp.Models;
using TennisPostgresGraphQLCSharp.Services;
using TennisPostgresGraphQLCSharp.Types;

namespace TennisPostgresGraphQLCSharp.Queries
{
    public class TennisMutation : ObjectGraphType<object>
    {
        public TennisMutation(CountryService countryService, PlayerService playerService, RankingService rankingService)
        {
            /*
            mutation {
                createCountry(country: {code: "mon", name: "mongoland", imageLink: "linky"}) {
                    id
                }
            }
            */
            Name = "TennisMutation";
            Description = "Mutations for a database of tennis players, their countries and their rankings throughout recent years";

            Field<CountryType>(
                name: "createCountry",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<CountryInputType>> {Name = "country"}
                ),
                resolve: context =>
                {
                    IDictionary<string, object> dicCountry = (IDictionary<string, object>) context.Arguments["country"];
                    var country = new Country
                    {
                        Code = (string)dicCountry["code"],
                        Name = (string)dicCountry["name"],
                        ImageLink = (string)dicCountry["imageLink"]
                    };
                    Task<Country> taskCountry = countryService.Add(country);
                    return taskCountry;
                }
            );


            Field<CountryType>(
                name: "updateCountry",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<CountryInputType>> { Name = "country" },
                    new QueryArgument<NonNullGraphType<LongGraphType>> { Name = "id" }
                ),
                resolve: context =>
                {
                    IDictionary<string, object> dicCountry = (IDictionary<string, object>)context.Arguments["country"];
                    var country = new Country
                    {
                        Code = (string)dicCountry["code"],
                        Name = (string)dicCountry["name"],
                        ImageLink = (string)dicCountry["imageLink"]
                    };
                    long id = (long)context.Arguments["id"];
                    Task<Country> taskCountry = countryService.Update(id, country);
                    return taskCountry;
                }
            );


            Field<PlayerType>(
                name: "updatePlayer",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<PlayerInputType>> { Name = "input" }
                ),
                resolve: context =>
                {
                    IDictionary<string, object> dict = (IDictionary<string, object>)context.Arguments["input"];
                    var input = new PlayerInput();
                    if (dict.ContainsKey("id")) input.Id = (long)dict["id"];
                    if (dict.ContainsKey("name")) input.Name = (string)dict["name"];
                    if (dict.ContainsKey("countryId")) input.CountryId = (long)dict["countryId"];
                    if (dict.ContainsKey("handed")) input.Handed = (string)dict["handed"];
                    if (dict.ContainsKey("dob")) input.Dob = (DateTime?)dict["dob"];
                    if (dict.ContainsKey("homeTown")) input.HomeTown = (string)dict["homeTown"];
                    if (dict.ContainsKey("heightFeet")) input.HeightFeet = (int?)dict["heightFeet"];
                    if (dict.ContainsKey("heightInches")) input.HeightInches = (int?)dict["heightInches"];
                    if (dict.ContainsKey("weight")) input.Weight = (int?)dict["weight"];
                    if (dict.ContainsKey("gender")) input.Gender = (string)dict["gender"];
                    if (dict.ContainsKey("turnedPro")) input.TurnedPro = (int?)dict["turnedPro"];
                    if (dict.ContainsKey("photo")) {
                        if (dict["photo"] == null) {
                            input.Photo = null;
                        } else {
                            List<byte> lstB = new List<byte>();
                            foreach (var objB in (List<object>)dict["photo"]) {
                                byte b = (byte)objB;
                                lstB.Add(b);
                            }
                            byte[] arrB = lstB.ToArray();
                            input.Photo = arrB;
                        }
                    }
                    Task<Player> taskPlayer = playerService.Update(input.Id.Value, input);
                    return taskPlayer;
                }
            );


            Field<RankingType>(
                name: "updateRanking",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<RankingInputType>> { Name = "input" }
                ),
                resolve: context =>
                {
                    IDictionary<string, object> dict = (IDictionary<string, object>)context.Arguments["input"];
                    var input = new RankingInput();
                    if (dict.ContainsKey("id")) input.Id = (long)dict["id"];
                    // Ignore PlayerId - can't be updated
                    // Ignore Year - can't be updated
                    if (dict.ContainsKey("movement")) input.Movement = (int?)dict["movement"];
                    if (dict.ContainsKey("rank")) input.Rank = (int?)dict["rank"];
                    if (dict.ContainsKey("points")) input.Points = (int?)dict["points"];
                    if (dict.ContainsKey("prizeMoney")) input.PrizeMoney = (int?)dict["prizeMoney"];
                    if (dict.ContainsKey("singlesTitles")) input.SinglesTitles = (int?)dict["singlesTitles"];
                    if (dict.ContainsKey("doublesTitles")) input.DoublesTitles = (int?)dict["doublesTitles"];
                    if (dict.ContainsKey("singlesWin")) input.SinglesWin = (int?)dict["singlesWin"];
                    if (dict.ContainsKey("singlesLoss")) input.SinglesLoss = (int?)dict["singlesLoss"];

                    Task<Ranking> task = rankingService.Update(input.Id.Value, input);
                    return task;
                }
            );

        }
    }
}
