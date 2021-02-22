<template>
  <div class="children">
    <div class="profile" @click.stop="toPages({ name: 'oneself' })">
      <img
        class="portrait"
        :src="profile.avatarUrl"
        v-lazy="profile.avatarUrl"
      />
      <span class="name">
        {{ profile.nickname ? profile.nickname : "立即登录" }} &gt;
      </span>
    </div>
  </div>
</template>

<script>
import { toPages } from "@/assets/js/skip.js";
export default {
  name: "setting",
  props: {
    profile: {},
  },
  methods: {
    toPages,
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.children {
  padding: 0 $text-XS;
  // z-index: $zIndex-XXXS;
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