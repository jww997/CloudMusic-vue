<template>
  <div class="children">
    <div class="header">
      <div class="title">{{ content.uiElement.mainTitle.title }}</div>
      <!-- <div class="more" @click="toPages({ name: 'square' })">
        {{ uielement.button.text }} &gt;
      </div> -->
    </div>
    <van-swipe
      class="swiper"
      indicator-color="white"
      width="355"
      :show-indicators="false"
      :loop="false"
    >
      <div v-for="(item, index) in content.creatives" :key="index">
        <van-swipe-item class="swiper-item">
          <div
            class="resources"
            v-for="(item, index) in item.resources"
            :key="index"
            @click="toggleMusic(item.resourceId, item)"
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
    toggleMusic(id, current) {
      const that = this;
      let music = that.music;
      music.current = current;
      music.currentIndex = 0;
      music.currentList = [current];
      that.setMusic(music);
      that.getMusic(id);
    },
    ...mapMutations({
      setMusic: "SET_MUSIC",
    }),
    ...mapActions(["getMusic"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.children {
  padding: $text-XXXS 0;
  border-top: 0.15rem solid #eee;
  .header {
    margin: 0.2rem 0.2rem 0.15rem;
    @include flexSpaceBetween;
    .title {
      line-height: $text-XL;
      font-size: $text-M;
      font-weight: bold;
      @include omit;
    }
    .more {
      flex-shrink: 0;
      line-height: $text-L;
      font-size: $text-XS;
      font-weight: bold;
      margin-left: 0.2rem;
      padding: 0 0.3rem;
      border: 1px solid #eee;
      border-radius: 2rem;
      @include flexCenter;
    }
  }
  // .swiper-item {
  //   padding-left: 0.3rem;
  //   box-sizing: border-box;
  // }
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
      border-radius: $text-XXS;
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