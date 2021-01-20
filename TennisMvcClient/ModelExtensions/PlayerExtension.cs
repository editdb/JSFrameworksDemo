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

    public class PlayerExtension : Player
    {
        public PlayerExtension() : base()
        {
        }
        public PlayerExtension(Player player) : base()
        {
            this.Map(player);
        }


        [Required]
        [DisplayName("Name")]
        public new string Name { get { return base.Name; } set { base.Name = value; } }


        // BEWARE: the "o" in the property name "Country" is actually a russian letter and not the latin one.
        // Done to get the name displayed in error message to look like "Country" because blazor ignores DisplayName
        [Required]
        [DisplayName("Country")]   //Blazor ignores this "by design" apparently. Well done Microsoft!
        public long? Cоuntry { get { return base.CountryId==0?(long?)null:base.CountryId; } set { base.CountryId = value.HasValue?value.Value:0; } }


        [Required]
        [DisplayName("Turned Pro")]   //Blazor ignores this "by design" apparently. Well done Microsoft!
        public int? Turned_Pro { get { return TurnedPro; } set { TurnedPro = value; } }



        /*
                internal sealed class Metadata
                {
                    private Metadata()
                    {
                    }

                    [Required]
                    [DisplayName("Name")]
                    public string Name { get; set; }

                }
        */
    }
}
