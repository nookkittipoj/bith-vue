import Vue from 'vue'
import App from './App.vue'
import vuetify from "./plugins/vuetify";
import router from './router'
import store from './store'
import './assets/styles/bith-theme.scss'
import * as moment from "moment";
import Lightbox from 'vue-easy-lightbox'
Vue.config.productionTip = false
Vue.prototype.$moment = moment;
Vue.use(Lightbox)
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
