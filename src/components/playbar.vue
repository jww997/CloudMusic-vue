<template>
  <div class="playbar" v-if="current.id">
    <!-- 唱片 -->
    <disc
      class="disc"
      :cover="current.al.picUrl"
      :active="music.isPlaying"
      @handleClick="toPlayer"
    />
    <!-- 歌曲名称 -->
    <div class="name" @click="toPlayer">
      {{ current.name }} - {{ current.ar[0].name }}
    </div>
    <!-- 播放暂停 -->
    <van-icon
      class="circle"
      name="pause-circle-o"
      size="25"
      v-if="music.isPlaying"
      @click.stop="toggleStatus"
    />
    <van-icon
      class="circle"
      name="play-circle-o"
      size="25"
      v-else
      @click.stop="toggleStatus"
    />
    <!-- 列表按钮 -->
    <van-icon
      class="wapNav"
      name="wap-nav"
      size="25"
      @click.stop="handleWapNavClick(true)"
    />
    <!-- 播放列表 -->
    <drawerlist
      :isShowDrawerlist="isShowDrawerlist"
      @close="handleWapNavClick(false)"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { toPages } from "@/assets/js/util.js";
import Drawerlist from "./drawerlist.vue";
import Disc from "./disc.vue";

export default {
  name: "playbar",
  components: {
    Drawerlist,
    Disc,
  },
  data() {
    return {
      isShowDrawerlist: false,
    };
  },
  computed: {
    current() {
      return this.music.current;
    },
    ...mapGetters(["music", "isShowDrawer"]),
  },
  methods: {
    toPlayer() {
      toPages.call(this, { name: "player" });
    },
    handleWapNavClick(val) {
      const that = this;
      that.isShowDrawerlist = val;
    },
    toggleStatus: function () {
      const that = this;
      let music = that.music;
      music.isPlaying = !music.isPlaying;
      that.setMusic(music);
    },
    toggleDrawerShow: function () {
      const that = this;
      that.amendStateObjValue({ key: "isShowDrawer", value: true });
    },
    togglePlayer: function () {
      const that = this;
      that.amendStateObjValue({ key: "isShow", value: true });
    },
    ...mapMutations({
      setMusic: "SET_MUSIC",
    }),
    ...mapActions(["amendStateObjValue"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.playbar {
  width: 100vw;
  height: 50px;
  padding: 0 $padding-sm;
  box-sizing: border-box;
  background-image: linear-gradient($background-color, $white);
  transition: $animation-duration-base;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .disc,
  .circle,
  .wapNav {
    flex-shrink: 0;
  }
  .disc {
    margin-top: -1rem;
  }
  .name {
    flex-grow: 1;
    line-height: $line-height-sm;
    margin-left: $padding-xs;
    font-size: $font-size-sm;
    @include omitS;
  }
  .circle,
  .wapNav {
    margin-left: $padding-sm;
  }
}
</style>