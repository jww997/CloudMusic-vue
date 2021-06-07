<template>
  <div class="mine">
    <profile :profile="profile" :level="level"></profile>
    <application></application>

    我的
  </div>
</template>

<script>
import Profile from "./profile.vue";
import Application from "./application.vue";

export default {
  name: "mine",
  components: {
    Profile,
    Application,
  },
  data() {
    return {
      profile: {},
    };
  },
  mounted() {
    const that = this;

    // that.$api
    //   .getLoginStatus()
    //   .then((res) => {
    //     that.profile = res.data.profile;
    //     return that.$api.getUserLevel();
    //   })
    //   .then((res) => {
    //     that.level = res.data.data;
    //   });
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
</style>
