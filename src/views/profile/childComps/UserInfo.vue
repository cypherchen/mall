<template>
 <div class="user-info">
     <img src="~assets/img/profile/avatar.svg" class="avatar" alt="">
     <div class="login">
       <div>
         <div class="login-text">登录/注册</div>
         <div class="phone">
           <img src="~assets/img/profile/phone.svg" alt="">
           <span>暂无绑定手机号码</span>
         </div>
       </div>
       <img src="~assets/img/common/arrow-right.svg" class="right" alt="">
     </div>
 </div>
</template>

<script>
export default {
  name: "UserInfo"
}
</script>

<style scoped>
  .user-info {
    width: 100%;
    background-color: var(--color-tint);
    display: flex;
    padding:10px 15px 15px 10px;
    color: #fff;
  }

  .avatar {
    width: 65px;
    height: 65px;
  }

  .login {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .login-text {
    padding:0 0 5px 5px;
  }

  .phone  {
    height: 20px;
    line-height: 20px;
    font-size: 13px;
    font-weight: 300;
    display: flex;
  }

  .phone img {
    width: 20px;
    height: 20px;
  }

  .right {
    height: 11px;
  }
</style>
