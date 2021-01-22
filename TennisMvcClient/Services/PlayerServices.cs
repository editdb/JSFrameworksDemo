using CoreApi.Client.Sdk.Model;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace TennisMvcClient.Services
{
    public class PlayerServices : ServiceBase
    {
        public PlayerServices(IConfiguration appConfig) : base (appConfig)
        {
        }
        public async Task<Player> getPlayer(long id)
        {
            return await papi.ApiPlayersIdGetAsync(id);
        }

        public async Task<string> getPlayerName(long id)
        {
            var player = await papi.ApiPlayersIdGetAsync(id);
            return player.Name;
        }

        public async Task updatePlayer(Player player)
        {
            await papi.ApiPlayersIdPutAsync(player.Id, player);
        }

    }
}
