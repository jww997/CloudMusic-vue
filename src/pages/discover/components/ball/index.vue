<template>
  <div class="container">
    <van-swipe class="swiper" width="50" :loop="false" :show-indicators="false">
      <van-swipe-item
        class="swiper-item"
        v-for="(item, index) in list"
        :key="index"
      >
        <!-- <router-link :to="item.to && item.to"> -->
        <div class="item">
          <!-- <div class="iconfont" v-html="item.icon"></div> -->
          <div
            class="icon"
            :style="{ webkitMask: 'url(' + item.iconUrl + ')' }"
            :alt="item.name"
          >
            <!-- <img :src="item.iconUrl" :alt="item.name" /> -->
          </div>
          <span class="text">{{ item.name }}</span>
        </div>
        <!-- </router-link> -->
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "list",
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  data: function () {
    return {
      // list: [
      //   {
      //     icon: "&#xe603;",
      //     text: "每日推荐",
      //     to: "",
      //   },
      //   // {
      //   //   icon: "&#xe634;",
      //   //   text: "私人FM",
      //   //   to: "",
      //   // },
      //   {
      //     icon: "&#xe602;",
      //     text: "歌单",
      //     to: "",
      //   },
      //   {
      //     icon: "&#xe604;",
      //     text: "排行榜",
      //     to: "/ranking",
      //   },
      // ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
.container {
  height: 1.5rem;
  margin-top: 0.3rem;
  .swiper-item {
    // padding: 0 0.2rem;
    padding-left: 0.2rem;
    .item {
      width: 100%;
      @include flexCenter;
      flex-direction: column;
      .icon {
        width: 0.8rem;
        height: 0.8rem;
        position: relative;
        margin-bottom: 0.2rem;
        border-radius: 50%;
        overflow: hidden;

        filter: invert(100%);
        background: #f00 no-repeat center;
        background-size: cover;

        &::after {
          content: "";
          z-index: -1;
          background-color: #ffadba;
          @include positionCenter;
        }

        // mask-image: -webkit-gradient(
        //   linear,
        //   right top,
        //   0 bottom,
        //   from(rgba(0, 0, 255, 0.3)),
        //   to(yellow)
        // );
        // -webkit-mask-image: -webkit-gradient(
        //   linear,
        //   right top,
        //   0 bottom,
        //   from(rgba(0, 0, 255, 0.3)),
        //   to(yellow)
        // );
        // -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
        // background: -moz-linear-gradient(45deg, #003366 30%, #0099cc);
        // background: -webkit-linear-gradient(45deg, #003366 30%, #0099cc);
        // filter: Alpha(Opacity=60);
        // opacity: 0.6;
      }
      .text {
        font-size: 0.2rem;
        color: #000;
      }
    }
  }
}
</style>
