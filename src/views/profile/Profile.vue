<template>
  <div>
    <nav-bar class="profile-nav-bar">
      <template #center>
        <div>个人中心</div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "Profile",
  components: {
    NavBar
  }
}
</script>

<style scoped>
  .profile-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
