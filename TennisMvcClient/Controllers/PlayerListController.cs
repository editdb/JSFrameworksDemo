﻿using CoreApi.Client.Sdk.Api;
using CoreApi.Client.Sdk.Client;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Text;
using System.Linq;
using TennisMvcClient.Models;
using Newtonsoft.Json;

namespace TennisMvcClient.Controllers
{
    public class PlayerListController : Controller
    {
        private IConfiguration _config;
        public PlayerListController(IConfiguration config) : base()
        {
            _config = config;
        }

        public IActionResult Index()
        {
             return View();
        }

        public string GetPlayerList(string sEcho, int iDisplayStart, int iDisplayLength, string sSearch)
        {
            Configuration config = new Configuration();
            config.BasePath = _config.GetValue<string>("BasePath");
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
    }
}
