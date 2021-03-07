<template>
  <div class="children">
    <div class="comments">
      <div class="comment" v-for="item in comments" :key="item.id">
        <div class="left">
          <img class="avatarUrl" :src="item.user.avatarUrl" />
        </div>
        <div class="right">
          <div class="nickname">{{ item.user.nickname }}</div>
          <div class="subheading">
            <span class="time">{{ formatDate(item.time) }}</span>
            <span class="wonderful">·精彩评论</span>
          </div>
          <div class="content">{{ item.content }}</div>
          <div class="reply">2条回复 &gt;</div>
        </div>
        <div class="like">
          <div class="text">{{ item.likedCount }}</div>
          <div :class="{ iconfont: true, active: item.liked }">&#xe697;</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Navbar from "@/common/navbar";
import { formatDate } from "@/assets/js/filter.js";
export default {
  name: "list",
  components: {
    Navbar,
  },
  props: {
    comments: { type: Array, default: [] },
  },
  methods: {
    formatDate,
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.children {
  .comments {
    height: 100%;
    border-top: 0.2rem solid $theme-LIGHTGRAY;
    .comment {
      min-height: 2rem;
      padding: 0.3rem;
      padding-left: 20%;
      // padding-right: 15%;
      box-sizing: border-box;
      border-bottom: 1px solid $theme-LIGHTGRAY;
      position: relative;
      .left,
      .like {
        @include positionCenter;
        @include flexCenter;
        bottom: auto;
        top: 0.4rem;
      }
      .left {
        flex-direction: column;
        right: 80%;
        .avatarUrl {
          width: 1.3rem;
          height: 1.3rem;
          border-radius: 50%;
          background-color: $theme-LIGHTGRAY;
        }
      }
      .right {
        line-height: $text-S;
        font-size: $text-XS;
        .nickname,
        .subheading {
          padding-right: 15%;
          box-sizing: border-box;
        }
        .nickname {
          color: $theme-GRAY;
        }
        .subheading {
          line-height: $text-M;
          font-size: $text-XXS;

          .time {
            color: #999;
          }
          .wonderful {
            color: #777;
          }
        }
        .content {
          margin-top: $text-XXXS;
          text-align: justify;
        }
        .reply {
          margin-top: $text-XXXS;
          color: $theme-BLUE;
        }
      }

      .like {
        left: 85%;
        color: $theme-GRAY;
        .text {
          margin-right: $text-XXXS;
          font-size: $text-XS;
        }
        .iconfont {
          font-size: $text-S;
          &.active {
            color: $theme-RED;
          }
        }
      }
    }
  }
}
</style>