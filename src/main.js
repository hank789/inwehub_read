// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Button, Row, Col } from 'element-ui'
import App from './App'
import store from './store'
import router from './router'
import VueAnalytics from 'vue-ua'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(VueAnalytics, {
  appName: 'inwehub', // Mandatory
  appVersion: 'V1', // Mandatory
  trackingId: 'UA-97476315-1', // Mandatory
  debug: true, // Whether or not display console logs debugs (optional)
  vueRouter: router // Pass the router instance to automatically sync with router (optional)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
