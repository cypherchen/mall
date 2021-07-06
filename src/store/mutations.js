export default {
  // 已在购物车的商品数量加一
  addCounter(state, payload) {
    payload.count ++;
  },
  // 购物车添加新商品
  addNewProduct(state, payload) {
    state.cartList.push(payload);
  },
  // 选中或取消某一商品
  checkProduct(state,payload) {
    state.cartList.forEach(item => {
      if (item.iid === payload){
        item.checked = !item.checked;
      }
    });
  },
  // 商品全选
  checkAll(state) {
    state.cartList.forEach(item => item.checked = true)
  },
  // 商品全不选
  cancelAll(state) {
    state.cartList.forEach(item => item.checked = false)
  },
  // 商品数量加一
  increaseCount(state,payload) {
    state.cartList.forEach(item => {
      if (item.iid === payload){
        item.count ++;
      }
    });
  },
  // 商品数量减一
  decreaseCount(state,payload) {
    state.cartList.forEach(item => {
      if (item.iid === payload){
        item.count --;
      }
    });
  },
  // 删除商品
  deleteProduct(state,payload) {
    state.cartList.forEach((item,index) => {
      if (item.count === 0 || item.iid === payload){
        state.cartList.splice(index,1);
      }
    });
  }
}
