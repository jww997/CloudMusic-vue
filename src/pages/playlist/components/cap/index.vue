<template>
  <div class="children">
    <div class="left">
      <cover :image="obj.coverImgUrl" :count="obj.playCount"></cover>
    </div>
    <div class="right">
      <div class="top">
        <div class="name">{{ obj.name }}</div>
        <div class="creator" v-if="obj.creator">
          <img class="avatarUrl" :src="obj.creator.avatarUrl" />
          <span class="nickname">{{ obj.creator.nickname }}</span>
        </div>
      </div>
      <div class="bottom">
        <div class="signature" v-if="obj.creator">
          {{ obj.creator.signature }}
        </div>
      </div>
    </div>
    <div class="operation">
      <div class="item">
        <span class="iconfont">&#xe61d;</span>
        <span class="text" v-html="formatUnit(obj.subscribedCount)">收藏</span>
      </div>
      <div class="item">
        <span class="iconfont">&#xe65d;</span>
        <span class="text" v-html="formatUnit(obj.commentCount)">评论</span>
      </div>
      <div class="item">
        <span class="iconfont">&#xe65c;</span>
        <span class="text" v-html="formatUnit(obj.shareCount)">分享</span>
      </div>
    </div>
  </div>
</template>

<script>
import Cover from "@/components/cover";
import { formatUnit } from "@/assets/js/filter";

export default {
  name: "Cap",
  components: {
    Cover,
  },
  props: {
    obj: {
      type: Object,
      default: {
        name: "歌单",
      },
    },
  },
  methods: {
    formatUnit,
    // formatUnit(num) {
    //   return formatUnit(num)
    // },
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.children {
  width: 100%;
  margin-bottom: 0.7rem;
  padding: 1rem 0.3rem 0.9rem;
  box-sizing: border-box;
  position: relative;
  background-color: rgba(0, 0, 0, 0.3);
  color: #666;
  display: flex;
  .left {
    flex-shrink: 0;
    width: 2.2rem;
  }
  .right {
    flex-grow: 1;
    width: 3rem;
    height: 2.2rem;
    line-height: 0.38rem;
    margin-left: 0.2rem;
    @include flexSpaceBetween;
    align-items: flex-start;
    flex-direction: column;
    .top {
      width: 100%;
      .name {
        width: 100%;
        color: #fff;
        @include omit;
        display: -webkit-box;
        white-space: normal;
        -webkit-column-count: 2;
        column-count: 2;
      }
      .creator {
        height: 0.4rem;
        margin-top: 0.2rem;
        @include flexSpaceBetween;
        justify-content: flex-start;
        .avatarUrl {
          height: 100%;
          border-radius: 50%;
        }
        .nickname {
          font-size: 0.2rem;
          margin-left: 0.1rem;
        }
      }
    }
    .bottom {
      width: 100%;
      .signature {
        width: 100%;
        font-size: 0.2rem;
        @include omit;
      }
    }
  }
  .operation {
    width: 80%;
    height: 0.9rem;
    margin: 0 auto;
    margin-bottom: -0.45rem;
    font-size: 0.2rem;
    border-radius: 2rem;
    background-color: #fff;
    box-shadow: 0 0 10px 0 #ccc;
    @include flexCenter;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    .item {
      flex: 1;
      border-right: 1px solid #ccc;
      @include flexCenter;
      .iconfont {
        font-size: 0.4rem;
      }
      .text {
        margin-left: 0.1rem;
      }
      &:last-child {
        border: none;
      }
    }
  }
}
</style>