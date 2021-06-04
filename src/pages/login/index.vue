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
</style>