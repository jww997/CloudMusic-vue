<template>
  <div class="children">
    <div class="top">
      <span class="iconfont">&#xe66a;</span>
      <span class="iconfont">&#xe694;</span>
      <span class="iconfont">&#xe612;</span>
      <span class="iconfont">&#xe65d;</span>
      <span class="iconfont">&#xe690;</span>
    </div>
    <div class="progress">
      <div>00:00</div>
      <div class="strip">
        <van-progress
          :percentage="50"
          pivot-text=" "
          color="#fff"
          track-color="#494949"
          stroke-width="1px"
        />
      </div>
      <div>00:00</div>
    </div>
    <div class="bottom">
      <span class="iconfont">&#xe600;</span>
      <span class="iconfont">&#xe663;</span>
      <span
        :class="{ 'iconfont center': true, playing: $store.state.isPlaying }"
        @click="toggleStatus"
        >{{ $store.state.isPlaying ? "&#xe665;" : "&#xe666;" }}
      </span>
      <span class="iconfont">&#xe668;</span>
      <span class="iconfont">&#xe664;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "handle",
  // props: {
  //   isPlaying: {
  //     type: Boolean,
  //     default: false,
  //   },
  // },
  methods: {
    toggleStatus: function () {
      const that = this;
      if (!that.$store.state.isPlaying) {
        that.$store.commit("play");
      } else {
        that.$store.commit("pause");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
.children {
  padding: 0.5rem 0;
  @include positionCenter;
  top: auto;
  >>> .van-progress__pivot {
    min-width: 0.15rem;
    width: 0.15rem;
    height: 0.15rem;
    padding: 0;
    border-radius: 50%;
    top: 0;
  }
  .iconfont {
    color: #fff;
    font-size: 0.4rem;
  }
  .top {
    padding: 0.3rem 1rem;
    @include flexSpaceAround;
  }
  .progress {
    margin: 0.3rem;
    font-size: 0.2rem;
    color: #fff;
    @include flexSpaceBetween;
    .strip {
      flex-grow: 1;
      margin: 0 0.3rem;
    }
  }
  .bottom {
    padding: 0.3rem 1rem;
    @include flexSpaceAround;
    .center {
      transform: scale(2);
    }
  }
}
</style>