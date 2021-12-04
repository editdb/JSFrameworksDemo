<template>
  <md-dialog :md-active.sync="value" :md-close-on-esc="false" :md-click-outside-to-close="false"
    @md-opened="open">
  <md-dialog-content>

    <div style="padding-bottom: 20px;">
      <div style="display:inline-block; font-size: 1.5em; margin-top: 0.5em;">
      {{getCompetitionName()}} Competition - {{this.year}}
      </div>
      <span style="float:right;">
        <md-button class="md-raised md-accent" @click="close()">Cancel</md-button>
      </span>
    </div>

    <pie-chart :chartData="chartData" :options="chartOptions"></pie-chart>

    </md-dialog-content>
  </md-dialog>
</template>

<script>

import DataMixin from "../mixins/data-mixin";
import PieChart from './PieChart'

export default {
  name: 'RankingListChartDialog',
  components: {
    PieChart
  },
  props: {
      value: {
        required: true
      },
      gender: {
        required: true
      },
      year: {
        required: true
      },
      type: {
        required: true
      }
  },
  mixins: [DataMixin],
  data() {
    return {
      genders: [
        {id: 'M', value: 'Men\'s'},
        {id: 'F', value: 'Women\'s'}
      ],

      chartData: {},
      chartOptions: {},
    }
  },
  methods: {
    close() {
      //console.log("close()");
      this.clearForm();
      this.$emit("input", !this.value);
    },
    clearForm() {
      //console.log("clearForm()");
      this.chartOptions = {};
      this.chartData = {};
    },
    open() {
      //console.log("open(), gender=" + this.gender + ", year=" + this.year);

      this.getRankingsList(this.year, this.gender).then(
        () => {
          var chartLabels = this.rankingsList.map((rec) => rec.PlayerName);
          var chartBackgroundColor = [];
          for(let i=0;i<chartLabels.length;i++){
            chartBackgroundColor.push('#'+Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'));
          }
          //this.chartData.datasets[0].data = this.rankingsList.map((rec) => rec.Points);
          //console.log("this.chartData.labels=" + this.chartData.labels);
          //console.log("this.chartData.datasets[0].data=" + this.chartData.datasets[0].data);
          //console.log("chartBackgroundColor=" + chartBackgroundColor);
          this.chartOptions = {
            title: {
              display: true,
              text: this.type=='points'?'Points':'Prize Money'
            }
            
            ,
            tooltips: this.type=='points'?{} :{
              callbacks: {
                  label: 
                    function(tooltipItem, data) {
                    var xLabel = data.labels[tooltipItem.index] || '';
                    var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    var yLabel = value >= 1000 ? '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '$' + value;
                    return xLabel + ': ' + yLabel;
                  }
              }
            }
            
          };
          this.chartData = {
            labels: chartLabels,
            datasets: [
              {
                label: 'GitHub Commits',
                data: this.rankingsList.map((rec) => this.type=='points'?rec.Points:rec.PrizeMoney, this),
                backgroundColor: chartBackgroundColor,
                borderWidth: 1,
                hoverOffset: 4,
              }
            ]
          };
        }
      );
    },
    getCompetitionName() {
      return this.genders.filter(function(item) { return item.id == this.gender; }, this)[0].value;
    }

  },

  beforeMount() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* fix for md-dialog appearing off-centre */
.md-dialog /deep/ .md-dialog-container {
  transform: none;
  width: 500px;
  height: 500px;
  padding-top: 0px;
  padding-left: 20px;
  padding-right: 20px;
  overflow-y:scroll;  /* Fix to get hover tooltip to work on pie chart */
}

.md-dialog-content {
  margin-top: -10px;
}

.md-button {
  font-weight: bold;
  text-transform: none !important;
}

</style>
