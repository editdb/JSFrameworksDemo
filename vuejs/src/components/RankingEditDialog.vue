<template>
  <md-dialog :md-active.sync="value" :md-close-on-esc="false" :md-click-outside-to-close="false"
    @md-opened="open">
  <md-dialog-content>

    <div style="padding-bottom: 20px;">
      <div style="display:inline-block; font-size: 1.5em; margin-top: 0.5em;">
      Edit Ranking
      </div>
      <span style="float:right;">
        <md-button class="md-raised" @click="update()">Update</md-button>
        <md-button class="md-raised md-accent" @click="close()">Cancel</md-button>
      </span>
    </div>

    <h3>{{this.playerName}} {{this.ranking.Year}}</h3>

    <div class="md-layout md-gutter">
      <div class="md-layout-item half-width">
        <md-field>
          <label>Points</label>
          <md-input type="number" placeholder="Points" v-model.number="ranking.Points" required md-dense />
        </md-field>
      </div>  

      <div class="md-layout-item half-width">  
        <md-field>
          <label>Prize money</label>
          <md-input type="number" placeholder="Prize money" v-model.number="ranking.PrizeMoney" required md-dense />
        </md-field>
      </div>
    </div>

    <div class="md-layout md-gutter">
      <div class="md-layout-item half-width">
        <md-field>
          <label>Singles titles</label>
          <md-input type="number" placeholder="Singles titles" v-model.number="ranking.SinglesTitles" required md-dense />
        </md-field>
      </div>  

      <div class="md-layout-item half-width">  
        <md-field>
          <label>Doubles titles</label>
          <md-input type="number" placeholder="Doubles titles" v-model.number="ranking.DoublesTitles" required md-dense />
        </md-field>
     </div>
    </div>

    <div class="md-layout md-gutter">
      <div class="md-layout-item half-width">
        <md-field>
          <label>Singles wins</label>
          <md-input type="number" placeholder="Singles wins" v-model.number="ranking.SinglesWin" required md-dense />
        </md-field>
      </div>  

      <div class="md-layout-item half-width">  
        <md-field>
          <label>Singles losses</label>
          <md-input type="number" placeholder="Singles losses" v-model.number="ranking.SinglesLoss" required md-dense />
        </md-field>
     </div>
    </div>
    </md-dialog-content>
  </md-dialog>
</template>

<script>
import DataMixin from "../mixins/data-mixin";


export default {
  name: 'RankingEditDialog',
  components: {
  },
  props: {
      value: {
        required: true
      },
      rankingId: {
        required: true
      }
  },
  mixins: [DataMixin],
  data() {
    return {
      ranking: {
      }
    }
  },
  methods: {
    close() {
      console.log("close()");
      this.clearForm();
      this.$emit("input", !this.value);
    },
    update() {
      console.log("update()");
      this.updateRanking(this.rankingId, this.ranking).then(
        res => {
          res;
          this.clearForm();
          this.$toastr.s("Record updated");
          this.$parent.refreshList();
          this.$emit("input", !this.value);
        },
        err => {
          this.$toastr.e(this.formatError(err.response.data));
        }
      )
    },
    clearForm() {
      console.log("clearForm()");
      this.playerName = "";
      this.ranking.Year = null;
      this.ranking.Points = null;
      this.ranking.PrizeMoney = null;
      this.ranking.SinglesTitles = null;
      this.ranking.DoublesTitles = null;
      this.ranking.SinglesWin = null;
      this.ranking.SinglesLoss = null;
    },
    open() {
      console.log("open(), rankingId=" + this.rankingId);
      this.getRanking(this.rankingId).then(
        res => {
          this.getPlayerName(res.data.PlayerId);
        },
        err => {err}
      );
    },

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
  height: 320px;
  padding-top: 0px;
  padding-left: 20px;
  padding-right: 20px;
}

.md-dialog-content {
  margin-top: -10px;
}

.md-button {
  font-weight: bold;
  text-transform: none !important;
}
.half-width {
  max-width: 50%;
  margin-bottom: -15px;
}
.quarter-width {
  max-width: 25%;
}
</style>
<style>
.md-field.md-focused .md-input,
.md-field.md-focused .md-textarea,
.md-field.md-has-value .md-input,
.md-field.md-has-value .md-textarea,
.md-list-item-container {
  font-size: 14px !important;
}
</style>
