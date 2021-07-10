import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import toast from 'components/common/toast'
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false

// 给vue的原型添加一个$bus属性，可以全局调用，当作事件总线，
// 用来在Home和GoodsListItem，Detail和GoodsListItem之间的事件发送监听当作桥梁
Vue.prototype.$bus = new Vue();

// 安装自定义的toast插件
Vue.use(toast);

// 使用懒加载插件
Vue.use(VueLazyload,{
  loading: require('assets/img/common/placeholder.png') // 预加载图片
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
