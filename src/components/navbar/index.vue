<template>
  <div :class="{ kid: true, fixed }">
    <!-- <van-nav-bar
      left-arrow
      :title="title"
      :safe-area-inset-top="true"
      @click-left="back"
    /> -->
    <template v-if="fixed">
      <div class="icon left">
        <div class="iconfont" @click="back">&#xe65e;</div>
      </div>
      <div class="center">
        <p class="title">{{ title }}</p>
      </div>
      <div class="icon right">
        <div class="iconfont">&#xe607;</div>
        <div class="iconfont">&#xe690;</div>
      </div>
    </template>
    <template v-else>
      <div class="icon left">
        <div class="iconfont" @click="back">&#xe614;</div>
      </div>
      <div class="center">
        <p class="title">{{ title }}</p>
        <p class="subtitle">{{ subtitle }}</p>
      </div>
      <div class="icon right">
        <div class="iconfont">&#xe65c;</div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "navbar",
  props: {
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    fixed: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    back() {
      const that = this;
      let router = that.$router;
      window.history.length > 1 ? router.go(-1) : router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
.kid {
  height: 1rem;
  padding: 0.2rem 0.3rem;
  box-sizing: border-box;
  color: #fff;
  z-index: 100;
  @include flexSpaceBetween;
  // position: absolute;
  // right: 0;
  // left: 0;
  // top: 0;
  .iconfont {
    font-size: 0.5rem;
  }
  .center {
    flex-grow: 1;
    text-align: center;
    .title {
      font-size: 0.35rem;
      font-weight: bold;
    }
    .subtitle {
      margin-top: 0.1rem;
      font-size: 0.1rem;
      color: #efefef;
    }
  }
  .icon {
    flex: 0.5;
    @include flexCenter;
    .iconfont {
      margin-left: 0.3rem;
      &:first-child {
        margin-left: 0;
      }
    }
    &.left {
      justify-content: flex-start;
    }
    &.right {
      justify-content: flex-end;
    }
  }
  &.fixed {
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    .icon.left {
      flex: 0.25;
    }
    .center {
      text-align: left;
    }
  }
}
</style>