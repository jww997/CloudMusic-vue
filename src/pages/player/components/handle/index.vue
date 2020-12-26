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
      <div class="text">
        {{ currentTime }}
      </div>
      <div class="strip">
        <van-slider
          v-model="percentage"
          :step="10"
          button-size="10px"
          active-color="#f00"
          inactive-color="#494949"
          @change="togglePercentage"
        />
      </div>
      <div class="text">
        {{ duration }}
      </div>
    </div>
    <div class="bottom">
      <span class="iconfont">&#xe600;</span>
      <span class="iconfont">&#xe663;</span>
      <span
        :class="{
          'iconfont center': true,
          playing: $store.state.audio.isPlaying,
        }"
        @click="toggleStatus"
        >{{ $store.state.audio.isPlaying ? "&#xe665;" : "&#xe666;" }}
      </span>
      <span class="iconfont">&#xe668;</span>
      <span class="iconfont">&#xe664;</span>
    </div>
    <!-- 
    <audio
      ref="audio"
      :src="$store.state.audio.example.src"
      @timeupdate="updateTime"
    ></audio> -->
    <!-- <audio
      ref="audio"
      :src="$store.state.audio.example.src"
      @play="$store.commit('play')"
      @pause="$store.commit('pause')"
      @timeupdate="updateTime"
    ></audio> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { formatTime } from "@/assets/js/filter.js";
export default {
  name: "handle",
  data: function () {
    return {
      percentage: 0,
      currentTime: "00:00",
      duration: "00:00",
    };
  },
  computed: {
    // currentTime: function () {
    //   const that = this;
    //   return formatTime(that.$store.state.audio.example.currentTime);
    // },
    // duration: function () {
    //   const that = this;
    //   return formatTime(that.$store.state.audio.example.duration);
    // },
    // percentage: function () {
    //   const that = this;
    //   let example = that.$store.state.audio.example;
    //   return Number.parseInt((example.currentTime / example.duration) * 100);
    // },
    // ...mapGetters(["currentTime", "duration"]),
  },
  watch: {
    currentTime: function () {
      const that = this;
      let example = that.$store.state.audio.example;
      that.percentage =
        Number.parseFloat(example.currentTime / example.duration) * 100;
    },
  },
  methods: {
    updateTime: function (event) {
      const that = this;
      console.log(event);
      // that.currentTime = event.target.currentTime;
    },
    togglePercentage: function (val) {
      const that = this;
      let example = that.$store.state.audio.example;
      example.currentTime = example.duration * (val / 100); // 根据选中百分比修改进度条
    },
    toggleStatus: function () {
      const that = this;

      // let example = that.$store.state.audio.example;
      // console.log(example.currentTime);
      // console.log(example.duration);
      // console.log(example.currentTime / example.duration);
      // that.$refs.src = that.$store.state.audio.example.src;
      if (!that.$store.state.audio.isPlaying) {
        that.$store.commit("play");
        // that.$refs.audio.play();
      } else {
        that.$store.commit("pause");
        // that.$refs.audio.pause();
      }
    },
  },
  created: function () {
    const that = this;
    let example = that.$store.state.audio.example;
    that.$store.commit("timeupdate", () => {
      that.currentTime = formatTime(example.currentTime);
      that.duration = formatTime(example.duration);
    }); // 封装了一层
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
      width: 5rem;
    }
    .text {
      width: 0.7rem;
      text-align: center;
      @include omit;
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