using CoreApi.Client.Sdk.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TennisMvcClient.ModelExtensions
{

//    [MetadataTypeAttribute(typeof(PlayerExtension.Metadata))]

    public class RankingExtension : Ranking
    {
        public RankingExtension() : base()
        {
        }
        public RankingExtension(Ranking ranking) : base()
        {
            this.Map(ranking);
        }

    }
}
