<template>
  <div class="common" v-if="list">
    <div class="line all">
      <div class="left" @click="togglePlayer(0)">
        <span class="iconfont active" v-html="'&#xe674;'"></span>
      </div>
      <div class="center" @click="togglePlayer(0)">
        <p class="songname">
          <span class="title">播放全部</span>
          <span class="subtitle" v-if="list.length">({{ list.length }})</span>
        </p>
      </div>
      <div class="right">
        <!-- <div class="iconfont">&#xe65b;</div> -->
        <van-icon size="25" name="certificate" />
      </div>
    </div>
    <div
      class="line"
      @click="togglePlayer(index)"
      v-for="(item, index) in list"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave"
      :key="item.id"
    >
      <div class="left">
        <span
          class="active iconfont"
          v-if="playState && item.id == currentSong.id"
          v-html="'&#xe604;'"
        ></span>
        <img
          class="image"
          v-else-if="item.al.picUrl"
          :src="item.al.picUrl"
          v-lazy="item.al.picUrl"
        />
        <span class="serial" v-else>{{ index + 1 }}</span>
      </div>

      <div class="center">
        <p class="songname">
          <span class="title">{{ item.name }}</span>
          <span class="subtitle" v-if="formatArtists(item.alia)"
            >({{ formatArtists(item.alia) }})</span
          >
        </p>
        <p class="source">
          {{ `${formatArtists(item.ar)} - ${item.al.name}` }}
        </p>
      </div>

      <div class="right">
        <div
          class="iconfont mv"
          @click.stop="toggleMv(item.mv)"
          v-if="item.mv != 0"
          v-html="'&#xe606;'"
        ></div>
        <van-icon size="25" name="ellipsis" class="more" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { formatArtists } from "@/assets/js/filter.js";
export default {
  name: "List",
  props: {
    list: {
      type: Array,
      value: [],
    },
    // sortType: 1,
  },
  computed: {
    ...mapGetters(["playId", "playState", "playIndex", "currentSong", "mv"]),
  },
  methods: {
    formatArtists,
    mouseenter: function (index) {
      const that = this;
    },
    mouseleave: function (index) {
      const that = this;
    },
    togglePlayer: function (index) {
      const that = this;
      that.setPlayerShow(true);
      if (typeof index == "number") {
        let list = that.list;
        let current = list[index];
        that.setPlayId(current.id);
        that.setPlayIndex(index);
        that.setPlayList(list);
        that.setCurrentSong(current);
      }
    },
    toggleMv: function (id) {
      const that = this;
      console.log(id);
      let mv = that.mv;
      mv.id = id;
      mv.isShow = true;
      that.setMv(mv);
    },
    ...mapMutations({
      setPlayList: "SET_PLAY_LIST",
      setPlayIndex: "SET_PLAY_INDEX",
      setPlayId: "SET_PLAY_ID",
      setPlayState: "SET_PLAY_STATE",
      setPlayerShow: "SET_PLAYER_SHOW",
      setCurrentSong: "SET_CURRENTSONG",

      setMv: "SET_MV",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.common {
  .line {
    padding: 0.3rem;
    @include flexSpaceBetween;
    .left {
      flex-shrink: 0;
      width: $text-XXL;
      height: $text-XXL;
      margin-right: 0.4rem;
      @include flexCenter;
      .active {
        color: $theme-RED;
        font-size: $text-L;
      }
      .image {
        width: 100%;
        height: 100%;
        border-radius: 0.1rem;
        background-color: $theme-LIGHTGRAY;
      }
      .serial {
        font-size: $text-S;
        color: #333;
        @include flexCenter;
      }
    }

    .center {
      flex-grow: 1;
      width: 50%;
      .songname {
        line-height: $text-M;
        font-size: $text-S;
        @include omit;
        .title {
          color: #000;
        }
        .subtitle {
          color: #666;
        }
      }
      .source {
        @include omit;
        margin-top: $text-XXXS;
        line-height: $text-S;
        font-size: $text-XS;
        color: #666;
      }
    }

    .right {
      flex-shrink: 0;
      @include flexCenter;
      .iconfont,
      .more {
        color: #666;
        margin-left: 0.3rem;
        font-size: $text-M;
      }
      .more {
        transform: rotate(90deg);
      }
    }

    &.all {
      position: sticky;
      top: $safeDistance;
      background-color: $theme-WHITE;
      z-index: $zIndex-L;

      .center {
        @include flexCenter;
        justify-content: flex-start;
        .songname {
          line-height: $text-L;
          font-size: $text-S;
          .title {
            font-weight: bold;
          }
          .subtitle {
            margin-left: 0.15rem;
            color: #666;
          }
        }
      }
    }
  }
}
</style>