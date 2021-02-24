<template>
  <div class="children" v-if="profile">
    <!-- <div class="profile" @click.stop="toPages({ name: 'oneself' }, hide)"> -->
    <div class="profile" @click.stop="toPages({ name: 'login' }, hide)">
      <img
        class="portrait"
        :src="profile.avatarUrl"
        v-lazy="profile.avatarUrl"
      />
      <span class="name"> {{ profile.nickname }} &gt; </span>
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
    hide: function () {
      const that = this;
      that.$emit("hide");
    },
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
      background-color: $theme-LIGHTGRAY;
    }
    .name {
      margin-left: $text-XS;
      font-size: $text-S;
      color: $theme-GRAY;
    }
  }
}
</style>