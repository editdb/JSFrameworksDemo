using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TennisMvcClient.Models
{
    public class RankingListModel
    {
        public string selectGender { get; set; }
        public string selectYear { get; set; }

        public IEnumerable<SelectListItem> genders = new SelectListItem[] { new SelectListItem("Men's", "M"), new SelectListItem("Women's", "F") };
        public IEnumerable<SelectListItem> years { get; set; }
    }
}
