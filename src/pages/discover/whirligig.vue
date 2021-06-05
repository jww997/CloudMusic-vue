<template>
  <div class="whirligig">
    <!-- <van-skeleton title animate :row="1" /> -->
    <block :block="block">
      <slide :list="list" @handleClick="toSonglist">
        123
        <!-- <cover
          :image="item.uiElement.image.imageUrl"
          :name="item.uiElement.mainTitle.title"
          :count="item.resources[0].resourceExtInfo.playCount"
        ></cover> -->
      </slide>
    </block>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { formatUnit } from "@/assets/js/filter";
import { toPages } from "@/assets/js/util.js";
import Cover from "@/components/cover";
import Block from "./components/block";
import Slide from "./components/slide";

export default {
  name: "whirligig",
  components: {
    Cover,

    Block,
    Slide,
  },
  props: ["block"],
  computed: {
    list() {
      try {
        const { creatives } = this.$props.block;
        return creatives;
      } catch (err) {
        return [];
      }
    },
  },
  methods: {
    formatUnit,

    toSonglist: function (value) {
      const that = this;
      toPages.call(that, {
        name: "playlist",
        params: { id: value.creativeId },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
</style>
