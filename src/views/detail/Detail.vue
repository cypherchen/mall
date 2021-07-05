<template>
   <div id="detail">
     <detail-nav-bar
       class="detail-nav-bar"
       @titleClick="titleClick"
       ref="nav" />
     <scroll class="content"
             ref="scroll"
             :probe-type="3"
             @scroll="contentScroll">
       <detail-swiper :top-images="topImages"/>
       <detail-base-info :goods="goods"/>
       <detail-shop-info :shop="shop"/>
       <detail-goods-info
         :detail-info="detailInfo"
         @detailInfoImgLoad="detailInfoImgLoad"/>
       <detail-param-info ref="params" :param-info="paramInfo"/>
       <detail-comment-info ref="comment" :comment-info="commentInfo"/>
       <goods-list ref="recommend" :goods="recommends"/>
     </scroll>
     <back-top @click.native="backClick" v-show="isShowBackTop"/>
     <detail-bottom-bar @addToCart="addToCart"/>
   </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import {getDetail,getRecommend,Goods,Shop,GoodsParam} from "network/detail";
import {debounce} from "common/utils";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Scroll,
    BackTop
  },
  data() {
    return {
      iid: null, // 商品iid
      topImages: [], // 商品图片
      goods: {}, // 商品信息数据
      shop: {}, // 店铺信息数据
      detailInfo: {}, // 商品详情数据
      paramInfo: {}, // 商品参数
      commentInfo: {}, // 评论信息
      recommends: [], // 商品推荐数据
      themeTopYs: [], // 导航栏标签对应组件坐标值
      currentIndex: 0, // 当前的导航栏索引值
      isShowBackTop: false // 默认不显示返回顶部按钮
    }
  },
  created() {
    // 1.保存当前商品的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid来获取商品详细数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      // 01.获取商品图片
      this.topImages = data.itemInfo.topImages;
      // 02.获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
      // 03.获取店铺信息
      this.shop = new Shop(data.shopInfo);
      // 04.获取商品详情数据
      this.detailInfo = data.detailInfo;
      // 05.获取商品参数
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);
      // 06.获取评论信息
      if (data.rate.cRate !== 0 ){ // 如果评论数量不为0
        this.commentInfo = data.rate.list[0];
      }
    });

    // 3.请求推荐商品的数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  mounted() {
    // 推荐商品的图片加载完后刷新滚动区域高度
    const newRefresh = debounce(this.$refs.scroll.refresh,100); // 将refresh函数进行防抖动处理
    this.$bus.$on('detailItemImageLoad',() => {// 监听GoodsListItem里面的图片加载完成
      newRefresh(); // 图片加载完成后重新刷新滚动区域高度
    });
  },
  methods:{
    // 详情图片全部加载完执行
    detailInfoImgLoad() {
      // 1.刷新滚动区域高度
      this.$refs.scroll.refresh();

      // 2.计算子组件的offsetTop
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // 添加大数用来判断当前页面位置时，充当最后一个区间的结尾
      this.themeTopYs.push(Number.MAX_VALUE);
    },

    // 点击导航栏标签，滚动到对应得区域
    titleClick(index) {
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],500); // offsetTop获取到的是正数，这里需要的是负数
    },

    // 监听页面滚动位置
    contentScroll(position) {
      // 1.根据位置切换导航栏标签
      const positionY = -position.y; // 将当前的滚动坐标值转为正数与offsetTop比较
      // 由于多了一个MAX_VALUE只是用来当最后一个区间终点，所以循环-1
      for (let i = 0;i<this.themeTopYs.length-1;i++) {
        // 如果currentIndex与i相等，则表明在这个区间内，就不需要重新赋值currentIndex
        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
          this.currentIndex = i; // 将当前i保存在currentIndex
          this.$refs.nav.currentIdenx = this.currentIndex; // 给导航栏组件的currentIndex赋值
        }
      }
      // 2.如果滚到1000这个位置，则显示返回顶部按钮
      this.isShowBackTop = positionY > 1000;
    },
    // 点击返回顶部
    backClick() {
      this.$refs.scroll.scrollTo(0,0);
    },
    // 添加到购物车
    addToCart() {
      // 1.获取购物车需要的信息
      const product = {};
      product.iid= this.iid;
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.detailInfo.desc;
      product.price = this.goods.realPrice;

      // 2.将商品添加到购物车
      this.$store.dispatch('addCart',product); // 给store的addCart提交数据进行处理

    }
  }
}
</script>

<style scoped>
 #detail {
   position: relative;
   background-color: #fff;
   z-index: 100;
   height: 100vh;
 }

 .detail-nav-bar {
   position: relative;
   z-index: 100;
   background: #fff;
 }

 .content {
  /*滚动区域的高度*/
  height: calc(100% - 44px - 49px);
 }
</style>
