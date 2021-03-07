<template>
  <div class="common">
    <van-pull-refresh
      v-model="isLoading"
      :head-height="headHeight"
      @refresh="refresh"
    >
      <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
      <template #pulling="props">
        <img
          class="doge"
          :src="pulling"
          :style="{ transform: `scale(${props.distance / headHeight})` }"
        />
      </template>
      <!-- 释放提示 -->
      <template #loosing>
        <img class="doge" :src="loosing" />
      </template>
      <!-- 加载提示 -->
      <template #loading>
        <img class="doge" :src="loading" />
      </template>

      <slot></slot>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: "refresh",
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      headHeight: 80,
      pulling: "https://img01.yzcdn.cn/vant/doge.png",
      loosing: "https://img01.yzcdn.cn/vant/doge.png",
      loading: "https://img01.yzcdn.cn/vant/doge-fire.jpg",
    };
  },
  methods: {
    refresh() {
      const that = this;
      that.$emit("refresh");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.common {
  .doge {
    width: 140px;
    height: 72px;
    margin-top: 8px;
    border-radius: 4px;
  }
}
</style>