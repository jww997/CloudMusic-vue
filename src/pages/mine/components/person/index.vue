<template>
  <div class="children">
    <img class="portrait" :src="status.avatarUrl" :alt="status.nickname" />
    <div class="description">
      <div class="name">{{ status.nickname }}</div>
      <div>
        <div class="level">Lv.{{ level.level }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "person",
  props: {
    status: {
      type: Object,
      default: () => {
        return {};
      },
    },
    level: {
      type: Object,
      default: () => {
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
  padding: 0.3rem;
  @include flexCenter;
  justify-content: flex-start;
  .portrait {
    width: 1rem;
    border-radius: 50%;
  }
  .description {
    margin-left: 0.2rem;
    @include flexCenter;
    flex-direction: column;
    align-items: flex-start;
    .name {
      font-size: 0.3rem;
      font-weight: bold;
    }
    .level {
      height: 0.3rem;
      line-height: 0.3rem;
      margin-top: 0.1rem;
      padding: 0 0.15rem;
      font-size: 0.25rem;

      border-radius: 0.5rem;
      background-color: #fff;
    }
  }
}
</style>