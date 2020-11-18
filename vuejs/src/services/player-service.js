import axios from "axios"

export default {
  baseUrl = "http://localhost:53315/api",
  async getRankingList(year, gender) {
    let res = await axios.get(`${this.rootUrl}/RankingsList/${year}/${gender}`);
    return res.data;
  },
  async getYears() {
    let res = await axios.get(`${this.rootUrl}/Years`);
    return res.data;
  }
}