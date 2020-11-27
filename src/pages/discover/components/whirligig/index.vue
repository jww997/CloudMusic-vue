<template>
  <div class="container">
    <div class="header">
      <div class="title">推荐歌单</div>
      <div class="more">更多 &gt;</div>
    </div>
    <van-swipe
      class="swiper"
      indicator-color="white"
      width="118"
      :show-indicators="false"
      :loop="false"
    >
      <div v-for="(item, index) in list" :key="index">
        <van-swipe-item class="swiper-item" v-if="index < 6">
          <router-link :to="{ path: '/playlist', query: { id: item.id } }">
            <div class="box" :data-id="item.id">
              <img class="image" :src="item.picUrl" />
              <span class="text">{{ item.name }}</span>
              <div class="count">
                <span class="iconfont">&#xe656;</span>
                <span>{{ item.playCount }}</span>
              </div>
            </div>
          </router-link>
        </van-swipe-item>
      </div>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "whirligig",
  props: {
    list: {
      type: Array,
      value: [],
    },
  },
  data: function () {
    return {};
  },
  mounted: function () {
    const that = this;
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
.container {
  padding-bottom: 0.2rem;
  border-bottom: 0.15rem solid #eee;
  .header {
    margin: 0.2rem 0.2rem 0;
    @include flexSpaceBetween;
    .title {
      font-size: 0.3rem;
      font-weight: bold;
      @include omit;
    }
    .more {
      flex-shrink: 0;
      font-size: 0.2rem;
      font-weight: bold;
      margin-left: 0.2rem;
      padding: 0.1rem 0.2rem;
      border: 1px solid #eee;
      border-radius: 2rem;
    }
  }
  .swiper {
    .swiper-item {
      margin-top: 0.3rem;
      padding-left: 0.2rem;
      box-sizing: border-box;
      .box {
        position: relative;
        .image {
          width: 100%;
          border-radius: 0.2rem;
          margin-bottom: 0.1rem;
          background-color: $gray;
        }
        .text {
          line-height: 0.3rem;
          font-size: 0.2rem;
          color: #333;
        }
        .count {
          color: #fff;
          font-size: 0.2rem;
          background-color: rgba(0, 0, 0, 0.5);
          padding: 0.05rem 0.1rem;
          border-radius: 1rem;
          position: absolute;
          right: 0.15rem;
          top: 0.15rem;
          @include flexCenter;
          .iconfont {
            font-size: 0.1rem;
          }
        }
        &:after {
          content: "";
          width: 2rem;
          padding-bottom: 2rem;
          margin: -0.1rem auto;
          background-color: $gray;
          border-radius: 0.1rem;
          z-index: -1;
          position: absolute;
          right: 0;
          left: 0;
          top: 0;
        }
      }
    }
  }
}
</style>