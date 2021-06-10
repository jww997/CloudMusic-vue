<template>
  <div class="detail2">
    <!-- 视频进度条 -->
    <div class="slider">
      <van-slider
        step="1"
        button-size="10px"
        active-color="#f00"
        inactive-color="#494949"
        v-model="percentage"
        @input="togglePercentage"
      />
    </div>
    <!-- 视频名称 -->
    <div class="videoName">
      <van-icon
        class="like"
        name="like"
        size="22"
        color="#ee0a24"
        v-if="liked"
      />
      <van-icon class="like" name="like-o" size="22" v-else />
      <span class="text">{{ info.name }}- {{ info.artistName }}</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "detail2",
  props: ["info", "liked"],
  data: function () {
    return {
      // isLike: true,
      isShowDesc: false,

      percentage: 0,
    };
  },
  computed: {
    currentTime() {
      const that = this;
      return that.mv.currentTime;
    },
    ...mapState(["mv"]),
  },
  watch: {
    currentTime(newVal, oldVal) {
      const that = this;
      that.percentage = Number.parseFloat(newVal / that.mv.duration) * 100;
    },
  },
  methods: {
    togglePercentage: function (val) {
      const that = this;
      that.amendStateObjValue({ name: "mv", key: "isDraging", value: true });
      that.amendStateObjValue({
        name: "mv",
        key: "currentTime",
        value: that.mv.duration * (val / 100),
      }); // 根据选中百分比修改进度条
    },

    ...mapActions(["amendStateObjValue"]),
  },
};
</script>


<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.detail2 {
  height: 100px;
  padding: $padding-sm $padding-sm $padding-sm * 2;
  box-sizing: border-box;
  font-size: $font-size-sm;
  @include positionCenter;
  top: auto;
  display: flex;
  flex-direction: column;
  .slider,
  .videoName {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .videoName {
    .text {
      font-size: $font-size-lg;
      margin-left: $padding-sm;
    }
  }
}
</style>