<template>
  <div class="recommend">
    <!--将推荐栏数据取出，并依次展示-->
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    padding-bottom: 20px;
    border-bottom: 10px solid #eee;
  }

  .recommend-item {
    flex: 1;
  }
  .recommend img {
    width: 80%;
    margin: 8px auto;
  }
</style>
