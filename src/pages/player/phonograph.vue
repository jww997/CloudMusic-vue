<template>
  <div
    :class="{ phonograph: true, active: music.isPlaying }"
    @click="$emit('handleClick')"
  >
    <!-- 唱片 -->
    <disc class="disc" :cover="picUrl" :active="music.isPlaying" />
    <!-- 手柄 -->
    <img class="stick" :src="stickImage" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Disc from "@/components/disc.vue";

export default {
  name: "phonograph",
  props: ["picUrl"],
  components: {
    Disc,
  },
  data: function () {
    return {
      touchTimer: 0,
      touchDuration: 500,
    };
  },
  computed: {
    image: function () {
      const that = this;
      let al = that.phonograph && that.phonograph.al;
      return al && al.picUrl;
    },
    backgroundImage() {
      return `url(${require("@/assets/images/chassis.png")})`;
    },
    lightImage() {
      return require("@/assets/images/light.png");
    },
    lidImage() {
      return require("@/assets/images/lid.png");
    },
    stickImage() {
      return require("@/assets/images/stick.png");
    },
    ...mapGetters(["music"]),
  },
  // methods: {
  //   touchstart: function () {
  //     const that = this;
  //     let touchTimer = that.touchTimer;
  //     clearTimeout(touchTimer); // 清除定时器
  //     touchTimer = 0;
  //     that.touchTimer = setTimeout(function () {
  //       that.$vant.ImagePreview([that.picUrl]);
  //     }, that.touchDuration);
  //   },
  //   touchmove: function () {
  //     const that = this; // 如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
  //     let touchTimer = that.touchTimer;
  //     clearTimeout(touchTimer); // 清除定时器
  //     touchTimer = 0;
  //   },
  //   touchend: function () {
  //     const that = this; // 手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
  //     let touchTimer = that.touchTimer;
  //     clearTimeout(touchTimer);
  //     if (touchTimer != 0) {
  //       // 这里写要执行的内容（尤如onclick事件）
  //     }
  //   },
  // },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.phonograph {
  padding: 0 $padding-sm;
  position: relative;
  @include flexCenter;
  .disc,
  .stick {
    transition: $animation-duration-base;
  }
  .disc {
    width: 8rem;
    height: 8rem;
    margin-top: 2.5rem;
  }
  .stick {
    width: 2.5rem;
    transform-origin: 0.4rem 0.4rem;
    transform: rotate(-45deg);
    @include positionCenter;
    bottom: auto;
    left: 1.3rem;
  }
  &.active {
    .disc {
      animation-play-state: running;
    }
    .stick {
      transform: rotate(0);
    }
  }
}
</style>