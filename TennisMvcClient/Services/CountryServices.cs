using CoreApi.Client.Sdk.Model;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TennisMvcClient.Services
{
    public class CountryServices : ServiceBase
    {
        public CountryServices(IConfiguration appConfig) : base (appConfig)
        {
        }
        public async Task<IEnumerable<Country>> getCountries()
        {
            return await capi.ApiCountriesGetAsync();
        }
    }
}
