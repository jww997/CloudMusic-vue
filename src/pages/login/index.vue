<template>
  <div class="login">
    <navbar fixed black title="手机号登录"></navbar>

    <phone></phone>
  </div>
</template>

<script>
import Navbar from "@/common/navbar";
import Phone from "./components/phone";
export default {
  name: "login",
  components: { Navbar, Phone },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.login {
  height: 100%;
  @include suspension;
  padding-bottom: $safeDistance;
  padding-top: $safeDistance;
  box-sizing: border-box;
  overflow: scroll;
}
</style>