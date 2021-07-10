export default {
  // 购物车添加新商品
  addNewProduct(state, payload) {
    state.cartList.push(payload);
  },
  // 商品数量加一
  increaseCount(state, payload) {
    payload.count ++;
  },
  // 商品数量减一
  decreaseCount(state,payload) {
    payload.count --;
  },
  // 删除商品
  deleteProduct(state,payload) {
    state.cartList.forEach((item,index) => {
      if (item.iid === payload){
        state.cartList.splice(index,1);
      }
    });
  },
  // 选中或取消某一商品
  checkProduct(state, payload) {
    payload.checked = !payload.checked;
  },
  // 商品全选
  checkAll(state) {
    state.cartList.forEach(item => item.checked = true);
  },
  // 商品全不选
  cancelAll(state) {
    state.cartList.forEach(item => item.checked = false);
  }
}
