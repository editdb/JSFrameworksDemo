using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using FluentAssertions;
using TechTalk.SpecFlow;
using TennisAngular10.Models;

namespace TennisPostgresWebApiIntegTest
{
    [Binding]
    public class CountryFeatureFileSteps : IntegrationTest
    {
        private readonly ScenarioContext _scenarioContext;

        public CountryFeatureFileSteps(ScenarioContext scenarioContext)
        {
            _scenarioContext = scenarioContext;

        }

        public new void Dispose()
        {
            base.Dispose();
        }

        [Given(@"I have some unordered countries")]
        public void GivenIHaveSomeUnorderedCountries()
        {
            var task = CreateCountryAsync("nv1", "Betaland", "https://www.gannett-cdn.com/presto/2019/01/29/USAT/01315e02-ad6d-4ef3-826b-f50cbfc5017e-AP_Neverland_Ranch.JPG");
            var country1 = task.Result;
            task = CreateCountryAsync("nv3", "Gammaland", "https://www.gannett-cdn.com/presto/2019/01/29/USAT/01315e02-ad6d-4ef3-826b-f50cbfc5017e-AP_Neverland_Ranch.JPG");
            var country2 = task.Result;
            task = CreateCountryAsync("nv2", "Alphaland", "https://www.gannett-cdn.com/presto/2019/01/29/USAT/01315e02-ad6d-4ef3-826b-f50cbfc5017e-AP_Neverland_Ranch.JPG");
            var country3 = task.Result;
        }

        [When(@"I ask for them")]
        public void WhenIAskForThem()
        {
            var task = TestClient.GetAsync("api/Countries");
            var task2 = task.Result.Content.ReadAsAsync<IEnumerable<Country>>();
            var content = task2.Result;
            _scenarioContext.Add("content", content);
        }

        [Then(@"they are ordered alphabetically")]
        public void ThenTheyAreOrderedAlphabetically()
        {
            IEnumerable<Country> content = _scenarioContext.Get<IEnumerable<Country>>("content");
            ((Country)content.First()).Name.Should().Be("Alphaland");
            ((Country)content.Last()).Name.Should().Be("Gammaland");
            //throw new Exception("Temporary exception");
        }
    }
}
