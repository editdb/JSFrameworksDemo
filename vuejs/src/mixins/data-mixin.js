import axios from "axios"
let rootUrl = "http://localhost:53315/api";
var DataMixin = {
    props: {
    },
    data() {
        return {
            rankingsList: [],
            years: [],
            countries: [],
            player: {}
        };
    },
    methods: {
        async getRankingsList(year, gender) {
            console.log(`get player list for ${year}, gender ${gender}`);
            let res = await axios.get(`${rootUrl}/RankingsList/${year}/${gender}`);
            this.$set(this, "rankingsList", res.data);
        },
        async getPlayer(id) {
            console.log(`get player for id ${id}`);
            let res = await axios.get(`${rootUrl}/Players/${id}`);
            this.$set(this, "player", res.data);
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


    }
  };

  export default DataMixin;