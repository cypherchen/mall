<template>
  <div class="sub-category">
    <sub-category-item v-for="(item, index) in subcategories.list"
                       :sub-item="item"
                       :key="index"/>
  </div>
</template>

<script>
import SubCategoryItem from "./SubCategoryItem";

export default {
  name: "SubCategory",
  components: {
    SubCategoryItem
  },
  props: {
    subcategories: { // 当前分类的子分类数据
      type: Object,
      default() {
        return {};
      }
    }
  },
}
</script>

<style scoped>

  .sub-category {
    width: calc(100vw - 100px);
    display: grid;
    grid-template-columns: repeat(3,1fr);
  }
</style>
