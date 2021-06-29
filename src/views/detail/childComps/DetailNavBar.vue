<template>
  <div id="detail">
    <nav-bar>
      <template v-slot:left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
      </template>
      <template v-slot:center>
        <div class="title">
          <div v-for="(item,index) in titles"
               class="title-item"
               @click="itemClick(index)" :class="{active:currentIdenx===index}">{{item}}</div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品','参数','评论','推荐'], // 详情页面标题
      currentIdenx: 0 // 当前页面
    }
  },
  methods: {
    // 点击标题修改当前页面
    itemClick(index) {
      this.currentIdenx = index;
    },
    // 点击返回上一页
    backClick() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
 .title {
   display: flex;
   font-size: 13px;
 }
 .title-item {
   flex: 1;
 }
 .active {
   color: var(--color-high-text);
 }
 .back img {
   margin-top: 12px;
 }
</style>
