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
      <router-link
        class="line song"
        v-for="(item, index) in obj.tracks"
        :key="index"
        :to="{ path: '/player', query: { id: item.id } }"
      >
        <div class="front index">{{ ++index }}</div>
        <div class="name">
          <p class="songname">
            <span class="title">{{ item.name }}</span>
            <span class="subtitle">{{ item.alia[0] }}</span>
          </p>
          <p class="source">{{ source(item) }}</p>
        </div>
        <div class="iconfont">&#xe690;</div>
      </router-link>
    </div>
    <div class="line collect">
      <div class="portrait">
        <div
          class="image"
          v-for="(item, index) in obj.subscribers"
          :key="index"
        >
          <img :src="item.avatarUrl" :alt="item.name" v-if="index < 5" />
        </div>
      </div>
      <div class="text">12人收藏</div>
    </div>
  </div>
</template>

<script>
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
  },
  methods: {
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
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
.children {
  .line {
    padding: 0.2rem 0.3rem;
    @include flexSpaceBetween;
    .front {
      width: 0.4rem;
      flex-shrink: 0;
      text-align: center;
      margin-right: 0.2rem;
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
      }
      .text {
        font-size: 0.25rem;
        font-weight: bold;
      }
      .total {
        font-size: 0.15rem;
        margin-left: 0.15rem;
        color: #666;
      }
      ~ .iconfont {
        color: #000;
        font-size: 0.35rem;
        margin-left: 0.3rem;
      }
    }
  }
  .list {
    .song {
      .index {
        color: #333;
      }
      .name {
        flex-grow: 1;
        width: 1rem;
        line-height: 0.38rem;
        .songname {
          font-size: 0.2rem;
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
          font-size: 0.1rem;
          color: #666;
        }
      }
      .iconfont {
        color: #666;
        margin-left: 0.3rem;
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
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        margin-right: 0.1rem;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
    }
    .text {
      flex-shrink: 0;
      font-size: 0.2rem;
      color: #666;
    }
  }
}
</style>