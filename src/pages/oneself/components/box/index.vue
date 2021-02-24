<template>
  <div class="children">
    <div class="title">
      <div class="left">创建的歌单</div>
      <div class="right">({{ playlist.length }}个)</div>
    </div>
    <div
      class="songlist"
      v-for="(item, index) in playlist"
      :key="index"
      @click.stop="toPages({ name: 'playlist', params: { id: item.id } })"
    >
      <img class="cover" :src="item.coverImgUrl" />
      <div class="right">
        <div class="name">{{ item.name }}</div>
        <div class="subtitle">
          {{ item.trackCount }}首，播放{{ item.playCount }}次
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toPages } from "@/assets/js/skip.js";
export default {
  name: "box",
  props: { playlist: { type: Array, default: () => [] } },
  methods: {
    toPages,
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.children {
  margin: $text-XS;
  padding: $text-XS;
  border-radius: $text-S;
  box-sizing: border-box;
  background-color: #fff;
  .title {
    padding: $text-XS 0;
    @include flexCenter;
    justify-content: flex-start;
    .left,
    .right {
      @include omit;
    }
    .left {
      flex-shrink: 0;
      max-width: 50%;
      font-size: $text-M;
      font-weight: bold;
    }
    .right {
      margin-left: $text-XXS;
      font-size: $text-XS;
      color: $theme-GRAY;
    }
  }
  .songlist {
    position: relative;
    padding-left: 1.8rem;
    box-sizing: border-box;
    .cover {
      width: 1.5rem;
      border-radius: $text-XXS;
      // position: absolute;
      @include positionCenter;
      right: auto;
    }
    .right {
      height: 1.8rem;
      @include flexCenter;
      flex-direction: column;
      align-items: flex-start;
      .name,
      .subtitle {
        width: 100%;
        @include omit;
      }
      .name {
        font-size: $text-S;
      }
      .subtitle {
        margin-top: $text-XXS;
        font-size: $text-XS;
        color: $theme-GRAY;
      }
    }
  }
}
</style>