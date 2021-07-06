<template>
  <div id="cart">
    <!--顶部导航栏-->
    <nav-bar class="nav-bar">
      <template #center>
        <div>购物车({{cartLength}})</div>
      </template>
    </nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3">
      <!--商品列表-->
      <cart-list/>
    </scroll>
    <!--底部汇总-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    Scroll,
    CartList,
    CartBottomBar
  },
  computed: {
    // mapGetters是将store中的getters映射到vue实例中的computed中，可以直接调用
    ...mapGetters(['cartLength'])
  },
  activated() {
    // 路由激活状态就刷新滚动内容高度
    this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

  .content {
    height: calc(100vh - 44px - 49px - 35px);
    overflow: hidden;
  }
</style>
