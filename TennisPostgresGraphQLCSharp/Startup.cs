using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//using System.Web.Mvc;

using GraphiQl;
using GraphQL;
using GraphQL.Types;
using GraphQL.NewtonsoftJson;
using TennisPostgresGraphQLCSharp.Types;
using TennisPostgresGraphQLCSharp.Queries;
using TennisPostgresGraphQLCSharp.Models;
using Microsoft.EntityFrameworkCore;
using TennisPostgresGraphQLCSharp.Services;
using Microsoft.AspNetCore.Mvc;

namespace TennisPostgresGraphQLCSharp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            services.AddDbContext<TennisDBContext>(options =>
                options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));


            //services.AddScoped<IDependencyResolver>(_ => new FuncDependencyResolver(_.GetRequiredService));

            services.AddScoped<IDocumentExecuter, DocumentExecuter>();
            services.AddScoped<IDocumentWriter, DocumentWriter>();

            services.AddScoped<CountryService>();
            services.AddScoped<PlayerService>();
            services.AddScoped<RankingService>();
            services.AddScoped<TennisQuery>();
            services.AddScoped<CountryType>();
            services.AddScoped<PlayerType>();
            services.AddScoped<RankingType>();
            services.AddScoped<IntNullableType>();
            services.AddScoped<ISchema, GraphQLTennisSchema>();

            services.AddMvc(options => options.EnableEndpointRouting = false);

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            }
            else {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseRouting();

            //app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
            app.UseGraphiQl("/graphiql", "/graphql");
            //app.UseWebSockets();
            app.UseMvc();
             

        }
    }
}
