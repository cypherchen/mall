<template>
  <div>
    <nav-bar class="profile-nav-bar">
      <template #center>
        <div>个人中心</div>
      </template>
    </nav-bar>
    <!--用户信息封装成组件-->
    <user-info/>
    <div class="account">
      <div class="account-item">
        <span class="number">0.00</span>元
        <div>我的余额</div>
      </div>
      <div class="account-item">
        <span class="number">0</span>个
        <div>我的优惠</div>
      </div>
      <div class="account-item">
        <span class="number">0</span>分
        <div>我的积分</div>
      </div>
    </div>
    <!--列表可以封装成组件，个人中心列表分成两部分-->
    <list-view :list-data="infoList"/>
    <list-view :list-data="orderList"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import UserInfo from "./childComps/UserInfo";
import ListView from "./childComps/ListView";

export default {
  name: "Profile",
  components: {
    NavBar,
    UserInfo,
    ListView
  },
  data() {
    return {
      // 信息列表
      infoList: [
        // :src动态绑定时不能直接写本地的路径，将本地图片路径用require导入一下才可以使用
        {icon: require('../../assets/img/profile/pointer.svg'), title: '积分商城'},
        {icon: require('../../assets/img/profile/vip.svg'), title: '会员卡'}
      ],
      // 订单列表
      orderList: [
        {icon: require('../../assets/img/profile/message.svg'), title: '我的信息'},
        {icon: require('../../assets/img/profile/cart.svg'), title: '我的购物车'},
        {icon: require('../../assets/img/profile/shopping.svg'), title: '我的订单'}
      ]
    }
  }
}
</script>

<style scoped>
  .profile-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

  .account {
    display: flex;
    font-size: 13px;
  }

  .account-item {
    padding: 18px;
    flex-grow: 1;
    text-align: center;
  }

  .account :not(:last-child){
    border-right:1px solid #eee ;
  }

  .account-item div {
    padding-top: 5px;
  }

  .number {
    color: var(--color-high-text);
    font-size: 24px;
    font-weight: bold;
  }
</style>
