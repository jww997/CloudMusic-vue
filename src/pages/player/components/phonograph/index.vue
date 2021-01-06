<template>
  <div class="children">
    <div :class="{ phonograph: true, active: playState }">
      <div
        class="disc"
        :style="{
          backgroundImage:
            'url(' + require('@/assets/images/chassis.png') + ')',
        }"
      >
        <!-- @dbclick.stop="imagePreview" -->
        <img class="cover" :src="picUrl" v-if="picUrl" />
        <!-- <img class="lid" :src="require('@/assets/images/lid.png')" /> -->
        <img class="light" :src="require('@/assets/images/light.png')" />
      </div>
      <img class="stick" :src="require('@/assets/images/stick.png')" />
    </div>
    <div class="bottom">
      <span class="iconfont">&#xe66a;</span>
      <span class="iconfont">&#xe694;</span>
      <span class="iconfont">&#xe612;</span>
      <span class="iconfont">&#xe65d;</span>
      <span class="iconfont">&#xe690;</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "phonograph",
  props: {
    picUrl: {
      type: String,
      default: "",
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
  methods: {
    imagePreview() {
      const that = this;
      let image = that.picUrl;
      that.$preview([image]);
    },
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
  width: 100%;
  height: 100%;
  @include flexSpaceBetween;
  flex-direction: column;

  .phonograph {
    flex-grow: 1;
    width: 75%;
    padding-top: 20%;
    padding-bottom: 0.5rem;
    position: relative;
    .disc,
    .stick {
      transition: 0.5s;
    }
    .disc {
      width: 100%;
      height: 0;
      margin: 0 auto;
      padding-bottom: 100%;
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
        width: 100%;
        height: 100%; // 部分图片呈长方形
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
      width: 25%;
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
  .bottom {
    flex-shrink: 0;
    width: 100%;
    padding: 0.3rem 1rem;
    // margin-top: 0.5rem;
    box-sizing: border-box;
    @include flexSpaceAround;
    .iconfont {
      color: #fff;
      font-size: $text-L;
    }
  }
}
</style>