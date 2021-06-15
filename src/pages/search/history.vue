<template>
  <div class="history">
    <div class="title">历史</div>
    <div
      class="words"
      :class="{
        list: true,
        fadeLeft: fadeType == 1,
        fadeRight: fadeType == 2,
        fadeBoth: fadeType == 3,
      }"
      @scroll="toggleFade"
    >
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
import {
  getLocalStorage,
  setLocalStorage,
  delLocalStorage,
} from "@/assets/js/util.js";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "history",
  // props: {
  //   list: {
  //     type: Array,
  //     default: () => [],
  //   },
  // },
  data() {
    return {
      fadeType: 2, // 1 左边渐变 2 右边渐变 3 同时渐变
    };
  },
  computed: {
    list() {
      const that = this;
      return that.login.history;
    },
    ...mapGetters(["login"]),
  },
  methods: {
    getSearch(val) {
      const that = this;
      that.$emit("getSearch", val);
    },
    clearHistory() {
      const that = this;
      that.$vant.Dialog.confirm({
        message: "是否清空历史记录？",
      }).then(() => {
        that.amendStateObjValue({ name: "login", key: "history", value: [] });
        delLocalStorage("history");
        that.$vant.Toast.success("清空成功");
      });
    },
    toggleFade(event) {
      const that = this;
      let target = event.target;
      let scrollLeft = target.scrollLeft;
      let scrollLeftMax = target.scrollWidth - target.clientWidth;
      if (scrollLeft == scrollLeftMax) {
        that.fadeType = 1;
      } else if (scrollLeft == 0) {
        that.fadeType = 2;
      } else {
        that.fadeType = 3;
      }
    },
    ...mapActions(["amendStateObjValue"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.history {
  padding: $padding-sm;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title,
  .delete,
  .keywords {
    flex-shrink: 0;
  }
  .title {
    font-size: $font-size-lg;
    font-weight: bold;
  }
  .words {
    flex-grow: 1;
    margin: 0 $padding-sm;
    display: flex;
    overflow-y: scroll;
    &.fadeLeft {
      -webkit-mask-image: linear-gradient(to right, transparent, $white 10%);
      mask-image: linear-gradient(to right, transparent, $white 10%);
    }
    &.fadeRight {
      -webkit-mask-image: linear-gradient(to right, $white 90%, transparent);
      mask-image: linear-gradient(to right, $white 90%, transparent);
    }
    &.fadeBoth {
      -webkit-mask-image: linear-gradient(
        to right,
        transparent,
        $white 10%,
        $white 90%,
        transparent
      );
      mask-image: linear-gradient(
        to right,
        transparent,
        $white 10%,
        $white 90%,
        transparent
      );
    }
    .keywords {
      margin-left: $padding-sm;
      padding: $padding-xs $padding-sm;
      background-color: $background-color;
      border-radius: $border-radius-max;
      font-size: $font-size-sm;
      &:first-child {
        margin-left: 0;
      }
    }
  }
}
</style>