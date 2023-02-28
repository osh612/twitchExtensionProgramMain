import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import './api/socket/socket'
import ToggleButton from 'vue-js-toggle-button'
import 'swiper/css/swiper.css'
import VueClipboard from 'vue-clipboard2'
import VueToastify from 'vue-toastify'

Vue.use(VueToastify, {
  my: 'settings',
  iconEnabled: false,
})
Vue.use(VueClipboard)
Vue.use(ToggleButton)

Vue.config.productionTip = true

new Vue({
  store,
  router: router,
  render: h => h(App),
}).$mount('#app')
