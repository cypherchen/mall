<template>
  <scroll class="content">
    <div class="side-bar">
      <div v-for="(item, index) in categories"
           :key="index" @click="itemClick(index)"
           class="side-bar-item"
           :class="{active: currentIndex===index}">
        {{item.title}}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

export default {
  name: "CategorySideBar",
  components: {
    Scroll
  },
  props: {
    // 分类列表数据
    categories: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0 // 当前点击分类的索引值
    }
  },
  methods: {
    // 点击后给Category发送一个自定义事件
    itemClick(index) {
      this.currentIndex = index; // 保存被点击分类的索引值
      this.$emit('selectItem',index);
    }
  }
}
</script>

<style scoped>
  .content {
    height: calc(100vh - 44px - 49px);
    width: 100px;
    background-color: #f6f6f6;
    position: relative;
    overflow: hidden;
  }

  .side-bar-item {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
  }

  .active {
    border-left: 5px solid var(--color-tint);
    background-color: #fff;
    font-weight: 700;
    color: var(--color-high-text);
  }
</style>
