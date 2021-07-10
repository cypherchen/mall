<template>
  <div class="bottom-bar">
    <div class="left" @click="checkClick">
      <check-button class="check-button" :is-checked="syncCheck"/>
      <span>全选</span>
    </div>
    <div class="center">合计：￥{{ totalPrice }}</div>
    <div class="right" @click="settle">结算({{totalCount}})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    // 计算总价
    totalPrice() {
      return this.$store.state.cartList
        .filter(item => item.checked) // 把选中的商品过滤出来
        .reduce((preVal,item) => {
          return preVal + item.price * item.count; // 计算总价
        },0).toFixed(2)
    },
    // 计算商品数量
    totalCount() {
      return this.$store.state.cartList
        .filter(item => item.checked)
        .reduce((preVal,item) => {
          return preVal + item.count
        },0)
    },
    // 同步商品选中和全选按钮
    syncCheck() {
      if (this.$store.state.cartList.length === 0) return false; // 如果购物车没商品，直接返回false
      return this.$store.state.cartList.every(item => item.checked); // every，some返回的是Boolean值
    }
  },
  methods: {
    // 全选或取消事件
    checkClick() {
      if (this.syncCheck){
        this.$store.commit('cancelAll'); // 如果是全选状态，则点击后发生取消事件
      }else {
        this.$store.commit('checkAll'); // 如果是取消状态，则点击后发送全选事件
      }
    },
    // 结算按钮
    settle() {
      // 没有选择商品时，会弹出toast提示框
      if(!this.totalCount) {
        // 使用toast插件的show函数，显示提示框
        this.$toast.show('请选择购买的商品');
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    font-size: 16px;
    width: 100%;
    height: 35px;
    line-height: 35px;
    position: fixed;
    bottom: 49px;
    display: flex;
    justify-content: space-between;
  }

  .left {
    display: flex;
    padding-left: 10px;
  }

  .check-button {
    margin-top: 2px;
  }

  .right {
    width: 100px;
    color: #fff;
    background-color: red;
    text-align: center;
  }
</style>
