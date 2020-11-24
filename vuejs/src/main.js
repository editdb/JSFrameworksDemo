import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import VueToastr from "vue-toastr";
import VueRouter from "vue-router";

import RankingList from './components/RankingList.vue'
import PlayerList from './components/PlayerList.vue'

Vue.use(VueMaterial);
Vue.material.locale.dateFormat = 'dd/MM/yyyy';
Vue.use(VueRouter);

Vue.use(VueToastr, {
  /* OverWrite Plugin Options if you need */
});

const router = new VueRouter({
  mode: 'history',    // prevents # in url
  routes: [
    { path: '/rankingList', component: RankingList },
    { path: '/playerList', component: PlayerList },
    { path: '*', redirect: '/rankingList' }
 ]
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
