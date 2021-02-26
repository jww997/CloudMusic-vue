<template>
  <div class="children">
    <van-swipe
      class="swiper"
      indicator-color="white"
      width="350"
      :show-indicators="false"
      :loop="false"
    >
      <div v-for="(item, index) in content.creatives" :key="index">
        <van-swipe-item class="swiper-item">
          <div
            class="resources"
            v-for="(item, index) in item.resources"
            :key="index"
          >
            <!-- @click.stop="
              toPages({ name: 'playlist', params: { id: item.resourceId } })
            " -->
            <img class="image" :src="item.uiElement.image.imageUrl" />
            <div class="right">
              <div class="mainTitle">
                {{ item.uiElement.mainTitle.title }}
              </div>
              <div class="subTitle">
                {{ item.uiElement.subTitle.title }}
              </div>
            </div>
          </div>
        </van-swipe-item>
      </div>
    </van-swipe>
  </div>
</template>

<script>
import { toPages } from "@/assets/js/util.js";
export default {
  name: "slideSonglistAlign",
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    toPages,
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.children {
  padding: $text-S 0;
  border-top: 0.15rem solid #eee;
  .resources {
    height: 1.5rem;
    margin-top: $text-XS;
    box-sizing: border-box;
    position: relative;
    padding-left: $text-XS + 1.8rem;
    padding-right: $text-S;
    .image {
      width: 1.5rem;
      border-radius: 0.2rem;
      @include positionCenter;
      left: $text-XS;
      right: auto;
    }
    .right {
      height: 100%;
      @include flexCenter;
      flex-direction: column;
      align-items: flex-start;
      .mainTitle {
        font-size: $text-S;
      }
      .subTitle {
        margin-top: $text-XXS;
        font-size: $text-XXS;
      }
    }
  }
}
</style>