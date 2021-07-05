<template>
  <div id="home">
    <nav-bar class="home-nav">
      <!--主页导航条只需要中间插槽显示文字-->
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <!--解决TabControl吸顶问题重复放置的组件-->
    <!--当标识v-show为true时，说明TabControl到了吸顶位置，原TabControl组件继续上移，该组件则固定显示-->
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"/>
    <!--使用BScroll插件来优化移动端滚动不畅的问题，传入probeType的值为3，自定义scroll事件，在Home里处理坐标，打开上拉加载功能-->
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <!--抽离的轮播图组件，父组件给子组件传递轮播图需要的数据-->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <!--推荐组件-->
      <recommend-view :recommends="recommends"/>
      <!--本周流行组件-->
      <feature-view/>
      <!--控制栏组件-->
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/> <!--子组件控制栏点击后返回的数据穿给父组件处理-->
      <!--商品列表组件，给子组件传递对应类型的商品数据-->
      <goods-list :goods="showGoods"/>
    </scroll>
    <!--给返回顶部的小组件添加点击事件，native修饰符使得组件可以使用原生的监听事件-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl';
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import {getHomeMultidata,getHomeGoods} from "network/home";
import {debounce} from "common/utils";

export default {
  name: "Home",
  components: {
    HomeSwiper, // 轮播图
    RecommendView, // 推荐
    FeatureView, // 本周流行
    NavBar, // 导航条
    TabControl, // 控制栏
    GoodsList, // 商品列表
    Scroll, // 封装完的BScroll组件
    BackTop, // 返回顶部按钮
  },
  data() {
    return {
      // 保存响应的数据
      banners: [], // 轮播图数据
      recommends: [], // 推荐栏数据
      goods: { // 商品数据
        'pop': {page: 0,list: []},
        'new': {page: 0,list: []},
        'sell': {page: 0,list: []}
      },
      currentType: 'pop' ,// 当前显示商品的类别
      isShowBackTop: false, // 默认情况下返回顶部不显示
      tabOffsetTop: 0, // tabControl组件的offsetTop属性
      isTabFixed: false, // TabControl是否需要吸顶的标志
      saveY: 0, // 保存当前的页面位置
    }
  },
  // 在vue组件创建完毕后调用生命周期函数,这里面最好只用来调用封装好的函数
  // 函数的逻辑代码在methods里进行封装
  created() {
    // 1.获取轮播图和推荐数据
    this.getHomeMultidata();
    // 2.默认情况显示流行栏商品
    this.getHomeGoods('pop');
  },
  mounted() {
    // 1.图片加载完成后的监听事件
    const newRefresh = debounce(this.$refs.scroll.refresh,100); // 将refresh函数进行防抖动处理
    this.$bus.$on('homeItemImageLoad',() => {// 监听GoodsListItem里面的图片加载完成
      newRefresh(); // 图片加载完成后重新刷新滚动区域高度
    });
  },
  activated() {
    this.$refs.scroll.refresh(); // 返回首页时，刷新滚动区域高度
    this.$refs.scroll.scrollTo(0,this.saveY,0); // 回到离开页面前的位置
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY(); // 离开首页时，保存当前的页面位置
  },
  computed: {
    // 将商品数据切换为被点击后的那个类别
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  methods: {
    /*
     * 事件监听相关函数
     */
    // 点击控制栏后，将当前显示的商品类别修改为被点击的类别
    tabClick(index) {
      // Object.keys()返回的是对象里可枚举属性名组成的数组，Object.value()是取属性值
      this.currentType = Object.keys(this.goods)[index]; // 这里返回的是goods里的属性名
      this.getHomeGoods(this.currentType); // 点击后请求对应分类的商品
      // 使得两个TabControl点击后选中项保持同步
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // Home访问子组件scroll，调用返回顶部的方法
    backClick() {
      this.$refs.scroll.scrollTo(0,0);
    },
    // 监听滚动事件
    contentScroll(position) {
      // 1.判断BackTop是否需要显示
      this.isShowBackTop = position.y < -1000; // 当y坐标滚到-1000以下时，显示返回顶部
      // 2. 判断TabControl是否需要吸顶
      this.isTabFixed = position.y < -this.tabOffsetTop
    },
    // 上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType); // 请求新一页的商品数据
      this.$refs.scroll.finishPullUp(); // 完成上拉加载更多
    },
    // 轮播图加载后调用的方法
    swiperImageLoad() {
      // 获取tabControl的offsetTop，即相对于最近距离定位的父级元素的纵坐标偏移量
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /*
     * 网络请求相关函数
     */
    // 1.请求多个数据
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // 箭头函数里的没有this，在箭头函数里调用this，会向上查找，即getHomeMultidata中的this，指向vue实例
        this.banners =res.data.banner.list; // 取出响应数据中的轮播图数据
        this.recommends = res.data.recommend.list; // 取出响应数据中的推荐数据
      });
    },

    // 2.请求商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1; // 每次调用请求的页码就加一
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list); // 将请求来的商品数据压入goods中保存
        this.goods[type].page += 1; // 将goods中的页码加一
      })
    }
  }
}
</script>

<style scoped>

  #home {
    height: 100Vh;
    position: relative;
  }

  /*不同页面使用组件的时候可以设置自己的样式*/
  .home-nav {
    background-color: var(--color-tint);
    color: white;
  }

  .tab-control {
    position: relative;
    z-index: 100;
  }

  /*滚动内容设置样式*/
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

</style>
