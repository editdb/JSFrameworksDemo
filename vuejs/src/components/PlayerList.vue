<template>
  <div>
    <label for="selectGender">Competition </label>
    <select id="selectGender" v-model="selectedGender" @change="refreshRankingsList">
      <option v-for="gender in genders" :key="gender.id" :value="gender.id">{{gender.value}}</option>
    </select>
    &nbsp;&nbsp;
    <label for="selectYear">Year </label>
    <select id="selectYear" v-model="selectedYear" @change="refreshRankingsList">
      <option v-for="year in years" :key="year" :value="year">{{year}}</option>
    </select>

    <div v-for="ranking in rankingsList" :key="ranking.Id">
      -{{ranking.PlayerName}}
    </div>
  </div>
</template>

<script>
import DataMixin from "../mixins/data-mixin";
//import PlayerService from "../services/player-service";

export default {
  name: 'PlayerList',
  props: {
  },
  mixins: [DataMixin],
  data() {
    return {
      selectedGender: '',
      selectedYear: '',
      genders: [
        {id: 'M', value: 'Men\'s'},
        {id: 'F', value: 'Women\'s'}
      ]
    }
  },
  methods: {
    refreshRankingsList() {
      this.getRankingsList(this.selectedYear, this.selectedGender);
    }
  },

  beforeMount() {
    this.selectedGender = this.genders[0].id;
    this.getYears().then(() => {
      this.selectedYear = this.years[1];
      this.getRankingsList(this.selectedYear, this.selectedGender);
    });
    
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
