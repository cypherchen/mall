<template>
  <div class="list">
    <div v-for="(item, index) in listData"
         :key="index" class="list-item">
      <img :src="item.icon" alt="">
      <span>{{item.title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListView",
  props: {
    // 存放列表数据
    listData: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .list {
    border-top: 10px solid #eee;
  }

  .list :not(:last-child):not(img) {
    border-bottom: 1px solid #eee;
  }

  .list-item {
    padding: 10px 15px;
    display: flex;
  }

  .list-item img{
    width: 25px;
    height: 25px;
    margin-right: 10px;
  }

  .list-item span {
    height: 25px;
    line-height: 25px;
  }
</style>
