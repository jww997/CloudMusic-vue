<template>
  <div class="fullscreen" @click="$emit('close')">
    <playlist
      :width="200"
      :image="playlist.coverImgUrl"
      @handleClick="imagePreview"
    />
    <p class="name">{{ playlist.name }}</p>
    <div class="tags">
      <span>标签:</span>
      <span class="tag" v-for="(item, index) in playlist.tags" :key="index">
        {{ item }}
      </span>
    </div>
    <div class="description">{{ playlist.description }}</div>
    <van-icon class="close" name="cross" />
    <button class="save">保存封面</button>
  </div>
</template>

<script>
import Playlist from "../discover/components/playlist";

export default {
  name: "fullscreen",
  props: ["playlist"],
  components: {
    Playlist,
  },
  methods: {
    imagePreview() {
      const that = this;
      let image = that.playlist.coverImgUrl;
      that.$vant.ImagePreview([image]);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.fullscreen {
  width: 100vw;
  height: 100vh;
  padding: $padding-lg * 3 $padding-sm;
  box-sizing: border-box;
  background-color: $background-color-dark;
  overflow: scroll;
  color: $white;
  z-index: 200;
  position: fixed;
  left: 0;
  top: 0;
  @include flexCenter;
  flex-direction: column;
  .name,
  .tags,
  .description {
    width: 95%;
    margin-top: $padding-md;
  }
  .name {
    text-align: center;
    font-size: $font-size-lg * 1.2;
    font-weight: bold;
    @include omit;
  }
  .tags {
    display: flex;
    align-items: center;
    font-size: $font-size-lg;
    .tag {
      font-size: $font-size-sm;
      margin-left: $padding-sm;
      padding: $padding-base $padding-xs;
      border: $border-width-base solid $border-color;
      border-radius: $border-radius-max;
    }
  }
  .description {
    font-size: $font-size-md;
    line-height: $line-height-md;
    @include omitS;
    @include linefeed;
    -webkit-line-clamp: 10;
    line-clamp: 10;
  }
  .close {
    font-size: $font-size-lg * 3;
    position: absolute;
    right: $padding-sm;
    top: $padding-sm;
  }
  .save {
    font-size: $font-size-lg * 1.2;
    padding: $padding-sm $padding-md;
    background-color: transparent;
    border: $border-width-base solid $border-color;
    border-radius: $border-radius-max;
    @include positionCenter;
    bottom: $padding-lg;
    top: auto;
  }
}
</style>