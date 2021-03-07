<template>
  <div class="mine">
    <profile :profile="profile" :level="level"></profile>
    <application></application>

    <tabbar></tabbar>
  </div>
</template>

<script>
import Tabbar from "@/components/tabbar";
import Profile from "./components/profile";
import Application from "./components/application";

export default {
  name: "Mine",
  components: {
    Profile,
    Tabbar,
    Application,
  },
  data: function () {
    return {
      profile: {},
    };
  },
  mounted: function () {
    const that = this;

    that.$api
      .getLoginStatus()
      .then((res) => {
        that.profile = res.data.profile;
        return that.$api.getUserLevel();
      })
      .then((res) => {
        that.level = res.data.data;
      });
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
</style>
