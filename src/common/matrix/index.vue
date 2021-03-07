<template>
  <div class="common">
    <scroll
      class="scroll"
      :data="list"
      :probeType="1"
      :pullup="true"
      :click="true"
      @scrollToEnd="scrollToEnd"
    >
      <div class="boxs" v-if="list">
        <div
          class="box"
          v-for="(item, index) in list"
          :key="index"
          @click="toPages({ name: destination, params: { id: item.id } })"
        >
          <cover
            :image="item.coverImgUrl"
            :name="item.name"
            :count="item.playCount"
          ></cover>
        </div>
      </div>
    </scroll>
    <!-- <van-loading class="loading" size="20">加载中...</van-loading> -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { toPages } from "@/assets/js/util.js";

import Scroll from "@/base/scroll";
import Cover from "@/components/cover";

export default {
  name: "ranking",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    destination: {
      type: String,
      default: "",
    },
  },
  components: {
    Scroll,
    Cover,
  },
  methods: {
    toPages,
    scrollToEnd: function () {
      const that = this;
      that.$emit("scrollToEnd");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.common {
  height: 100%;
  .scroll {
    height: 100%;
    .boxs {
      padding: 0 $text-XS $safeDistance;
      @include flexCenter;
      justify-content: flex-start;
      flex-wrap: wrap;

      .box {
        width: 31.5%;
        margin-right: 2%;
        margin-top: $text-XS;
        &:nth-child(3n) {
          margin-right: 0;
        }
        & >>> .text {
          height: 1rem;
        }
      }
    }
  }
  .loading {
    margin: $text-M auto;
  }
}
</style>