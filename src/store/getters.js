export default {
  // 计算购物车商品种类数量
  cartLength(state) {
    return state.cartList.length;
  },
  // 取出购物车中的商品
  cartList(state) {
    return state.cartList;
  }
}
