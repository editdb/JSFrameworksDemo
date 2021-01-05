<template>
  <div id="app">
    <vue-toastr ref="toast"></vue-toastr>
    <md-toolbar style="margin-top: 0px;">
      <md-button class="md-icon-button">
        <md-icon>more_vert</md-icon>
      </md-button>
      <h2 class="md-title" style="flex: 1">Tennis Players (Vue.js to C# WebApi REST endpoint to Postgres)</h2>
      <router-link to = "/rankingList" class="router-link">Rankings</router-link>
      <router-link to = "/playerList" class="router-link">Players</router-link>
    </md-toolbar>

    <!-- img alt="Vue logo" src="./assets/logo.png" -->
    <!-- RankingList msg="Welcome to Your Vue.js App"/ -->
    <router-view></router-view>
  </div>
</template>

<script>
//import RankingList from './components/RankingList.vue'
import VueToastr from "vue-toastr";

export default {
  name: 'App',
  components: {
    //RankingList,
    "vue-toastr": VueToastr
  },

  mounted() {
  }


}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  margin-left: 10px;
  margin-right: 10px;
} 
@media screen and (min-width: 700px) {
   #app { 
      margin-left: 10%;
      margin-right: 10%;
   } 
}

.router-link {
  padding-left: 2.0em;
}
.md-toolbar {
  background-color: rgba(68, 138, 255, 0.8) !important;
}
.md-toolbar a,h2,i {
  color: white !important;
}
</style>
