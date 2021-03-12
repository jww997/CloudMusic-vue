<template>
  <div class="children">
    <div class="header">
      <div class="title">热搜榜</div>
    </div>
    <div class="words">
      <div
        :class="{ word: true, special: index < 3 }"
        v-for="(item, index) in list"
        :key="index"
        @click="getSearch(item.searchWord)"
      >
        <span
          :class="{
            subscript: true,
          }"
          >{{ index + 1 }}</span
        >
        <!-- special: index < 3, -->
        <span class="title">{{ item.searchWord }}</span>
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
  methods: {
    getSearch(val) {
      const that = this;
      that.$emit("getSearch", val);
    },
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
  .header {
    margin: $text-XS $text-XS 0;
    @include flexSpaceBetween;
    border-bottom: 1px solid $theme-LIGHTGRAY;
    .title {
      line-height: $text-XL;
      font-size: $text-S;
      font-weight: bold;
      @include omit;
    }
    .more {
      flex-shrink: 0;
      line-height: $text-L;
      font-size: $text-XS;
      font-weight: bold;
      margin-left: 0.2rem;
      padding: 0 0.3rem;
      border: 1px solid #eee;
      border-radius: 2rem;
      @include flexCenter;
    }
  }
  .words {
    @include flexCenter;
    flex-wrap: wrap;
    justify-content: flex-start;
    .word {
      width: 50%;
      line-height: $text-M;
      font-size: $text-S;
      margin-top: $text-S;
      padding: 0 $text-XS;
      box-sizing: border-box;
      @include flexCenter;
      justify-content: flex-start;
      .subscript,
      .icon {
        flex-shrink: 0;
      }
      .subscript {
        width: $text-XL;
        color: $theme-GRAY;
      }
      .title {
        @include omit;
      }
      &.special {
        .subscript {
          color: $theme-RED;
        }
        .title {
          font-weight: bold;
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