<template>
  <div class="kid" v-if="currentSong.id">
    <img
      :class="{
        picUrl: true,
        active: playState,
      }"
      :src="currentSong.al.picUrl"
    />
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
export default {
  name: "bottombar",
  computed: {
    ...mapGetters(["playState", "currentSong"]),
  },
  methods: {
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
  .picUrl {
    flex-shrink: 0;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    margin: -0.8rem 0.2rem 0 0;
    animation-duration: 20s;
    animation-name: turn;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-play-state: paused;
    &.active {
      animation-play-state: running;
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
      font-size: $text-S;
    }
    .ar {
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