<template>
  <md-dialog :md-active.sync="value" :md-close-on-esc="false" :md-click-outside-to-close="false"
    @md-opened="open">
    <div>
      <div style="display:inline-block; font-size: 1.5em; margin-top: 0.5em;">
      Edit Player
      </div>
      <span style="float:right;">
        <md-button class="md-raised" @click="update()">Update</md-button>
        <md-button class="md-raised md-accent" @click="close()">Cancel</md-button>
      </span>
    </div>

    <div class="md-layout md-gutter">
      <div class="md-layout-item half-width">
        <md-field>
          <label>Name</label>
          <md-input placeholder="Name" v-model="player.Name" required md-dense />
        </md-field>
      </div>  

      <div class="md-layout-item half-width">  
        <md-field>
          <label>Country</label>
          <md-select placeholder="Country" v-model="player.CountryId" required md-dense >
            <md-option v-for="item in countries" :key="item.Id" :value="item.Id">{{item.Name}}</md-option>
          </md-select>
        </md-field>
      </div>
    </div>

    <div class="md-layout md-gutter">
      <div class="md-layout-item half-width">
        <md-field>
           <label>Handed</label>
           <md-select placeholder="Handed" v-model="player.Handed">
                <md-option></md-option>
                <md-option value="L">Left</md-option>
                <md-option value="R">Right</md-option>
            </md-select>
        </md-field>
      </div>

      <div class="md-layout-item half-width">
        <md-field>
          <label>Home town</label>
          <md-input placeholder="Home town" v-model="player.HomeTown" md-dense />
        </md-field>
      </div>  
    </div>

    <div class="md-layout md-gutter">
      <div class="md-layout-item half-width">
        <md-datepicker v-model="player.DobDMY" md-immediately md-dense>
        <label>Date of birth</label>
          </md-datepicker>
      </div>  

      <div class="md-layout-item half-width">
        <md-field>
           <label>Gender</label>
           <md-select placeholder="Gender" v-model="player.Gender" required>
                <md-option></md-option>
                <md-option value="F">Female</md-option>
                <md-option value="M">Male</md-option>
            </md-select>
        </md-field>
      </div>
    </div>

    <div class="md-layout md-gutter">
      <div class="md-layout-item quarter-width">
        <md-field>
          <label>Height feet</label>
          <md-input placeholder="Height feet" v-model="player.HeightFeet" type="number" min="4" max="8" size="5" md-dense />
        </md-field>
      </div>  

      <div class="md-layout-item quarter-width">
        <md-field>
          <label>inches</label>
          <md-input placeholder="inches" v-model="player.HeightInches" type="number" min="0" max="11" size="5" md-dense />
        </md-field>
      </div>  

      <div class="md-layout-item quarter-width">
        <md-field>
          <label>Weight lbs</label>
          <md-input placeholder="Weight lbs" v-model="player.Weight" type="number" size="5" md-dense />
        </md-field>
      </div>  

      <div class="md-layout-item quarter-width">  
        <md-field>
          <label>Turned pro</label>
          <md-select placeholder="Turned pro" v-model="player.TurnedPro" required md-dense >
            <md-option v-for="item in turnedProYears" :key="item" :value="item">{{item}}</md-option>
          </md-select>
        </md-field>
      </div>

    </div>

    <img v-if="player.Photo != null" :src="'data:image/jpeg;base64,' + player.Photo" 
       width="300"/>

  </md-dialog>
</template>

<script>
import DataMixin from "../mixins/data-mixin";

export default {
  name: 'PlayerEditDialog',
  components: {
  },
  props: {
      value: {
        required: true
      },
      playerId: {
        required: true
      }
  },
  mixins: [DataMixin],
  data() {
    return {
      player: {
        Name: "Bert Ford",
        CountryId: 2
      }
    }
  },
  methods: {
    close() {
      console.log("close()");
      this.$emit("input", !this.value);
    },
    update() {
      console.log("update()");
      this.updatePlayer(this.playerId, this.player).then(
        res => {
          //this.toastr.info("Record updated");
          res;
          this.$toastr.s("Record updated");
          this.$parent.refreshRankingsList();
          this.$emit("input", !this.value);
        },
        err => {
          this.$toastr.e(err.response.data);
        }
      )
    },
    open() {
      console.log("open(), playerId=" + this.playerId);
      this.getPlayer(this.playerId);
    }
      
  },

  beforeMount() {
    this.getCountries();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* fix for md-dialog appearing off-centre */
.md-dialog /deep/ .md-dialog-container {
  transform: none;
  width: 500px;
  height: 550px;
  padding-top: 23px;
  padding-left: 20px;
  padding-right: 20px;
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
