<template>
  <div :class="{ kid: true, fixed, black }">
    <!-- <van-nav-bar
      left-arrow
      :title="title"
      :safe-area-inset-top="true"
      @click-left="back"
    /> -->
    <template v-if="fixed">
      <div class="icon left">
        <van-icon name="arrow-left" @click="back" />
        <!-- <div class="iconfont" @click="back">&#xe65e;</div> -->
      </div>
      <div class="center">
        <p class="title">{{ title }}</p>
      </div>
      <div class="icon right">
        <!-- <div class="iconfont">&#xe607;</div>
        <van-icon name="search" />
        <div class="iconfont">&#xe690;</div> -->
      </div>
    </template>

    <template v-else>
      <div class="icon left">
        <van-icon name="arrow-down" @click="hide" />
        <!-- <div class="iconfont" @click="back">&#xe614;</div> -->
      </div>
      <div class="center">
        <p class="title">{{ title }}</p>
        <p class="subtitle">{{ subtitle }}</p>
      </div>
      <div class="icon right">
        <!-- <div class="iconfont">&#xe65c;</div>
        <van-icon name="search" /> -->
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
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
    black: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(["mv"]),
  },
  methods: {
    back() {
      const that = this;
      let router = that.$router;
      window.history.length > 1 ? router.go(-1) : router.push("/");
    },
    hide() {
      const that = this;
      that.setPlayerShow(false);
      let mv = that.mv;
      mv.isShow = false;
      that.setMv(mv);
    },
    ...mapMutations({
      setPlayerShow: "SET_PLAYER_SHOW",

      setMv: "SET_MV",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.kid {
  flex-shrink: 0;
  width: 100%;
  // height: 1rem;
  height: $safeDistance; // 准备使用插槽solt
  padding: 0 0.3rem;
  box-sizing: border-box;
  color: #fff;
  z-index: $zIndex-M;
  @include flexSpaceBetween;
  transition: 0.5s;
  // .iconfont,
  >>> .van-icon {
    font-size: $text-XL;
  }
  .center {
    flex-grow: 1;
    max-width: 7.5rem;
    height: 100%;
    margin: 0 0.3rem;
    text-align: center;
    @include flexCenter;
    flex-direction: column;
    .title,
    .subtitle {
      width: 100%;
      @include omit;
    }
    .title {
      line-height: $text-L;
      font-size: $text-M;
      font-weight: bold;
    }
    .subtitle {
      margin-top: 0.1rem;
      line-height: $text-S;
      font-size: $text-XS;
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
    // -webkit-backdrop-filter: saturate(180%) blur(20px);
    // backdrop-filter: saturate(180%) blur(20px);
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    .center {
      align-items: flex-start;
    }
    .icon.left {
      flex: 0.1;
    }
    .center {
      text-align: left;
    }
  }
  &.black {
    color: #000;
  }
}
</style>