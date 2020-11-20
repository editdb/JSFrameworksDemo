import axios from "axios"
let rootUrl = "http://localhost:53315/api";
var DataMixin = {
    props: {
    },
    data() {
        return {
            rankingsList: [],
            ranking: {},
            years: [],
            countries: [],
            player: {},
            playerName: "",
            turnedProYears: Array.from({length: 40}, (_, i) => i - 40 + new Date().getFullYear())
        };
    },
    methods: {
        async getRankingsList(year, gender) {
            console.log(`get player list for ${year}, gender ${gender}`);
            let res = await axios.get(`${rootUrl}/RankingsList/${year}/${gender}`);
            this.$set(this, "rankingsList", res.data);
        },
        async getRanking(rankingId) {
            console.log(`get ranking for ${rankingId}`);
            let thenable = await axios.get(`${rootUrl}/Rankings/${rankingId}`);
            this.$set(this, "ranking", thenable.data);
            //console.log("open(), playerName=" + typeof this.ranking);
            return thenable;
        },
        async updateRanking(id, ranking) {
            console.log(`update ranking for id ${id}`);
            await axios.put(`${rootUrl}/Rankings/${id}`, ranking);
        },
        async getPlayer(id) {
            console.log(`get player for id ${id}`);
            let res = await axios.get(`${rootUrl}/Players/${id}`);
            this.$set(this, "player", res.data);
            this.player.DobDMY = this.player.Dob;
            if (this.player.Dob != null) {
                this.player.DobDMY = this.player.Dob.substring(8, 10) + 
                    "/" + this.player.Dob.substring(5, 7) + 
                    "/" + this.player.Dob.substring(0, 4);
            }
        },
        async getPlayerName(id) {
            console.log(`get player name for id ${id}`);
            let res = await axios.get(`${rootUrl}/PlayerName/${id}`);
            this.$set(this, "playerName", res.data);
        },
        async updatePlayer(id, updatedPlayer) {
            console.log(`update player for id ${id}`);
            if (updatedPlayer.DobDMY != null) {
                updatedPlayer.Dob = updatedPlayer.DobDMY.substring(6, 10) + 
                    "-" + updatedPlayer.DobDMY.substring(3, 5) + 
                    "-" + updatedPlayer.DobDMY.substring(0, 2) +
                    "T00:00:00";
            }
            //let res = 
                await axios.put(`${rootUrl}/Players/${id}`, updatedPlayer);
            //this.$set(this, "player", res.data);
        },
        async getCountries() {
            console.log(`get countries`);
            let res = await axios.get(`${rootUrl}/Countries`);
            this.$set(this, "countries", res.data);
        },
        async getYears() {
            console.log(`get years`);
            let res = await axios.get(`${rootUrl}/Years`);
            this.$set(this, "years", res.data);
       },

       formatError(err) {   // pass in err.response.data
       var errorText = "";
       if (typeof err == 'string') {
         errorText = err;
       } else {
         errorText = err.errors[Object.keys(err.errors)[0]];
       }
       var idx = errorText.indexOf("Exception: ");
       if (idx > -1) {
         errorText = errorText.substring(idx + "Exception: ".length);
       }
       idx = errorText.indexOf("\r\n   at ");
       if (idx > -1) {
         errorText = errorText.substring(0, idx);
       }
 
       return errorText;
     }      

    }
  };

  export default DataMixin;