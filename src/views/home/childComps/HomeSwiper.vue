<template>
 <div>
   <!--轮播图-->
   <swiper>
     <!--使用v-for循环遍历响应数据里的图片-->
     <swiper-item v-for="(item,index) in banners" :key="index">
       <!--给图片设置超链接-->
       <a :href="item.link">
         <img :src="item.image" alt="" @load="imageLoad">
       </a>
     </swiper-item>
   </swiper>
 </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index';
export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isLoad: false // 第一张轮播图是否加载完成的标志
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    // 轮播图加载完给Home发送自定义事件
    imageLoad() {
      // 只需要第一张轮播图加载完发送事件即可
      if (!this.isLoad){
        this.$emit('swiperImageLoad');
        this.isLoad = true; // 修改标志
      }
    }
  }
}
</script>

<style scoped>

</style>
