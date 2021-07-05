import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

Vue.config.productionTip = false

// 给vue的原型添加一个$bus属性，可以全局调用，当作事件总线，
// 用来在Home和GoodsListItem，Detail和GoodsListItem之间的事件发送监听当作桥梁
Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
