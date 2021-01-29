<template>
  <div class="children">
    <div class="profile">
      <img
        class="portrait"
        :src="profile.avatarUrl"
        v-lazy="profile.avatarUrl"
      />
      <span class="name">
        {{ profile.nickname ? profile.nickname : "立即登录" }} &gt;
      </span>
    </div>
    <!-- <div>123</div> -->
  </div>
</template>

<script>
export default {
  name: "setting",
  props: {
    profile: {},
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.children {
  padding: 0 $text-XS;
  .profile {
    padding: $text-XS 0;
    @include flexCenter;
    justify-content: flex-start;
    .portrait {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      background-color: $theme-GRAY;
    }
    .name {
      margin-left: $text-XS;
      font-size: $text-S;
    }
  }
}
</style>