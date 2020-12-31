<template>
  <div :class="{ children: true, active: playState }">
    <div
      class="disc"
      :style="{
        backgroundImage: 'url(' + require('@/assets/images/chassis.png') + ')',
      }"
    >
      <img class="cover" :src="phonograph.al.picUrl" />
      <!-- <img class="lid" :src="require('@/assets/images/lid.png')" /> -->
      <img class="light" :src="require('@/assets/images/light.png')" />
    </div>
    <img class="stick" :src="require('@/assets/images/stick.png')" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "phonograph",
  props: {
    phonograph: {
      type: Object,
      default: {},
    },
  },
  computed: {
    image: function () {
      const that = this;
      let al = that.phonograph && that.phonograph.al;
      return al && al.picUrl;
    },
    ...mapGetters(["playState"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
@keyframes turn {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.children {
  padding-top: 1.8rem;
  padding-bottom: 0.5rem;
  position: relative;
  .disc,
  .stick {
    transition: 0.5s;
  }
  .disc {
    width: 5rem;
    height: 0;
    margin: 0 auto;
    padding-bottom: 5rem;
    background: no-repeat center;
    background-size: 100% 100%;
    border-radius: 50%;
    position: relative;
    animation-duration: 20s;
    animation-name: turn;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-play-state: paused;

    overflow: hidden;
    img {
      width: 5rem;
      height: 5rem; // 部分图片呈长方形
      // max-width: 100%;
      // max-height: 100%;
      @include positionCenter;
      transform: scale(1.1);
    }
    .cover {
      transform: scale(0.7);
      border-radius: 50%;
      z-index: 1;
    }
    // .lid {
    //   z-index: 2;
    // }
    .light {
      z-index: 3;
    }
  }
  .stick {
    width: 2rem;
    transform-origin: 0.35rem 0.35rem;
    transform: rotate(-40deg);
    transition: 0.5s;
    @include positionCenter;
    bottom: auto;
    left: 1.3rem;
    z-index: 4;
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