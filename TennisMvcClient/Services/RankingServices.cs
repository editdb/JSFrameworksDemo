using CoreApi.Client.Sdk.Model;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TennisMvcClient.Services
{
    public class RankingServices : ServiceBase
    {
        public RankingServices(IConfiguration appConfig) : base (appConfig)
        {
        }
        public async Task<IEnumerable<int>> getYears()
        {
            return await rapi.ApiYearsGetAsync();
        }
    }
}
