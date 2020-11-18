<template>
  <md-dialog :md-active.sync="value" :md-close-on-esc="false" :md-click-outside-to-close="false"
    @md-opened="open">
    <div>
      <div style="display:inline-block; font-size: 2em; margin-top: 0.5em;">
      Edit Player
      </div>
      <span style="float:right;">
        <md-button class="md-raised md-accent">Update</md-button>
        <md-button class="md-raised" @click="close()">Close</md-button>
      </span>
    </div>

    <div class="md-layout md-gutter">
      <div class="md-layout-item smaller-width">
        <md-field>
          <md-input placeholder="Name" v-model="player.Name" required md-dense />
        </md-field>
      </div>  
      <div class="md-layout-item smaller-width">  
        <md-field>
          <md-select placeholder="Country" v-model="player.CountryId" required md-dense >
            <md-option v-for="item in countries" :key="item.Id" :value="item.Id">{{item.Name}}</md-option>
          </md-select>
        </md-field>
      </div>
    </div>



  </md-dialog>
</template>

<script>
import DataMixin from "../mixins/data-mixin";

export default {
  name: 'PlayerEditDialog',
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
    open() {
      console.log("open(), playerId=" + this.playerId);
      this.getPlayer(this.playerId);
    }            
  },

  beforeMount() {
    this.getCountries();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* fix for md-dialog appearing off-centre */
.md-dialog /deep/ .md-dialog-container {
  transform: none;
  min-width: 600px;
  padding-left: 20px;
  padding-right: 20px;
}

.md-button {
  font-weight: bold;
}
</style>
