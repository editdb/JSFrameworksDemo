
using System.Linq;
using System.Net.Http;
using FluentAssertions;
using System.Diagnostics;
using System.Reflection;
using System.Threading.Tasks;
using TennisAngular10.Models;
using Xunit;
using System.Collections.Generic;

namespace TennisPostgresWebApiIntegTest
{
    public class CountryTests : IntegrationTest
    {
        public CountryTests()
        {
        }


        [Fact]
        public async Task Create_Country_Succeeds()
        {
            // Act
            // Arrange
            var createdCountry = await CreateCountryAsync("nvr", "Neverland", "https://www.gannett-cdn.com/presto/2019/01/29/USAT/01315e02-ad6d-4ef3-826b-f50cbfc5017e-AP_Neverland_Ranch.JPG");

            //Assert
            createdCountry.Code.Should().Equals("nvr");

            // Arrange
            var response = await TestClient.GetAsync("api/Countries");
            var content = await response.Content.ReadAsAsync<IEnumerable<Country>>();
            //Assert
            content.Count().Should().Equals(1);

        }


        [Fact]
        public async Task List_Country_Initially_Size_0()
        {
            // Act
            var response = await TestClient.GetAsync("api/Countries");

            // Arrange
            var content = await response.Content.ReadAsAsync<IEnumerable<Country>>();

            //Assert
            content.Count().Should().Equals(0);
        }


        [Fact]
        public async Task Create_Three_Countries_Size_3()
        {
            // Act
            var country1 = await CreateCountryAsync("nv1", "Neverland 1", "https://www.gannett-cdn.com/presto/2019/01/29/USAT/01315e02-ad6d-4ef3-826b-f50cbfc5017e-AP_Neverland_Ranch.JPG");
            var country2 = await CreateCountryAsync("nv2", "Neverland 2", "https://www.gannett-cdn.com/presto/2019/01/29/USAT/01315e02-ad6d-4ef3-826b-f50cbfc5017e-AP_Neverland_Ranch.JPG");
            var country3 = await CreateCountryAsync("nv3", "Neverland 3", "https://www.gannett-cdn.com/presto/2019/01/29/USAT/01315e02-ad6d-4ef3-826b-f50cbfc5017e-AP_Neverland_Ranch.JPG");
            // Arrange
            var response = await TestClient.GetAsync("api/Countries");
            var content = await response.Content.ReadAsAsync<IEnumerable<Country>>();
           //Assert
            content.Count().Should().Equals(3);

        }


        [Fact]
        public async Task List_Countries_Alphabetically()
        {
            // Act
            var country1 = await CreateCountryAsync("nv1", "Betaland", "https://www.gannett-cdn.com/presto/2019/01/29/USAT/01315e02-ad6d-4ef3-826b-f50cbfc5017e-AP_Neverland_Ranch.JPG");
            var country2 = await CreateCountryAsync("nv3", "Gammaland", "https://www.gannett-cdn.com/presto/2019/01/29/USAT/01315e02-ad6d-4ef3-826b-f50cbfc5017e-AP_Neverland_Ranch.JPG");
            var country3 = await CreateCountryAsync("nv2", "Alphaland", "https://www.gannett-cdn.com/presto/2019/01/29/USAT/01315e02-ad6d-4ef3-826b-f50cbfc5017e-AP_Neverland_Ranch.JPG");
            // Arrange
            var response = await TestClient.GetAsync("api/Countries");
            var content = await response.Content.ReadAsAsync<IEnumerable<Country>>();
            //Assert
            ((Country)content.First()).Name.Should().Be("Alphaland");
            ((Country)content.Last()).Name.Should().Be("Gammaland");

        }
    }
}
