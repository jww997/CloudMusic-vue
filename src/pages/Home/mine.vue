<template>
  <!-- 我的 -->
  <div class="mine">
    <div class="mine-login">
      <div class="mine-login-image"></div>
      <span class="mine-login-text">登录立享手机电脑多端同步</span>
      <button class="mine-login-btn">立即登录</button>
    </div>
    <menu-bar :menus="mine.menus"></menu-bar>
  </div>
</template>

<script>
import MenuBar from "@/components/menuBar/index"; // 菜单条

export default {
  name: "mine",
  props: {
    mine: {
      type: Object,
      value: {}
    }
  },
  components: {
    MenuBar
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.mine {
  background-color: #000;
}
.mine-login {
  padding: 0.2rem;
  font-size: 0.15rem;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mine-login-image {
  width: 0.8rem;
  height: 0.8rem;
  background-color: #ccc;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
}

.mine-login-image::before,
.mine-login-image::after {
  content: "";
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  margin: auto;
}

.mine-login-image::before {
  width: 35%;
  height: 35%;
  bottom: 0.1rem;
}

.mine-login-image::after {
  width: 90%;
  height: 90%;
  bottom: -1rem;
}

.mine-login-text {
  flex-grow: 1;
  margin-left: 0.2rem;
}

.mine-login-btn {
  font-size: 0.15rem;
  border-radius: 50px;
  background-color: transparent;
  border: 1px solid #fff;
  padding: 0 0.1rem;
  color: #fff;
}
</style>