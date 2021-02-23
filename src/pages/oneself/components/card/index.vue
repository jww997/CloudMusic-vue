<template>
  <div class="children">
    <div
      class="backgroundUrl"
      :style="{ backgroundImage: 'url(' + profile.backgroundUrl + ')' }"
    >
      <!-- <img class="image" :src="profile.backgroundUrl" /> -->
    </div>
    <div class="box">
      <div class="avatarUrl">
        <img :src="profile.avatarUrl" />
      </div>
      <div class="nickname">{{ profile.nickname }}</div>
      <div class="status">
        <div class="follows">
          <span>{{ profile.follows }}</span>
          <span class="text">关注</span>
        </div>
        <div class="followeds">
          <span>{{ profile.followeds }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="level" v-if="level">Lv.{{ level }}</div>
      </div>
      <div class="signature">{{ profile.signature }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  props: {
    level: {
      type: Number,
      default: 0,
    },
    profile: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.children {
  .backgroundUrl {
    height: 7rem;
    border-radius: 0 0 3rem 3rem/0.15rem;
    background: no-repeat center $theme-GRAY;
    background-size: cover;
  }
  .box {
    padding: $text-M;
    margin: -$text-M $text-XS $text-M;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 5px 5px #eee;
    @include flexCenter;
    flex-direction: column;
    .avatarUrl {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      overflow: hidden;
      border: 3px solid #fff;
      margin-top: -1.5rem;
      img {
        width: inherit;
      }
    }
    .nickname,
    .status,
    .signature {
      margin-top: $text-XXS;
    }
    .nickname {
      font-size: $text-M;
      font-weight: bold;
    }
    .status {
      font-size: $text-XS;
      @include flexCenter;
      .follows,
      .followeds,
      .level {
        margin: 0 $text-XXS;
        .text {
          color: $theme-GRAY;
        }
      }
    }
    .signature {
      font-size: $text-XS;
      color: $theme-GRAY;
    }
  }
}
</style>