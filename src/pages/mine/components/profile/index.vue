<template>
  <div class="children" :data-id="profile.userId">
    <div>
      <img class="portrait" :src="profile.avatarUrl" />
    </div>
    <div class="name">
      <div class="nickname">{{ profile.nickname }}</div>
      <div class="level">Lv.{{ level.level }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "profile",
  props: {
    profile: {
      type: Object,
      default: function () {
        return {};
      },
    },
    level: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
.children {
  padding: 0.2rem 0.3rem;
  @include flexCenter;
  justify-content: flex-start;
  .portrait {
    width: 1.5rem;
    border-radius: 50%;
  }
  .name {
    margin-left: 0.2rem;
    .nickname {
      font-size: 0.3rem;
      font-weight: bold;
    }
  }
}
</style>