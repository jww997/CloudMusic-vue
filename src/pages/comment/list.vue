<template>
  <div class="list">
    <scroll :handleScrollBottom="handleScrollBottom">
      <div class="line" v-for="item in list" :key="item.id">
        <van-image
          class="portrait"
          :src="item.user.avatarUrl"
          :lazy-load="item.user.avatarUrl"
        />
        <div class="text">
          <div class="name">{{ item.user.nickname }}</div>
          <div class="subheading">{{ formatDate(item.time) }}·精彩评论</div>
          <div class="content">{{ item.content }}</div>
          <div class="reply" v-if="item.showFloorComment.showReplyCount">
            {{ item.showFloorComment.replyCount }}条回复 &gt;
          </div>
        </div>
        <div class="like">
          <span class="count">{{ item.likedCount }}</span>
          <van-icon
            class="goodjob"
            :class="{ active: item.liked }"
            :name="`good-job${item.liked ? '' : '-o'}`"
          />
        </div>
      </div>
    </scroll>
    <placeholder />
  </div>
</template>

<script>
import { formatDate } from "@/assets/js/filter.js";
import Placeholder from "@/components/placeholder";
import Scroll from "@/components/Scroll";

export default {
  name: "list",
  props: ["list"],
  components: {
    Placeholder,
    Scroll,
  },
  methods: {
    formatDate,
    handleScrollBottom() {
      this.$emit("handleScrollBottom");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.list {
  padding: 0 $padding-sm;
  background-color: $white;
  .line {
    min-height: 2rem;
    padding: $padding-sm 0 $padding-sm 1.7rem;
    border-bottom: $border-width-base solid $border-color;
    box-sizing: border-box;
    position: relative;
    .portrait {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      overflow: hidden;
      position: absolute;
      top: $padding-sm;
      left: 0;
    }
    .text {
      line-height: $line-height-sm;
      font-size: $font-size-sm;
      .name,
      .subheading {
        padding-right: 3rem;
        box-sizing: border-box;
      }
      .name {
        color: $gray-7;
      }
      .subheading {
        color: $gray-5;
      }
      .content,
      .reply {
        margin-top: $padding-base;
      }
      .content {
        @include linefeed;
      }
      .reply {
        color: $theme-color;
      }
    }
    .like {
      position: absolute;
      top: $padding-sm;
      right: 0;
      display: flex;
      align-items: center;
      .count {
        max-width: 2rem;
        font-size: $font-size-sm;
        margin-bottom: -$padding-base;
        @include omit;
      }
      .goodjob {
        font-size: $font-size-lg;
        margin-left: $padding-base;
        &.active {
          color: $theme-color;
        }
      }
    }
  }
}
</style>