import axios from "axios"
let rootUrl = "http://localhost:53315/api";
var DataMixin = {
    props: {
    },
    data() {
        return {
            rankingsList: [],
            years: []
        };
    },
    methods: {
        async getRankingsList(year, gender) {
            console.log(`get player list for ${year}, gender ${gender}`);
            let res = await axios.get(`${rootUrl}/RankingsList/${year}/${gender}`);
            this.$set(this, "rankingsList", res.data);
            //return res.data;
        },
        async getYears() {
            console.log(`get years`);
            let res = await axios.get(`${rootUrl}/Years`);
            this.$set(this, "years", res.data);
            //return res.data;
        },


    }
  };

  export default DataMixin;