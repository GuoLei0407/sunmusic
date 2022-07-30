import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入Element-ui
import ElementUI from 'element-ui'
// 导入 Element-ui 样式
import 'element-ui/lib/theme-chalk/index.css'
// 导入初始化样式
import './assets/css/base.css'
// 导入icon
import './assets/icon/stylus/style.css'
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
