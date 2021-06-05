<template>
  <div class="songlist">
    <div
      class="resources"
      v-for="item in list"
      :key="item.resourceId"
      @click="$emit('handleClick', item, item.resourceId)"
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
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "songlist",
  props: ["list"],
  computed: {
    ...mapState(["music"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.songlist {
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