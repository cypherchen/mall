export default {
  // 添加购物车
  addCart(context, payload) {
    // 返回一个promise对象，，在添加到购物车的操作执行后，再弹出提示框
    return new Promise((resolve,reject)=> {
      // 1.查找cartList中是否已存在该商品
      // find在回调函数为true时，返回该匹配到的数组元素，indexOf返回的是匹配到的索引值
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);

      // 2.判断oldProduct
      if (oldProduct){
        context.commit('increaseCount',oldProduct); // 如果商品存在，则提交给increaseCount
        resolve('商品数量加一')
      }else {
        payload.count = 1; // 如果不存在，给新商品添加一个数量属性count
        payload.checked = true; // 商品添加购物车默认是选中
        context.commit('addNewProduct',payload); // 提交给addNewProduct
        resolve('已添加到购物车')
      }
    })
  }
}
