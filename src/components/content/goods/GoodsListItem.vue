<template>
  <div class="goods-item" @click="itemClick">
    <!--@load是在该标签加载完成后会调用-->
    <img :src="showImage" alt="" @load="imageLoad">
    <div>
      <p>{{goodsItem.title}}</p>
      <span class="price">{{"￥"+goodsItem.price}}</span>
      <span class="collect">{{'☆'+goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type:Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    // 针对首页和详情页的商品数据结构不一样做一个判断
    showImage() {
      //第一个是详情页推荐商品数据中图片的位置，第二个是首页商品列表数据中心图片的位置
      return this.goodsItem.image || this.goodsItem.show.img  ;
    }
  },
  methods: {
    // 图片加载完后给事件总线发送自定义事件，在Home和Detail里调用
    imageLoad() {
      // 根据路由路径的不同发送不同的事件
      if (this.$route.path.indexOf('/home') !== -1) {
        this.$bus.$emit('homeItemImageLoad');
      }else if (this.$route.path.indexOf('/detail') !== -1){
        this.$bus.$emit('detailItemImageLoad');
      }
    },
    // 商品点击跳转到详情页
    itemClick() {
      this.$router.push('/detail/' + this.goodsItem.iid); // 这里使用push，为了可以返回，拼接一个商品唯一标识iid作为动态路由
    }
  }
}
</script>

<style scoped>
  .goods-item {
    width: 48%;
    flex-wrap: wrap;
    padding: 5px 0;
    font-size: 14px;
    text-align: center;
  }

  .goods-item img {
    padding: 5px 2px;
    width: 100%;
    border-radius: 10px;
  }

  /*设置商品描述的样式*/
  .goods-item p {
    white-space: nowrap; /*不换行*/
    overflow: hidden; /*超出隐藏*/
    text-overflow:ellipsis; /*超出文字用...代替*/
  }

  .goods-item .price {
    padding: 0 5px;
    color: pink;
  }

</style>
