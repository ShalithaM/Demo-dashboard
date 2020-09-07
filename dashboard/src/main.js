import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'

import App from './App.vue'
//Router 
import router from './router'
//Store
import store from './store'

// import bootstrap css files
import "./assets/style.scss";

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false

new Vue({
  router,
  BootstrapVue,
  store,
  render: h => h(App),
}).$mount('#app')
