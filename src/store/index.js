import Vue from "vue";
import Vuex from "vuex";

import mutations from "./mutations";
import actions from "./actions";

// 1.安装插件
Vue.use(Vuex);

// 2.创建store对象

const state = {
  cartList: [], // 购物车的商品列表
};

const store = new Vuex.Store({
  state,
  // mutation里放简单的同步操作
  mutations,
  // actions里放异步操作或者复杂操作(逻辑判断等)
  actions,

})

// 3.导出store对象
export default store;
