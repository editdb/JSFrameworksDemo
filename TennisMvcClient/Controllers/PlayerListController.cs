using CoreApi.Client.Sdk.Api;
using CoreApi.Client.Sdk.Client;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Text;
using System.Linq;
using TennisMvcClient.Models;
using Newtonsoft.Json;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Debug;

namespace TennisMvcClient.Controllers
{
    public class PlayerListController : Controller
    {
        private IConfiguration _config;
        private ILogger<DebugLoggerProvider> _loggerDebug;
        public PlayerListController(IConfiguration config, ILogger<DebugLoggerProvider> loggerDebug) : base()
        {
            _config = config;
            _loggerDebug = loggerDebug;
        }

        public IActionResult Index()
        {
             return View();
        }

        public string GetPlayerList(string sEcho, int iDisplayStart, int iDisplayLength, string sSearch)
        {
            Configuration config = new Configuration();
            config.BasePath = _config.GetValue<string>("BasePath");
            if (config.BasePath.EndsWith("/api")) {
                config.BasePath = config.BasePath.Substring(0, config.BasePath.LastIndexOf("/api"));
            }
            _loggerDebug.Log(LogLevel.Warning , "config.BasePath={Value}", config.BasePath);

            PlayersApi papi = new PlayersApi(config);
            var records = papi.ApiPlayersWithCountryGet();


            string test = string.Empty;
            if (sSearch == null) {
                sSearch = "";
            }
            sSearch = sSearch.ToLower();
            int totalRecord = records.Count();
            if (!string.IsNullOrEmpty(sSearch)) {
                records = records.Where(a => a.Name.ToLower().Contains(sSearch)).ToList();
            }
            records = records.OrderBy(a => a.Name).Skip(iDisplayStart).Take(iDisplayLength).ToList();

            StringBuilder sb = new StringBuilder();
            sb.Clear();
            sb.Append("{");
            sb.Append("\"sEcho\": ");
            sb.Append(sEcho);
            sb.Append(",");
            sb.Append("\"iTotalRecords\": ");
            sb.Append(totalRecord);
            sb.Append(",");
            sb.Append("\"iTotalDisplayRecords\": ");
            sb.Append(totalRecord);
            sb.Append(",");
            sb.Append("\"aaData\": ");
            sb.Append(JsonConvert.SerializeObject(records));
            sb.Append("}");
            return sb.ToString();
        }

        public string GetPlayerList2(int draw, int start, int length, string search)
        {
            Configuration config = new Configuration();
            config.BasePath = _config.GetValue<string>("BasePath");
            PlayersApi papi = new PlayersApi(config);
            var records = papi.ApiPlayersWithCountryGet();


            string test = string.Empty;
            if (search == null) {
                search = "";
            }
            search = search.ToLower();
            int totalRecord = records.Count();
            if (!string.IsNullOrEmpty(search)) {
                records = records.Where(a => a.Name.ToLower().Contains(search)).ToList();
            }
            records = records.OrderBy(a => a.Name).Skip(start).Take(length == 0? totalRecord : length).ToList();

            StringBuilder sb = new StringBuilder();
            sb.Clear();
            sb.Append("{");
            sb.Append("\"draw\": ");
            sb.Append(draw);
            sb.Append(",");
            sb.Append("\"recordsTotal\": ");
            sb.Append(totalRecord);
            sb.Append(",");
            sb.Append("\"recordsFiltered\": ");
            sb.Append(totalRecord);
            sb.Append(",");
            sb.Append("\"data\": ");
            sb.Append(JsonConvert.SerializeObject(records));
            sb.Append("}");
            return sb.ToString();
        }
    }
}
