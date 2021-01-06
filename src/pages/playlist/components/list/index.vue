<template>
  <div class="children">
    <div class="line guide">
      <div class="playall">
        <span class="iconfont front">&#xe674;</span>
        <span class="text">播放全部</span>
        <span class="total">({{ total }})</span>
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
        <!-- :to="{ path: '/player', query: { id: item.id } }" -->
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
            <span class="subtitle">{{ item.alia[0] }}</span>
          </p>
          <p class="source">{{ source(item) }}</p>
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
    ...mapGetters(["playState", "playIndex", "currentSong"]),
  },
  methods: {
    toPages: function (to, index) {
      const that = this;
      // that.insertSong();
      if (typeof index != "underfind") {
        console.log(`to.query.index = ${index}`);
        that.setPlayIndex(index);
        that.setPlayList(that.obj.tracks);
        that.setCurrentSong(that.obj.tracks[index]);
      }
      toPages.call(that, to);
    },
    source: function (res) {
      const that = this;
      let { ar, al } = res,
        singer = "";
      ar &&
        ar.forEach((item, index) => {
          singer += (index != 0 ? "/" : "") + item.name;
        });
      return `${singer} - ${al.name}`;
    },
    // ...mapActions(["insertSong"]),
    ...mapMutations({
      setPlayList: "SET_PLAY_LIST",
      setPlayIndex: "SET_PLAY_INDEX",
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
  // .line,
  // .list {
  //   flex-shrink: 0;
  // }
  .line {
    padding: 0.2rem 0.3rem;
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
        font-size: $text-L;
        color: #333;
        @include flexCenter;
        &.active {
          color: #f00;
        }
      }
      .name {
        flex-grow: 1;
        width: 1rem;
        line-height: 0.5rem;
        .songname {
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