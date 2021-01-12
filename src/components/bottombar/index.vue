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
    <span
      :class="{
        'iconfont center': true,
        playing: playState,
      }"
      @click="toggleStatus"
      >{{ playState ? "&#xe665;" : "&#xe666;" }}
    </span>
    <span class="iconfont">&#xe664;</span>
    <!-- <span class="iconfont" @click="toggleShowList">&#xe664;</span> -->
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
    ...mapMutations({
      setPlayState: "SET_PLAY_STATE",
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
  @include suspension;
  height: $safeDistance;
  top: auto;
  padding: 0 0.3rem;
  box-sizing: border-box;
  background-image: linear-gradient(#efefef, transparent);
  @include flexSpaceBetween;
  transition: 0.5s;
  overflow: visible;
  .al,
  .cover {
    border-radius: 50%;
    overflow: hidden;
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
    background-size: cover;
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
      z-index: 2;
    }
    .light {
      width: 100%;
      height: 100%;
      z-index: 3;
    }
  }
  .monicker {
    flex-grow: 1;
    padding-bottom: $text-XXXS;
    box-sizing: border-box;
    @include flexCenter;
    justify-content: flex-start;
    @include omit;
    .name {
      line-height: $text-M;
      font-size: $text-S;
    }
    .ar {
      line-height: $text-S;
      font-size: $text-XS;
      color: $theme-GRAY;
      &::before {
        content: "-";
        margin: 0 $text-XXXS;
      }
    }
  }
  .iconfont {
    font-size: $text-XL;
    margin-left: $text-XS;
  }
}
</style>