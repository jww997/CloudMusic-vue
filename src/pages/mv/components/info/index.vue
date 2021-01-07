<template>
  <div class="children">
    <div class="top">
      <div class="left">
        (待开发)

        <div class="desc">{{ info.desc }}</div>
      </div>
      <div class="right">
        <div class="handle">
          <div class="iconfont">&#xe697;</div>
          <div class="text">{{ count.likedCount }}</div>
        </div>
        <div class="handle">
          <div class="iconfont">&#xe65d;</div>
          <div class="text">{{ count.commentCount }}</div>
        </div>
        <div class="handle">
          <div class="iconfont">&#xe65c;</div>
          <div class="text">{{ count.shareCount }}</div>
        </div>
        <div class="handle">
          <div class="iconfont">&#xe61d;</div>
          <div class="text">收藏</div>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div
        :class="{
          iconfont: true,
          like: true,
          active: isLike,
        }"
        v-html="isLike ? '&#xe669;' : '&#xe66a;'"
      ></div>
      <div class="name">{{ info.name }} - {{ info.artistName }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "info",
  props: {
    info: {},
    count: {},
  },
  data: function () {
    return { isLike: true };
  },
};
</script>


<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.children {
  @include positionCenter;
  top: auto;
  .top {
    @include flexSpaceBetween;
    align-items: flex-end;
    @include test;
    .left {
      @include test;
      .desc {
        line-height: $text-M;
        font-size: $text-S;
        text-align: justify;
      }
    }
    .right {
      @include test;
      .handle {
        @include flexCenter;
        flex-direction: column;
        padding: 0.3rem;
        .iconfont {
          font-size: $text-XXXL;
        }
        .text {
          font-size: $text-S;
          margin-top: 0.2rem;
        }
      }
    }
  }
  .bottom {
    @include flexCenter;
    justify-content: flex-start;
    padding: 0.5rem 0.3rem;
    .like {
      width: 1rem;
      font-size: 0.7rem;
      text-align: center;
      &.active {
        color: #ff3e43;
      }
    }
    .name {
      font-size: 0.3rem;
    }
  }
}
</style>