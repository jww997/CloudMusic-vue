<template>
  <div
    class="kid"
    v-if="currentSong.id"
    @click="toPages({ path: '/player', query: { id: currentSong.id } })"
  >
    <div
      :class="{
        al: true,
        active: playState,
      }"
      :style="{
        backgroundImage: 'url(' + require('@/assets/images/chassis.png') + ')',
      }"
    >
      <img class="cover" :src="currentSong.al.picUrl" />
      <img class="light" :src="require('@/assets/images/light.png')" />
    </div>
    <div class="monicker">
      <span class="name">{{ currentSong.name }}</span>
      <span class="ar">{{ currentSong.ar[0].name }}</span>
    </div>
    <div class="state" @click.stop="toggleStatus">
      <van-icon name="pause-circle-o" v-if="playState" />
      <van-icon name="play-circle-o" v-else />
    </div>
    <!-- <span
      :class="{
        'iconfont center': true,
        playing: playState,
      }"
      @click.stop="toggleStatus"
      >{{ playState ? "&#xe665;" : "&#xe666;" }} 
    </span>-->
    <span class="iconfont" @click.stop="togglePlaylistToast">&#xe664;</span>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { toPages } from "@/assets/js/skip.js";
export default {
  name: "bottombar",
  computed: {
    ...mapGetters(["playState", "currentSong"]),
  },
  methods: {
    toPages,
    toggleStatus: function () {
      const that = this;
      that.setPlayState(!that.playState);
    },
    togglePlaylistToast: function () {
      const that = this;
      that.setPlaylistToast(true);
    },
    ...mapMutations({
      setPlayState: "SET_PLAY_STATE",
      setPlaylistToast: "SET_PLAY_LIST_TOAST",
    }),
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
.kid {
  width: 100%;
  height: $safeDistance;
  padding: 0 0.3rem;
  box-sizing: border-box;
  background-image: linear-gradient(#efefef, transparent);
  background-color: #fff;
  @include flexSpaceBetween;
  transition: 0.5s;
  overflow: visible;
  .al,
  .cover {
    border-radius: 50%;
    overflow: visible;
  }
  .cover,
  .light {
    @include positionCenter;
  }
  .al {
    flex-shrink: 0;
    width: 1.5rem;
    height: 1.5rem;
    margin: -0.8rem 0.2rem 0 0;
    background-size: 100% 100%;
    position: relative;
    animation-duration: 20s;
    animation-name: turn;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-play-state: paused;
    &.active {
      animation-play-state: running;
    }
    .cover {
      width: 65%;
      height: 65%;
      z-index: $zIndex-XXXS;
    }
    .light {
      width: 100%;
      height: 100%;
      z-index: $zIndex-XXS;
    }
  }
  .monicker {
    flex-grow: 1;
    line-height: 1;
    padding-bottom: $text-XXXS;
    box-sizing: border-box;
    @include omit;
    .name,
    .ar {
      line-height: $safeDistance;
    }
    .name {
      font-size: $text-S;
    }
    .ar {
      margin-left: -0.2rem;
      font-size: $text-XS;
      color: $theme-GRAY;
      &::before {
        content: "-";
        margin: 0 $text-XXXS;
      }
    }
  }
  .iconfont,
  .state {
    margin-left: $text-XS;
  }
  .state {
    @include flexCenter;
    font-size: $text-XXL;
  }
  .iconfont {
    font-size: $text-L;
  }
}
</style>