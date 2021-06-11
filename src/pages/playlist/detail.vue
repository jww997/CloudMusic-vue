<template>
  <div
    :class="{ detail: true, official: isOfficial }"
    :style="{ backgroundImage: `url(${playlist.backgroundCoverUrl})` }"
  >
    <!-- 顶部导航栏 -->
    <navbar title="歌单" />
    <!-- 歌单信息详情 -->
    <div class="header" @click="$emit('handleHeaderClick')">
      <template v-if="!isOfficial">
        <playlist
          width="120"
          fit="contain"
          :image="playlist.coverImgUrl"
          :count="playlist.playCount"
        />
        <div class="text">
          <div class="name">{{ playlist.name }}</div>
          <div class="creator" v-if="playlist.creator">
            <van-image
              width="30"
              :round="true"
              :src="playlist.creator.avatarUrl"
              v-lazy="playlist.creator.avatarUrl"
            />
            <span class="nickname">{{ playlist.creator.nickname }}</span>
          </div>
          <div class="signature" v-if="playlist.creator">
            {{ playlist.creator.signature }}
          </div>
        </div>
      </template>
      <template v-else>
        <van-image
          height="40"
          fit="contain"
          :src="playlist.titleImageUrl"
          v-lazy="playlist.titleImageUrl"
        />
        <p class="updateFrequency">{{ playlist.updateFrequency }}</p>
      </template>
    </div>
    <!-- 收藏/评论/分享 -->
    <div class="pill">
      <div
        class="pill-item"
        v-for="({ id, name, count, icon }, index) in pill"
        :key="id"
      >
        <span class="line" v-if="index"></span>
        <span class="iconfont" v-html="icon"></span>
        <span class="text">{{ count ? count : name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Playlist from "../discover/components/playlist.vue";

export default {
  name: "Cap",
  components: {
    Navbar,
    Playlist,
  },
  props: ["playlist", "pill"],
  computed: {
    isOfficial() {
      const { titleImageUrl } = this.$props.playlist;
      return titleImageUrl;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.detail {
  height: 6rem;
  margin-bottom: 1rem;
  border-radius: 0 0 40rem 40rem / 1rem;
  background-color: $background-color-dark;
  transition: $animation-duration-base;
  position: relative;
  .header {
    padding: 0 $padding-sm;
    color: $white;
    display: flex;
    align-items: center;
    .text {
      margin-left: $padding-sm;
      line-height: $line-height-sm;
      .creator,
      .signature {
        margin-top: $padding-xs;
      }
      .name {
        font-size: $font-size-lg;
        font-weight: $font-weight-bold;
        @include omitS;
      }
      .creator {
        display: flex;
        align-items: center;
        .nickname {
          font-size: $font-size-md;
          margin-left: $padding-xs;
        }
      }
      .signature {
        max-height: 1rem;
        font-size: $font-size-sm;
        @include omitS;
      }
    }
  }
  .pill {
    height: 1.5rem;
    line-height: 1.5rem;
    margin: 0 auto;
    border-radius: 2rem;
    font-size: $font-size-md;
    background-color: $white;
    box-shadow: 0 5px 10px 0 $background-color;
    position: absolute;
    bottom: -$padding-lg;
    right: $padding-lg;
    left: $padding-lg;
    @include flexCenter;

    .pill-item {
      flex: 1;
      text-align: center;
      position: relative;
      .line {
        display: inline-block;
        width: $border-width-base;
        height: $padding-lg;
        background-color: $border-color;
        @include positionCenter;
        right: auto;
        :last-child {
          display: none;
        }
      }
      .text {
        margin-left: $padding-base;
      }
    }
  }
  &.official {
    height: 10rem;
    background: center no-repeat;
    background-size: cover;
    .header {
      height: 6rem;
      flex-direction: column;
      justify-content: center;
      .updateFrequency {
        font-size: $font-size-lg;
        margin-top: $padding-xs;
      }
    }
  }
}
</style>