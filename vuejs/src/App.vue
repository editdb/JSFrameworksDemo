<template>
  <div id="app">
    <vue-toastr ref="toast"></vue-toastr>
    <!-- img alt="Vue logo" src="./assets/logo.png" -->
    <PlayerList msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import PlayerList from './components/PlayerList.vue'
import VueToastr from "vue-toastr";

export default {
  name: 'App',
  components: {
    PlayerList,
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
  margin-top: 60px;
  margin-left: 120px;
  margin-right: 120px;
}
</style>
