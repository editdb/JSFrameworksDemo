using CoreApi.Client.Sdk.Api;
using CoreApi.Client.Sdk.Client;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TennisMvcClient.Services
{
    public class ServiceBase
    {
        private IConfiguration _appConfig;
        protected Configuration config;
        protected CountriesApi capi;
        protected PlayersApi papi;
        protected RankingsApi rapi;


        public ServiceBase(IConfiguration appConfig)
        {
            this._appConfig = appConfig;
            this.config = new Configuration();
            this.config.BasePath = _appConfig.GetValue<string>("BasePath");
            this.capi = new CountriesApi(this.config);
            this.papi = new PlayersApi(this.config);
            this.rapi = new RankingsApi(this.config);
        }
    }
}
