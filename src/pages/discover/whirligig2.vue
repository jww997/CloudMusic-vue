<template>
  <div class="whirligig2">
    <block :block="block">
      <van-swipe
        class="swiper"
        indicator-color="white"
        width="355"
        :show-indicators="false"
        :loop="false"
      >
        <div v-for="(item, index) in list" :key="index">
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
    </block>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { toPages } from "@/assets/js/util.js";
import Block from "./components/block.vue";
export default {
  name: "slideSonglistAlign",
  props: ["block"],
  components: {
    Block,
  },
  computed: {
    list() {
      try {
        const { creatives } = this.$props.block;
        return creatives;
      } catch (err) {
        return [];
      }
    },
    ...mapState(["music"]),
  },
  methods: {
    toPages,
    toggleMusic(id, current) {
      const that = this;
      if (that.music.id != id) {
        that.amendStateObjValue({ key: "id", value: id });
        that.amendStateObjValue({ key: "current", value: current });
        that.amendStateObjValue({ key: "currentIndex", value: 0 });
        that.amendStateObjValue({ key: "currentList", value: [current] });
      }
      that.amendStateObjValue({
        key: "isPlaying",
        value: !that.music.isPlaying,
      });
    },
    ...mapActions(["amendStateObjValue"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.whirligig2 {
  padding: $text-XXXS 0;
  border-top: 0.15rem solid #eee;

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
    &:first-child {
      margin-top: 0;
    }
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