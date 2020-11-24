<template>
  <div>
    <div class="md-layout md-gutter">
      <div style="display:inline-block; font-size: 1.5em; margin-left: 1.0em; margin-top: 1.0em;">
      Players
      </div>
    </div>

    <md-table v-model="playersList" md-card md-sort="Name" md-sort-order="asc">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name" class="left" md-sort-by="Name">{{ item.Name }}</md-table-cell>
        <md-table-cell md-label="Gender">{{ item.Gender }}</md-table-cell>
        <md-table-cell md-label="Handed">{{ item.Handed }}</md-table-cell>
        <md-table-cell md-label="Date of birth" md-sort-by="Dob">{{ item.Dob.substring(8,10) }}/{{ item.Dob.substring(5,7) }}/{{item.Dob.substring(0,4) }}</md-table-cell>
        <md-table-cell md-label="Country" :title="item.Country.Name"><img :src="item.Country.ImageLink"></md-table-cell>
        <md-table-cell md-label="Home town" class="left">{{ item.HomeTown }}</md-table-cell>
<!--        
        <md-table-cell md-label="Height">{{ item.HeightFeet }}' {{ item.HeightInches}} "</md-table-cell>
        <md-table-cell md-label="Weight">{{ item.Weight }} lbs</md-table-cell>
-->        
        <md-table-cell md-label="Actions" class="left">
          <a href="#" @click="openPlayerEditDialog(item.Id); $event.preventDefault();">Edit Player</a>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <player-edit-dialog v-model="playerEditDialogOpen" :playerId="playerId"></player-edit-dialog>

  </div>
</template>

<script>
import DataMixin from "../mixins/data-mixin";
import PlayerEditDialog from "./PlayerEditDialog";

export default {
  name: 'PlayerList',
  components: {
    PlayerEditDialog
  },
  props: {
    msg: String
  },
  mixins: [DataMixin],
  data() {
    return {
      playerEditDialogOpen: false,
      playerId: 0,
    }
  },
  methods: {
    refreshList() {
      this.getPlayersList();
    },
    openPlayerEditDialog(playerId) {
      console.log("playerId=" + playerId);
      this.playerId = playerId;
      this.playerEditDialogOpen = false; // needed as need to trigger a change and sometimes value left at true
      this.playerEditDialogOpen = true;
    }

  },

  beforeMount() {
    this.getPlayersList();
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
<style>
.md-table-cell.left .md-table-cell-container {
  text-align: left !important;
}
</style>