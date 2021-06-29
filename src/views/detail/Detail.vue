<template>
   <div id="detail">
     <detail-nav-bar/>
     <detail-swiper :top-images="topImages"/>
   </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";

import {getDetail} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper
  },
  data() {
    return {
      iid: null,
      topImages: []
    }
  },
  created() {
    // 1.保存当前商品的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid来获取数据
    getDetail(this.iid).then(res => {
      this.topImages = res.result.itemInfo.topImages;
    });
  }
}
</script>

<style scoped>

</style>
