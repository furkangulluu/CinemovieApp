//Packages
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import axios from 'axios'
//Modules
import Route from './routes/route'
import Store from './stores/store'

Vue.use(VueRouter);
Vue.use(Vuex);

axios.defaults.baseURL = "https://ticketapp-vue.firebaseio.com"

const router= new VueRouter(Route)
const store = new Vuex.Store(Store);

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
