<template>
  <div class="children" v-if="list">
    <div class="line collect">
      <div class="portrait">
        <div class="image" v-for="(item, index) in list" :key="index">
          <img :src="item.avatarUrl" :alt="item.name" />
        </div>
      </div>
      <div class="text" v-if="list.length">{{ list.length }}人收藏</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "Subscribers",
  props: {
    list: {
      type: Array,
      value: [],
    },
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
    position: sticky;
    top: $safeDistance;
    background-color: $theme-WHITE;
    z-index: $zIndex-L;
    .playall {
      flex-grow: 1;
      height: $text-XXL;
      @include flexCenter;
      justify-content: flex-start;
      .iconfont {
        color: $theme-RED;
        margin-left: 0;
        font-size: $text-M;
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
      .more {
        transform: rotate(90deg);
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