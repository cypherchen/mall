<template>
  <div class="cart-list">
    <div v-if="cartList.length !== 0">
      <cart-list-item
        v-for="(item,index) in cartList"
        :product="item"
        :key="index"/>
    </div>
    <div v-else class="empty-cart">
      <div class="hint">购物车是空的~</div>
      <div class="shopping" @click="goShopping">去逛逛</div>
    </div>
  </div>
</template>

<script>
import CartListItem from "./CartListItem";

import {mapGetters} from "vuex";

export default {
  name: "CartList",
  components: {
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  methods: {
    // 购物车为空时候，点击返回首页
    goShopping() {
      this.$router.replace('/home')
    }
  }
}
</script>

<style scoped>
  .empty-cart {

  }

  .hint{
    font-size: 18px;
    padding: 20px;
    text-align: center;
  }

  .shopping {
    font-size: 16px;
    margin: 0 auto;
    padding: 10px;
    width: 100px;
    background-color: #eee;
    text-align: center;
    border: 1px solid #aaa;
    border-radius: 20px;
  }
</style>
