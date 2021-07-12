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
      <div @click="collectGoods">
          <p v-if="!isCollected" class="icon not-collected"></p>
          <p v-else class="icon collected"></p>
          <span>{{collectText}}</span>
      </div>
    </div>
    <div class="bottom-right">
      <div class="frame">
        <div class="cart" @click="addToCart">加入购物车</div>
        <div class="buy">立即购买</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  data() {
    return {
      isCollected: false // 商品的收藏状态标识
    }
  },
  computed: {
    // 根据收藏状态显示不同的文字
    collectText() {
      if (this.isCollected) return '已收藏';
      return '收藏';
    }
  },
  methods: {
    // 添加到购物车
    addToCart() {
      this.$emit('addToCart');
    },
    // 收藏商品
    collectGoods() {
      // 根据商品的收藏状态弹出不同的提示框
      if (!this.isCollected){
        this.$toast.show('商品已收藏');
      }else {
        this.$toast.show('商品取消收藏')
      }
      this.isCollected = !this.isCollected; // 改变商品的收藏状态标识
    }
  }
}
</script>

<style scoped>

  .bottom-bar {
    height: 49px;
    width: 100%;
    background-color: #fff;
    display: flex;
    position: fixed;
    bottom: 0;
  }

  .bottom-left {
    width: 40%;
    display: flex;
  }

  .bottom-left div {
    width: 20px;
    font-size: 11px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    flex-grow: 1;
  }

  .bottom-right {
    width: 60%;
    padding-right: 5px;
  }

  .frame {
    width: 100%;
    height: 35px;
    line-height: 36px;
    font-size: 13px;
    display: flex;
    text-align: center;
    border-radius: 18px;
    overflow: hidden;
    margin: 7px 0;
    color: white;
  }

  .cart {
    width: 50%;
    background-color: #cbcb0b;
  }

  .buy {
    width: 50%;
    background-color: #de4646;
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

  .not-collected {
    background: url("~@/assets/img/detail/detail_bottom.png") 0 0 /100%;
  }
  .collected {
    background: url("~@/assets/img/detail/detail_bottom.png") 0 -27px /100%;
  }
</style>
