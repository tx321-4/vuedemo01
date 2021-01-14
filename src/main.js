import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import TreeTable from 'vue-table-with-tree-grid'
import 'normalize.css'// A modern alternative to CSS resets
import '@/style/global.scss'
Vue.config.productionTip = false

Vue.use(Element)
Vue.component('tree-table', TreeTable)

const { mockXHR } = require('../mock')
mockXHR()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
