// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'

/* eslint-disable no-new */
import router from './router'
import store from './store'
import './axios'
Vue.config.productionTip = false
require('@/store/subscriber')

window.$ = window.jQuery = require('jquery');
import 'bootstrap/dist/js/bootstrap'
store.dispatch('auth/checkAuth', localStorage.getItem('token')).then(() => {
  //
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
})
/* eslint-disable no-new */
