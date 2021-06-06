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
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.songlist {
  .resources {
    height: 1.8rem;
    padding: $padding-sm $padding-sm 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .left {
      flex-shrink: 0;
      width: 1.2rem;
      height: 1.2rem;
      border-radius: $border-radius-lg;
      position: relative;
      overflow: hidden;
      .image {
        width: inherit;
      }
      .icon {
        @include positionCenter;
        @include flexCenter;
        font-size: $font-size-lg;
        opacity: $active-opacity;
        color: $white;
      }
    }
    .right {
      flex-grow: 1;
      height: 100%;
      line-height: $line-height-sm;
      border-top: $border-width-base solid $border-color;
      margin-left: $padding-xs;
      @include flexCenter;
      flex-direction: column;
      align-items: flex-start;
      .mainTitle {
        font-size: $font-size-lg;
      }
      .subTitle {
        font-size: $font-size-xs;
        color: $gray-6;
      }
    }
    &:first-child .right {
      border: none;
    }
  }
}
</style>