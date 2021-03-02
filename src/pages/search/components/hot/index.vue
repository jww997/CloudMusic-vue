<template>
  <div class="children">
    <div class="title">热搜榜</div>
    <div class="words">
      <div class="word" v-for="(item, index) in list" :key="item.score">
        <span
          :class="{
            subscript: true,
            special: index < 3,
          }"
          >{{ index + 1 }}</span
        >
        <span>{{ item.searchWord }}</span>
        <img class="icon" :src="item.iconUrl" v-if="item.iconUrl" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hot",
  data() {
    return { list: [] };
  },
  mounted() {
    const that = this;
    that.$api.getSearchHotDetail().then((res) => {
      that.list = res.data.data;
    });
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.children {
  .words {
    @include flexCenter;
    flex-wrap: wrap;
    justify-content: flex-start;
    .word {
      width: 50%;
      font-size: $text-S;
      margin-top: $text-S;
      padding: 0 $text-XS;
      box-sizing: border-box;
      @include flexCenter;
      justify-content: flex-start;
      .subscript {
        width: $text-XL;
        color: $theme-GRAY;
        &.special {
          color: $theme-RED;
        }
      }
      .icon {
        margin-left: $text-XXS;
        height: $text-S;
      }
    }
  }
}
</style>