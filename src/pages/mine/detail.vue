<template>
  <div class="detail">
    <van-image
      class="avatar"
      :src="profile.avatarUrl"
      v-lazy="profile.avatarUrl"
    />
    <div class="text">
      <p class="nickname">{{ profile.nickname }}</p>
      <p>
        <span class="level">Lv.{{ level }}</span>
      </p>
    </div>
    <van-icon class="arrow" name="arrow" />
  </div>
</template>

<script>
export default {
  name: "detail",
  props: ["detail"],
  computed: {
    profile() {
      return this.$props.detail.profile || {};
    },
    level() {
      return this.$props.detail.level || 0;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.detail {
  padding: 0 $padding-sm;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .avatar,
  .arrow {
    flex-shrink: 0;
  }
  .avatar {
    width: 1.5rem;
    border-radius: $border-radius-max;
    overflow: hidden;
  }
  .text {
    flex-grow: 1;
    line-height: $line-height-lg;
    margin-left: $padding-sm;
    font-size: $font-size-md;
    .nickname {
      font-weight: bold;
    }
    .level {
      padding: 0 $padding-xs;
      background-color: $white;
      border-radius: $border-radius-max;
    }
  }
  .arrow {
    font-size: $font-size-lg;
  }
}
</style>
