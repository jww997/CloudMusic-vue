<template>
  <div :class="{ common: true, fixed, black }" :style="{ backgroundColor }">
    <div class="left">
      <van-icon name="arrow-left" @click="back" />
    </div>
    <div class="right">
      <div class="name" v-if="title">
        <p class="title">{{ title }}</p>
        <p class="subtitle" v-if="subtitle">{{ subtitle }}</p>
      </div>
      <div class="solt" v-else>
        <slot></slot>
      </div>
    </div>

    <!-- <div class="center">
      <p class="title" v-if="title">{{ title }}</p>
      <p class="subtitle" v-if="subtitle">{{ subtitle }}</p>
    </div> -->
  </div>

  <!-- <van-nav-bar
      left-arrow
      :title="title"
      :fixed="fixed"
      :border="false"
      :safe-area-inset-top="true"
      @click-left="back"
    >
      <template #right>
        <slot></slot>
      </template>
    </van-nav-bar> -->
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
    backgroundColor: {
      type: String,
      default: "transparent",
    },

    type: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapState(["music", "mv"]),
  },
  methods: {
    back() {
      const that = this;
      let router = that.$router;
      window.history.length > 1 ? router.go(-1) : router.push("/");
    },
    hide() {
      const that = this;
      let mv = that.mv;
      let music = that.music;
      music.isShow = false;
      mv.isShow = false;
      that.setMusic(music);
      that.setMv(mv);
    },
    ...mapMutations({
      setMusic: "SET_MUSIC",
      setMv: "SET_MV",
    }),
  },

  // <div :class="{ common: true, fixed, black }" :style="{ backgroundColor }">
  //   <template v-if="fixed">
  //     <div class="icon left">
  //       <van-icon name="arrow-left" @click="back" />
  //       <!-- <div class="iconfont" @click="back">&#xe65e;</div> -->
  //     </div>
  //     <div class="right"></div>

  //     <div class="center" v-if="title || subtitle">
  //       <p class="title" v-if="title">{{ title }}</p>
  //       <p class="subtitle" v-if="subtitle">{{ subtitle }}</p>
  //     </div>
  //     <slot wx:else></slot>
  //     <!-- <div class="icon right">
  //       <van-icon name="search" />
  //     </div> -->
  //   </template>

  //   <!-- <template v-else>
  //     <div class="icon left">
  //       <van-icon name="arrow-down" @click="back" />
  //     </div>
  //     <div class="center">
  //       <p class="title">{{ title }}</p>
  //       <p class="subtitle">{{ subtitle }}</p>
  //     </div>
  //     <div class="icon right">
  //       <van-icon name="search" />
  //       </div>
  //     </template> -->
  // </div>
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.common {
  width: 100%;
  height: $safeDistance;
  position: relative;
  z-index: 1;
  color: #fff;
  .left {
    width: $safeDistance;
    @include positionCenter;
    @include flexCenter;
    right: auto;
    >>> .van-icon {
      font-size: $text-XL;
    }
  }
  .right {
    height: 100%;
    .name,
    .solt {
      height: 100%;
      margin-left: $safeDistance;
      @include flexCenter;
    }
    .name {
      flex-direction: column;
      margin-right: $safeDistance;
      .title,
      .subtitle {
        max-width: 100%;
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
    .solt {
      justify-content: flex-start;
    }
  }
  &.fixed {
    position: fixed;
    top: 0;
  }
  &.black {
    color: #000;
  }
}
// -webkit-backdrop-filter: saturate(180%) blur(20px);
// backdrop-filter: saturate(180%) blur(20px);
</style>