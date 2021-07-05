<template>
  <div class="bottom-bar">
    <div class="bottom-left">
      <div>
        <p class="icon service"></p>
        <span>客服</span>
      </div>
      <div>
        <p  class="icon shop"></p>
        <span>店铺</span>
      </div>
      <div>
        <p  class="icon collect"></p>
        <span>收藏</span>
      </div>
    </div>
    <div class="bottom-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    // 添加到购物车
    addToCart() {
      this.$emit('addToCart');
    }
  }
}
</script>

<style scoped>

  .bottom-bar {
    height: 49px;
    width: 100%;
    display: flex;
    background-color: pink;
    position: fixed;
    bottom: 0;
  }

  .bottom-left,.bottom-right {
    width: 50%;
    display: flex;
  }

  .bottom-left div {
    background-color: #fff;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    flex-grow: 1;
  }

  .bottom-right div {
    height: 49px;
    flex-grow: 1;
    text-align: center;
  }

  .bottom-right div {
    width: 50%;
    line-height: 49px;
  }

  .cart {
    background-color: yellow;
  }

  .buy {
    color: white;
    background-color: var(--color-tint);
  }

  .icon {
    display: block;
    width: 22px;
    height: 22px;

  }

  /*精灵图分割出几个小icon
    background的url后面跟着的是左上角的便宜坐标，/后面跟着的是图片的尺寸
  */

  .service{
    background: url("~@/assets/img/detail/detail_bottom.png") 0 -52px /100%;
  }

  .shop {
    background: url("~@/assets/img/detail/detail_bottom.png") 0 -248px /100%;
  }

  .collect {
    background: url("~@/assets/img/detail/detail_bottom.png") 0 0 /100%;
  }
</style>
