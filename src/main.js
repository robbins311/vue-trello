import Vue from 'vue'
import { store } from './store/index.js'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false
Vue.prototype.$store = store
library.add(faUserSecret)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')
