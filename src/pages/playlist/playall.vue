<template>
  <div class="playall" @click="toggleMusic(list[0].id, 0)">
    <!-- 播放按钮 -->
    <van-icon class="playcircle" name="play-circle" />
    <!-- 中间文本 -->
    <div class="text">
      <span>播放全部</span>
      <span v-if="list.length">({{ list.length }})</span>
    </div>
    <!-- 多选 -->
    <van-icon class="certificate" name="certificate" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { toPages } from "@/assets/js/util.js";

export default {
  name: "playall",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    sorttype: {
      type: String,
      default: "1",
    },
    allTop: {
      type: String,
      default: "0",
    },
  },
  computed: {
    id() {
      const that = this;
      return that.music.id;
    },
    ...mapGetters(["music", "mv"]),
  },
  watch: {
    id(val, oldVal) {
      const that = this;
      let currentList = that.music.currentList;
      let currentIndex = that.music.currentIndex;
      if (!currentList.length) return false;
      let current = currentList[currentIndex];
      that.amendStateObjValue({ key: "current", value: current });
      that.amendStateObjValue({ key: "currentIndex", value: currentIndex });
    },
  },
  methods: {
    mouseenter: function (index) {
      const that = this;
    },
    mouseleave: function (index) {
      const that = this;
    },

    toggleMusic(id, index) {
      const that = this;
      that.amendStateObjValue({ key: "currentIndex", value: -1 });
      if (that.music.id == id) {
        toPages({ name: "player" });
      } else {
        that.amendStateObjValue({ key: "id", value: id });
        that.amendStateObjValue({ key: "currentList", value: that.list });
        that.amendStateObjValue({ key: "currentIndex", value: index });
      }
    },
    toggleMv: function (id) {
      const that = this;
      toPages({ name: "mv" });
      that.amendStateObjValue({ name: "mv", key: "id", value: id });
      // that.amendStateObjValue({ name: "mv", key: "isShow", value: true });
    },
    ...mapActions(["amendStateObjValue"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.playall {
  height: 50px;
  padding: 0 $padding-sm;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .playcircle,
  .certificate {
    width: 0.6rem;
    text-align: center;
    font-size: $font-size-lg * 1.5;
  }
  .playcircle {
    color: $theme-color;
  }
  .text {
    flex-grow: 1;
    margin-left: $padding-sm;
    font-size: $font-size-lg;
  }
}
</style>