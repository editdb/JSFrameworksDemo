<template>
  <div>
    <div class="md-layout md-gutter">
      <div style="display:inline-block; font-size: 1.5em; margin-left: 1.0em; margin-top: 1.0em;">
      Rankings
      </div>
      <div class="md-layout-item smaller-width">
        <md-field>
          <label for="selectGender">Competition </label>
          <md-select id="selectGender" v-model="selectedGender" @md-selected="refreshList" md-dense >
            <md-option v-for="gender in genders" :key="gender.id" :value="gender.id">{{gender.value}}</md-option>
          </md-select>
        </md-field>
      </div>  
      <div class="md-layout-item smaller-width">  
        <md-field>
          <label for="selectYear">Year </label>
          <md-select id="selectYear" v-model="selectedYear" @md-selected="refreshList" md-dense >
            <md-option v-for="year in years" :key="year" :value="year">{{year}}</md-option>
          </md-select>
        </md-field>
      </div>
      <div class="md-layout-item smaller-width align-middle">  
        <a href="#" @click="openChartPoints(); $event.preventDefault();">Chart Points</a>
        <div style="display: inline-block; width: 15px;"> </div>
        <a href="#" @click="openChartPrizeMoney(); $event.preventDefault();">Chart Prize Money</a>
      </div>
    </div>

    <md-table v-model="rankingsList" md-card md-sort="Rank" md-sort-order="asc">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Rank" md-sort-by="Rank">{{ item.Rank }}</md-table-cell>
        <md-table-cell md-label="Player's Name">{{ item.PlayerName }}</md-table-cell>
        <md-table-cell md-label="Country" :title="item.CountryName"><img :src="item.CountryImageLink"></md-table-cell>
        <md-table-cell md-label="Points">{{ item.Points }}</md-table-cell>
        <md-table-cell md-label="Prize Money" md-sort-by="PrizeMoney">${{ item.PrizeMoney }}</md-table-cell>
        <md-table-cell md-label="Actions">
          <div style="display: inline-block"><a href="#" @click="openPlayerEditDialog(item.PlayerId); $event.preventDefault();">Edit Player</a></div>
          <div style="display: inline-block; width: 15px;"> </div> 
          <div style="display: inline-block"><a href="#" @click="openRankingEditDialog(item.Id); $event.preventDefault();">Edit Ranking</a></div>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <ranking-list-chart-dialog v-model="chartDialogOpen" :gender="selectedGender" :year="selectedYear" :type="chartType"></ranking-list-chart-dialog>
    <player-edit-dialog v-model="playerEditDialogOpen" :playerId="playerId"></player-edit-dialog>
    <ranking-edit-dialog v-model="rankingEditDialogOpen" :rankingId="rankingId"></ranking-edit-dialog>
<!--
    <div v-for="ranking in rankingsList" :key="ranking.Id">
      -{{ranking.PlayerName}}
    </div>
-->    
  </div>
</template>

<script>
import DataMixin from "../mixins/data-mixin";
import RankingListChartDialog from "./RankingListChartDialog";
import PlayerEditDialog from "./PlayerEditDialog";
import RankingEditDialog from "./RankingEditDialog";
//import PlayerService from "../services/player-service";

//import { MdField, MdSelect, MdOption } from 'vue-material/dist/components';


export default {
  name: 'RankingList',
  components: {
    RankingListChartDialog,
    PlayerEditDialog,
    RankingEditDialog
  },
  props: [],
  mixins: [DataMixin],
  data() {
    return {
      selectedGender: '',
      selectedYear: '',
      genders: [
        {id: 'M', value: 'Men\'s'},
        {id: 'F', value: 'Women\'s'}
      ],
      chartDialogOpen: false,
      chartType: '',
      playerEditDialogOpen: false,
      playerId: 0,
      rankingEditDialogOpen: false,
      rankingId: 0
    }
  },
  methods: {
    refreshList() {
      this.getRankingsList(this.selectedYear, this.selectedGender);
    },
    openChartPoints() {
      this.chartType = "points";
      //console.log("ChartPoints: gender=" + gender + ", year=" + year + ", this.chartType=" + this.chartType);
      this.chartDialogOpen = false; // needed as need to trigger a change and sometimes value left at true
      this.chartDialogOpen = true;
    },
    openChartPrizeMoney() {
      this.chartType = "prizeMoney";
      //console.log("ChartPrizeMoney: gender=" + gender + ", year=" + year + ", this.chartType=" + this.chartType);
      this.chartDialogOpen = false; // needed as need to trigger a change and sometimes value left at true
      this.chartDialogOpen = true;
    },
    openPlayerEditDialog(playerId) {
      console.log("playerId=" + playerId);
      this.playerId = playerId;
      this.playerEditDialogOpen = false; // needed as need to trigger a change and sometimes value left at true
      this.playerEditDialogOpen = true;
    },
    openRankingEditDialog(rankingId) {
      console.log("rankingId=" + rankingId);
      this.rankingId = rankingId;
      this.rankingEditDialogOpen = false; // needed as need to trigger a change and sometimes value left at true
      this.rankingEditDialogOpen = true;
    }    

  },

  beforeMount() {
    this.selectedGender = this.genders[0].id;
    this.getYears().then(() => {
      this.selectedYear = this.years[2];
      this.getRankingsList(this.selectedYear, this.selectedGender);
    });   
  },

  mounted() {
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.smaller-width {
  max-width: 25%;
}

.md-table-cell {
  text-align: left;
}

.align-middle {
  display : flex;
  align-items : center;
}

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
