export default {
  // 已在购物车的商品数量加一
  addCounter(state, payload) {
    payload.count ++;
  },
  // 购物车添加新商品
  addNewProduct(state, payload) {
    state.cartList.push(payload);
  }
}
