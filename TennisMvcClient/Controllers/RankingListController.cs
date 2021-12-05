using CoreApi.Client.Sdk.Api;
using CoreApi.Client.Sdk.Client;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Text;
using System.Linq;
using TennisMvcClient.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Debug;

namespace TennisMvcClient.Controllers
{
    public class RankingListController : Controller
    {
        private IConfiguration _config;
        private ILogger<DebugLoggerProvider> _loggerDebug;

        public RankingListController(IConfiguration config, ILogger<DebugLoggerProvider> loggerDebug) : base()
        {
            _config = config;
            _loggerDebug = loggerDebug;
        }

        public IActionResult Index(RankingListModel model)
        {
            Configuration config = new Configuration();
            config.BasePath = _config.GetValue<string>("BasePath");
            RankingsApi rapi = new RankingsApi(config);

            List<int> years = rapi.ApiYearsGet();
            List<SelectListItem> sliYears = new List<SelectListItem>();
            foreach (var year in years) {
                sliYears.Add(new SelectListItem("" + year, "" + year));
            }
            model.years = sliYears;

            if (Request.Method.Equals("GET")) {
                if (sliYears.Count > 2) {
                    sliYears[0].Selected = true;
                }
                model.selectGender = "M";
                model.selectYear = sliYears[0].Value;
            }

            return View(model);
        }

        [Route("/RankingList/GetRankingList/{year}/{gender}")]
        public string GetRankingList(int year, string gender, string sEcho, int iDisplayStart, int iDisplayLength, string sSearch)
        {
            Configuration config = new Configuration();
            config.BasePath = _config.GetValue<string>("BasePath");
            _loggerDebug.Log(LogLevel.Information , "config.BasePath={Value}", config.BasePath);

            RankingsApi rapi = new RankingsApi(config);
            var records = rapi.ApiRankingsListYearGenderGet(year, gender);


            string test = string.Empty;
            if (sSearch == null) {
                sSearch = "";
            }
            sSearch = sSearch.ToLower();
            int totalRecord = records.Count();
            if (!string.IsNullOrEmpty(sSearch)) {
                records = records.Where(a => a.PlayerName.ToLower().Contains(sSearch)).ToList();
            }
            records = records.OrderBy(a => a.Rank).Skip(iDisplayStart).Take(iDisplayLength).ToList();

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
    }
}
