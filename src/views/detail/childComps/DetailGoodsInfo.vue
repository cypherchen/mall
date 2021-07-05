<template>
  <!--如果商品详情数据存在则显示-->
  <div class="detail-info" v-if="Object.keys(detailInfo).length !== 0">
    <!--商品描述-->
    <div class="info-desc">{{detailInfo.desc}}</div>
    <!--穿着效果文字-->
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <!--商品详情图片-->
    <div class="info-list">
      <img v-for="(item,idnex) in detailInfo.detailImage[0].list"
           :key="idnex"
           :src="item"
           alt="detail-img"
           @load="detailInfoImgLoad"/> <!--在图片加载完成后调用函数-->
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  data() {
    return {
      imgLength: 0 // 图片数量
    }
  },
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    // 每加载一张图片调用一次
    detailInfoImgLoad() {
      this.imgLength ++ ;
      // 当图片加载数量等于数据里图片数量，则发送事件给Detail组件处理
      if (this.imgLength === this.detailInfo.detailImage[0].list.length){
        this.$emit('detailInfoImgLoad');
      }
    }
  }
}
</script>

<style scoped>
  .detail-info {
    padding: 20px 8px;
    border-bottom: 5px solid #eee;
    font-size: 14px;
  }

  .info-desc {
    padding: 8px;
    text-indent: 2em;
    line-height: 1.5rem;
  }

  .info-key {
    padding: 8px;
  }

 .info-list img {
   width: 100%;
 }
</style>
