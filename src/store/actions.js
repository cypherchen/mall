export default {
  // 添加购物车
  addCart(context, payload) {
    // 1.查找cartList中是否已存在该商品
    // find在回调函数为true时，返回该匹配到的数组元素，indexOf返回的是匹配到的索引值
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid); // 如果传过来的iid和cartList里的某一个相同，则把这个商品赋值给oldProduct

    // 2.判断oldProduct
    if (oldProduct){
      context.commit('addCounter',oldProduct); // 如果商品存在，则提交给addCounter
    }else {
      payload.count = 1; // 如果不存在，给新商品添加一个数量属性count
      payload.checked = true; // 商品添加购物车默认是选中
      context.commit('addNewProduct',payload); // 提交给addNewProduct
    }
  }
}
