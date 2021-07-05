<template>
  <!--如果goods的内容不为空则显示-->
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <!--商品标题-->
    <div class="info-title">{{goods.title}}</div>
    <!--商品价格-->
    <div class="info-price">
      <span>{{goods.newPrice}}</span>
      <span>{{goods.oldPrice}}</span>
      <span v-if="goods.discount" >{{goods.discount}}</span>
    </div>
    <!--销量收藏信息-->
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <!--快递信息-->
    <div class="info-services">
      <!--v-for遍历数字时，从1开始，这里需要遍历services里的内容-->
      <span class="info-services-item" v-for="index in goods.services.length-1"
            :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    // 商品信息
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>

  .base-info {
    padding: 10px;
    border-bottom: 5px solid #eee;
  }

  .info-title {
    font-size: 16px;
    font-weight: bold;
  }

  .info-price {
    margin: 15px 0;
  }

  .info-price span:first-child  {
    font-size: 25px;
    color: var(--color-high-text);
  }

  .info-price span:nth-child(2) {
    font-size: 13px;
    color: #aaa;
    text-decoration: line-through;
    padding: 0 5px;
  }

  .info-price span:nth-child(3) {
    font-size: 13px;
    color: white;
    background-color: var(--color-tint);
    padding: 2px 5px;
    border-radius: 10px;
    vertical-align: top;
  }

  .info-other {
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    font-weight: lighter;
    padding-bottom: 10px;
  }

  .info-services {
    height: 60px;
    line-height: 60px;
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 -1px 1px rgba(100,100,100,0.1);
  }

  .info-services-item img {
    width: 12px;
    height: 12px;
  }
</style>
