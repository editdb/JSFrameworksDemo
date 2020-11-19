import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import VueToastr from "vue-toastr";


Vue.use(VueMaterial);
Vue.material.locale.dateFormat = 'dd/MM/yyyy';

Vue.use(VueToastr, {
  /* OverWrite Plugin Options if you need */
});

new Vue({
  render: h => h(App),
}).$mount('#app')
