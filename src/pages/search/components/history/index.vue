<template>
  <div class="children">
    <div class="title">历史</div>
    <div class="list">
      <div
        class="keywords"
        v-for="(item, index) in list"
        :key="index"
        @click="getSearch(item)"
      >
        {{ item }}
      </div>
    </div>
    <!-- <van-icon name="delete-o" /> -->
    <div class="iconfont clear" @click="clearHistory">&#xe632;</div>
  </div>
</template>

<script>
export default {
  name: "history",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getSearch(val) {
      const that = this;
      that.$emit("getSearch", val);
    },
    clearHistory() {
      const that = this;
      that.$emit("clearHistory");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.children {
  margin: $text-XS $text-XS 0;
  @include flexSpaceBetween;
  .title {
    flex-shrink: 0;
    line-height: $text-XL;
    font-size: $text-S;
    font-weight: bold;
    @include omit;
  }
  .list {
    flex-grow: 1;
    margin: 0 $text-XS;
    display: flex;
    overflow: scroll;
    .keywords {
      flex-shrink: 0;
      padding: 0 $text-XS;
      margin-left: $text-XS;
      background-color: $theme-LIGHTGRAY;
      border-radius: 30px;
      line-height: $text-XL;
      font-size: $text-S;
      &:first-child {
        margin-left: 0;
      }
    }
  }
  .delete {
    flex-shrink: 0;
  }
}
</style>