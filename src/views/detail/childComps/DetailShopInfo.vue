<template>
  <!--店铺信息顶部区域-->
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" alt="">
      <span>{{shop.name}}</span>
    </div>
    <!--店铺信息中间区域-->
    <div class="shop-middle">
      <!--店铺总销量换算为以万为单位-->
      <div class="goods-sells">
        <div class="sells-count">{{sellCountFilter}}</div>
        <div class="sells-text">总销量</div>
      </div>
      <!--店铺商品数量-->
      <div class="info-goods">
        <div class="goods-count">{{shop.goodsCount}}</div>
        <div class="goods-text">全部宝贝</div>
      </div>
      <!--店铺评分-->
      <div class="shop-score">
        <table>
          <tr v-for="(item,index) in shop.score" :key="index">
            <td class="">{{item.name}}</td>
            <td class="score" :style="item.isBetter&&{color:'red'}">{{item.score}}</td>
            <td class="level" :style="item.isBetter&&{background:'red'}">{{item.isBetter?'高':'低'}}</td>
          </tr>
        </table>
      </div>
    </div>
    <!--店铺信息底部区域-->
    <div class="shop-bottom">
      <div>进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    // 店铺信息
    shop: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    // 店铺总销量换算成以万计数
    sellCountFilter() {
      if (this.shop.sells < 10000) return this.shop.sells;
      return (this.shop.sells/10000).toFixed(1) + '万';
    }
  }
}
</script>

<style scoped>

 .shop-top {
   display: flex;
   align-items: center;
   padding: 10px;
 }

 .shop-top img{
   width: 60px;
   height: 60px;
   border-radius: 50%;
   margin-right: 10px;
 }
  .shop-middle {
    display: flex;
    justify-content: space-around;
    align-items: center;
    line-height: 1.5;
    text-align: center;
  }

  .info-goods {
    border-right: 1px solid #ccc;
    padding-right: 10px;
  }

  .shop-score {
    font-size: 12px;
  }

  .shop-score .score {
    color: green;
  }

  .shop-score .level {
    padding: 0px 3px;
    color: white;
    background: green;
  }

 .shop-bottom {
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 20px;
   border-bottom: 5px solid #eee;
 }

 .shop-bottom div {
   font-size: 16px;
   padding: 5px 40px;
   background-color: rgba(100,100,100,.2);
   border-radius: 20px;
 }
</style>
