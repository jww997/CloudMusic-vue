<template>
  <div class="children">
    <div class="left" @click.stop="imagePreview">
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
      <div
        class="item"
        @click.stop="toPages({ name: 'comment', params: { id: obj.id } })"
      >
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
import { toPages } from "@/assets/js/util.js";

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
    toPages,
    imagePreview() {
      const that = this;
      let image = that.obj.coverImgUrl;
      that.$vant.ImagePreview([image]);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.children {
  width: 100%;
  // height: 100%;
  height: 6rem;
  margin-bottom: 1rem;
  padding: $safeDistance 0.3rem 0.9rem;
  box-sizing: border-box;
  position: relative;
  border-radius: 0 0 40rem 40rem / 1rem;
  background-color: rgba(0, 0, 0, 0.3);
  color: #666;
  @include flexSpaceBetween;
  .left {
    flex-shrink: 0;
    width: 3.2rem;
    // margin-top: $text-XXS;
  }
  .right {
    flex-grow: 1;
    min-width: 3rem;
    height: 3.2rem;
    line-height: 0.65rem;
    margin-left: 0.3rem;
    @include flexSpaceBetween;
    align-items: flex-start;
    flex-direction: column;
    .top {
      width: 100%;
      .name {
        width: 100%;
        color: #fff;
        font-size: $text-M;
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
          font-size: $text-S;
          margin-left: 0.1rem;
        }
      }
    }
    .bottom {
      width: 100%;
      .signature {
        width: 100%;
        font-size: $text-XS;
        @include omit;
      }
    }
  }
  .operation {
    width: 80%;
    height: 1.1rem;
    margin: 0 auto;
    margin-bottom: -0.5rem;
    font-size: $text-XS;
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
      font-size: $text-XS;
      .iconfont {
        font-size: $text-M;
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