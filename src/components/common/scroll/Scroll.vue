<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
  name: "Scroll",
  props: {
    // 设置滚动侦测的类型，可以在不同场景使用时候可以自定义类型，减少性能浪费
    probeType: {
      type: Number,
      default: 0
    },
    // 上拉加载默认不执行
    pullUpLoad: {
      type:Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null, // 把BScroll的实例保存在scroll中
    }
  },
  // created里还没挂载，不能获取dom元素，所以下面的实例化必须在挂载后，即mounted
  mounted() {
    // 1.实例化一个BScroll对象，使用ref不使用class是为了在组件复用时不会被其他同名class干扰
    this.scroll = new BScroll(this.$refs.wrapper,{
      probeType: this.probeType,
      click: true, // 允许监听滚动内的点击事件
      mouseWheel: true, // 允许使用鼠标滚轮进行滚动
      pullUpLoad:this.pullUpLoad, // 上拉加载
    });
    // 2.监听滚动事件，并将坐标发送给父组件Home处理
    this.scroll.on('scroll',(position) => {
      this.$emit('scroll',position);
    });
    // 3.监听上拉事件
    this.scroll.on('pullingUp',() => {
      this.$emit('pullingUp'); // 传给父组件调用
    })
  },
  methods: {
    // 封装一个返回顶部的函数，供返回顶部组件调用
    scrollTo(x,y,time=500) { // 前两个是坐标，第三个是动画时间，默认值500ms
     this.scroll && this.scroll.scrollTo(x,y,time);
    },
    // 封装一个刷新滚动内容高度的方法
    refresh() {
     this.scroll && this.scroll.refresh(); // scroll对象生成后再调用
    },
    // 封装一个上拉到底部的函数
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    // 封装一个获取当前页面滚动位置的函数
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  }
}
</script>

<style scoped>

</style>
