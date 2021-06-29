<template>
<!--  标签组件三个插槽分别用来存放激活和未激活图片，以及文字-->
    <div class="tab-bar-item" @click="itemClick">
      <div v-if="!isActive" >
        <slot name="item-icon"></slot>
      </div>
      <div v-else>
        <slot name="item-icon-active"></slot>
      </div>
      <div :style="activeStyle">
        <slot name="item-text"></slot>
      </div>
    </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    // 接收父组件传来的路由路径
    path: String,
    // 接收父组件传来的自定义文字激活颜色
    activeColor: {
      style: String,
      default: 'red'
    }
  },
  computed: {
    // 判断当前页面是否是激活状态
    isActive() {
      return this.$route.path.includes(this.path);
    },
    // 页面激活后给文字添加颜色
    activeStyle() {
      return this.isActive ? {color:this.activeColor} : {};
    }
  },
  methods: {
    // 给标签绑定函数，点击后跳转到该标签
    itemClick() {
      this.$router.replace(this.path)
    }
  }
}
</script>

<style scoped>

/*标签样式*/
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

/*标签图片样式*/
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}

</style>
