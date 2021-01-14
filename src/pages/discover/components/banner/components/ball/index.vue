<template>
  <div class="grandson">
    <van-swipe class="swiper" width="50" :loop="false" :show-indicators="false">
      <van-swipe-item
        class="swiper-item"
        v-for="(item, index) in list"
        :key="index"
      >
        <router-link :to="{ name: setToName(item.id) }">
          <div class="item">
            <!-- <div class="iconfont" v-html="item.icon"></div> -->
            <div
              class="icon"
              :style="{
                backgroundImage: 'url(' + item.iconUrl + ')',
              }"
              :alt="item.name"
            >
              <!-- webkitMask: 'url(' + item.iconUrl + ')' -->
              <!-- <img :src="item.iconUrl" :alt="item.name" /> -->
            </div>
            <span class="text">{{ item.name }}</span>
          </div>
        </router-link>
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
  methods: {
    setToName(id) {
      let name;
      switch (id) {
        case -1:
          name = "dailyspecial";
          break;
        case -2:
          name = "square";
          break;
        case -3:
          name = "";
          break;
        case -6:
          name = "";
          break;
      }
      return name;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.grandson {
  padding: 0.3rem 0;
  margin-top: 0.3rem;
  .swiper-item {
    padding-left: 0.35rem;
    .item {
      width: 100%;
      @include flexCenter;
      flex-direction: column;
      .icon {
        width: 1rem;
        height: 1rem;
        position: relative;
        margin-bottom: 0.2rem;
        border-radius: 50%;
        overflow: hidden;

        // filter: invert(100%);
        // background: #f00 no-repeat center;
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
        font-size: $text-XS;
        color: #000;
      }
    }
  }
}
</style>
