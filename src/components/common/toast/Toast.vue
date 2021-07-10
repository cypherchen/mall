<template>
  <div class="toast" v-show="isShow">
    <div>
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: '', // 提示信息
      isShow: false // 显示与否的标识
    }
  },
  methods: {
    // 弹出提示框函数
    show(message,duration=3000) {
      // 写入提示信息并显示提示框
      this.message = message;
      this.isShow = true;

      // 达到延迟时间后，初始化提示框
      setTimeout(() => {
        this.isShow = false;
        this.message = '';
      },duration);
    }
  }
}
</script>

<style scoped>
 .toast {
   position: fixed;
   top: 50%;
   left: 50%;
   transform: translate(-50%,-50%);
   color: #fff;
   background-color: rgba(0,0,0,.5);
   padding: 8px 10px;
   border-radius: 15px;
   z-index: 200;

   animation: show 3s;
 }

 @keyframes show {
   0% {visibility: hidden;background-color:rgba(0,0,0,0)}
   45% {visibility: visible;background-color:rgba(0,0,0,.5)}
   55% {visibility: visible;background-color:rgba(0,0,0,.5)}
   100% {visibility: hidden;background-color:rgba(0,0,0,0)}
 }
</style>
