<template>
  <div class="children">
    <div class="line guide">
      <div class="playall">
        <span class="iconfont front">&#xe674;</span>
        <span class="text">播放全部</span>
        <span class="total">({{ total ? total : 0 }})</span>
      </div>
      <div class="iconfont">&#xe65b;</div>
      <div class="iconfont">&#xe65a;</div>
    </div>
    <div class="list">
      <div
        class="line song"
        @click="toPages({ path: '/player', query: { id: item.id } }, index)"
        v-for="(item, index) in obj.tracks"
        :key="item.id"
      >
        <div
          class="front iconfont index active"
          v-if="playState && item.id == currentSong.id"
        >
          &#xe604;
        </div>
        <div class="front index" v-else>{{ index + 1 }}</div>
        <div class="name">
          <p class="songname">
            <span class="title">{{ item.name }}</span>
            <span class="subtitle">{{ formatArtists(item.alia) }}</span>
          </p>
          <p class="source">
            {{ `${formatArtists(item.ar)} - ${item.al.name}` }}
          </p>
        </div>
        <div
          class="iconfont mv"
          @click.stop="toPages({ path: '/mv', query: { id: item.mv } })"
          v-if="item.mv != 0"
        >
          &#xe606;
        </div>
        <div class="iconfont more">&#xe690;</div>
      </div>
    </div>
    <div class="line collect">
      <div class="portrait">
        <div
          class="image"
          v-for="(item, index) in obj.subscribers"
          :key="index"
        >
          <img :src="item.avatarUrl" :alt="item.name" />
        </div>
      </div>
      <div class="text" v-if="obj.subscribers">
        {{ obj.subscribers.length }}人收藏
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { formatArtists } from "@/assets/js/filter.js";
import { toPages } from "@/assets/js/skip.js";
export default {
  name: "List",
  props: {
    obj: {
      type: Object,
      default: {},
    },
  },
  computed: {
    total: function () {
      const that = this;
      let tracks = that.obj.tracks;
      return tracks && tracks.length;
    },
    ...mapGetters(["playId", "playState", "playIndex", "currentSong"]),
  },
  methods: {
    formatArtists,
    toPages: function (to, index = "") {
      const that = this;
      if (typeof index == "number") {
        let list = that.obj.tracks;
        let current = list[index];
        that.setPlayId(current.id);
        that.setPlayIndex(index);
        that.setPlayList(list);
        that.setCurrentSong(current);
      }
      toPages.call(that, to);
    },
    ...mapMutations({
      setPlayList: "SET_PLAY_LIST",
      setPlayIndex: "SET_PLAY_INDEX",
      setPlayId: "SET_PLAY_ID",
      setPlayState: "SET_PLAY_STATE",
      setCurrentSong: "SET_CURRENTSONG",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.children {
  .line {
    padding: 0.3rem;
    @include flexSpaceBetween;
    .front {
      width: 0.4rem;
      flex-shrink: 0;
      text-align: center;
      margin-right: 0.4rem;
    }
    .iconfont {
      flex-shrink: 0;
    }
  }
  .guide {
    .playall {
      flex-grow: 1;
      @include flexCenter;
      justify-content: flex-start;
      .iconfont {
        color: $red;
        margin-left: 0;
        font-size: $text-S;
      }
      .text {
        font-size: $text-S;
        font-weight: bold;
      }
      .total {
        font-size: $text-XS;
        margin-left: 0.15rem;
        color: #666;
      }
      ~ .iconfont {
        color: #000;
        font-size: $text-M;
        margin-left: 0.3rem;
      }
    }
  }
  .list {
    .song {
      .index {
        font-size: $text-S;
        color: #333;
        @include flexCenter;
        &.active {
          color: #f00;
          font-size: $text-L;
        }
      }
      .name {
        flex-grow: 1;
        width: 1rem;
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
          margin-top: 0.1rem;
          line-height: $text-S;
          font-size: $text-XS;
          color: #666;
        }
      }
      .mv,
      .more {
        color: #666;
        margin-left: 0.3rem;
        font-size: $text-M;
      }
    }
  }

  .collect {
    @include flexSpaceBetween;
    .portrait {
      flex-grow: 1;
      @include omit;
      display: flex;
      .image {
        width: 0.7rem;
        height: 0.7rem;
        line-height: 0;
        border-radius: 50%;
        margin-right: 0.2rem;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
    }
    .text {
      flex-shrink: 0;
      font-size: $text-XS;
      color: #666;
    }
  }
}
</style>