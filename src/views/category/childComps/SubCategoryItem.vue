<template>
  <div class="sub-item">
    <a :href="subItem.link">
      <img :src="subItem.image" alt="">
      <div>{{subItem.title}}</div>
    </a>
  </div>
</template>

<script>
export default {
  name: "SubCategoryItem",
  props: {
    subItem: { // 每一项子分类的数据
      type: Object,
      default() {
        return {}
      }
    }
  },
}
</script>

<style scoped>
  .sub-item {
    padding: 10px;
    font-size: 12px;
  }

  .sub-item img {
    width: 65px;
    height: 64px;
    margin-bottom: 10px;
  }

  .sub-item div {
    text-align: center;
    width: 65px;
  }
</style>
