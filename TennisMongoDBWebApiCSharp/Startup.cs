using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using TennisMongoDB.Models;
using Microsoft.Extensions.Options;
using MongoDB.Bson.Serialization;
using TennisMongoDB.ViewModels;
using MongoDB.Bson;

namespace TennisMongoDB
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
            // requires using Microsoft.Extensions.Options
            services.Configure<TennisDatabaseSettings>(
                Configuration.GetSection(nameof(TennisDatabaseSettings)));

            services.AddSingleton<ITennisDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<TennisDatabaseSettings>>().Value);

            services.AddSingleton<TennisDatabaseContext>();

            services.AddControllers()
                .AddJsonOptions(options => {
                    //.AddNewtonsoftJson(options => { 
                    options.JsonSerializerOptions.PropertyNamingPolicy = null;
                    options.JsonSerializerOptions.WriteIndented = true;
                    //    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                    //    options.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;
                    //     options.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.Objects;
                }); // this line stops the camel-casing of property/column names;

            // Inject an implementation of ISwaggerProvider with defaulted settings applied
            services.AddSwaggerGen();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors(opts =>
                opts.WithOrigins(new string[] {
                    "http://localhost:4200",        // Angular dev
                    "http://192.168.99.100:4200",   // Angular Docker
                    "http://localhost:8080",        // Vue dev
                    "http://192.168.99.100:8080",   // Vue Docker
                    "http://localhost:3000",        // React dev
                    "http://192.168.99.100:3000",   // React Docker
                    "http://localhost:5000",        // .net MVC/Blazor dev
                    "http://192.168.99.100:5000"    // .net MVC/Blazor Docker
               }).AllowAnyMethod().AllowAnyHeader());

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
/*
            var classMap = BsonClassMap.RegisterClassMap<RankingsList>();
            var memberMaps = classMap.AllMemberMaps;

            if (!BsonClassMap.IsClassMapRegistered(typeof(RankingsList))) {
                throw new Exception("RankingsList is not registered classmap");
            }
*/
            BsonTypeMapper.RegisterCustomTypeMapper(typeof(RankingsList), new RankingsListCustomMapper());

            // Enable middleware to serve generated Swagger as a JSON endpoint
            app.UseSwagger();
        }
    }
}
