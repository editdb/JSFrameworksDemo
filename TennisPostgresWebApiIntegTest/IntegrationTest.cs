using System;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TennisAngular10;
using TennisAngular10.Models;


namespace TennisPostgresWebApiIntegTest
{
    public class IntegrationTest
    {
        protected readonly HttpClient TestClient;
        protected TennisDBContext _context;

        protected IntegrationTest()
        {
            var appFactory = new WebApplicationFactory<Startup>()
                .WithWebHostBuilder(builder =>
                {
                    builder.ConfigureServices(services =>
                    {
                        // Remove the app's ApplicationDbContext registration.
                        var descriptor = services.SingleOrDefault(
                            d => d.ServiceType ==
                                typeof(DbContextOptions<TennisDBContext>));

                        if (descriptor != null) {
                            services.Remove(descriptor);
                        }

                        // Add ApplicationDbContext using an in-memory database for testing.
                        var keepAliveConnection = new SqliteConnection("DataSource=:memory:");
                        keepAliveConnection.Open();

                        services.AddDbContext<TennisDBContext>(options =>
                        {
                            //options.UseSqlite("Filename=:memory:");
                            options.UseSqlite(keepAliveConnection);
                        });

                        // Build the service provider.


                        services.BuildServiceProvider();
                    });
                });

            var scopeFactory = appFactory.Services.GetService<IServiceScopeFactory>();
            using (var scope = scopeFactory.CreateScope()) {
                _context = scope.ServiceProvider.GetService<TennisDBContext>();

                _context.Database.EnsureCreated();
            }

            TestClient = appFactory.CreateClient();
        }


        public void Dispose()
        {
            TestClient.Dispose();
            _context.Database.EnsureDeleted();
            ((IDisposable)_context).Dispose();
        }


        protected async Task AuthenticateAsync()
        {
            /*
            TestClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", await GetJwtAsync());
            */
        }

        /*
        protected async Task<PostResponse> CreatePostAsync(CreatePostRequest request)
        {
            var response = await TestClient.PostAsJsonAsync(ApiRoutes.Posts.Create, request);
            return await response.Content.ReadAsAsync<PostResponse>();
        }
        */

        private async Task<string> GetJwtAsync()
        {
            /*
            var response = await TestClient.PostAsJsonAsync(ApiRoutes.Identity.Register, new UserRegistrationRequest
            {
                Email = "test@integration.com",
                Password = "SomePass1234!"
            });

            var registrationResponse = await response.Content.ReadAsAsync<AuthSuccessResponse>();
            return registrationResponse.Token;
            */
            return "";
        }
        protected async Task<Country> CreateCountryAsync(string code, string name, string imageLink)
        {
            Country country = new Country
            {
                Code = code,
                Name = name,
                ImageLink = imageLink
            };
            var response = await TestClient.PostAsJsonAsync("api/Countries", country);
            return await response.Content.ReadAsAsync<Country>();
        }


    }
}
