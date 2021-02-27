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
            @click="getMusic(item.resourceId)"
          >
            <div class="left">
              <img class="image" :src="item.uiElement.image.imageUrl" />
              <van-icon
                class="icon"
                name="pause"
                v-if="music.id == item.resourceId && music.isPlaying"
              />
              <van-icon class="icon" name="play" v-else />
            </div>
            <div class="right">
              <div class="mainTitle">
                {{ item.uiElement.mainTitle.title }}
              </div>
              <div class="subTitle" v-if="item.uiElement.subTitle">
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
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { toPages } from "@/assets/js/util.js";
export default {
  name: "slideSonglistAlign",
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState(["music"]),
  },
  methods: {
    toPages,
    ...mapActions(["getMusic"]),
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
    padding-left: $text-XS + 1.5rem;
    padding-right: $text-S;
    .left {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: $text-XXXS;
      @include positionCenter;
      left: $text-XS;
      right: auto;
      overflow: hidden;
      .image {
        width: inherit;
      }
      .icon {
        @include positionCenter;
        @include flexCenter;
        font-size: $text-L;
        color: $theme-WHITE;
      }
    }
    .right {
      height: 100%;
      border-bottom: 1px solid $theme-LIGHTGRAY;
      @include flexCenter;
      flex-direction: column;
      align-items: flex-start;
      .mainTitle {
        font-size: $text-S;
      }
      .subTitle {
        margin-top: $text-XXS;
        font-size: $text-XS;
      }
    }
  }
}
</style>