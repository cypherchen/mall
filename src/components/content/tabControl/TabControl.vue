<template>
  <div class="tab-control">
    <!--实现点击后添加激活样式-->
    <div v-for="(item,index) in titles"
         class="tab-control-item"
         :class="{active:index === currentIndex}"
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex : 0 // 当前索引值
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;// 点击后修改当前索引值为被点击的元素索引值
      this.$emit('tabClick',index); // 点击后给父组件Home发送被点击的index
    }
  }
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
  .tab-control-item span {
    padding: 5px;

  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>
