<template>
  <div class="whirligig2">
    <block :block="block">
      <slide :width="355" :list="list">
        <template slot="box" slot-scope="{ item }">
          <songlist :list="item && item.resources" @handleClick="toggleMusic" />
        </template>
      </slide>
    </block>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Block from "./components/block.vue";
import Slide from "./components/slide.vue";
import Songlist from "./components/songlist.vue";

export default {
  name: "whirligig2",
  props: ["block"],
  components: {
    Block,
    Slide,
    Songlist,
  },
  computed: {
    list() {
      try {
        const { creatives } = this.$props.block;
        return creatives;
      } catch (err) {
        return [];
      }
    },
    ...mapState(["music"]),
  },
  methods: {
    toggleMusic(current, id) {
      console.log(1);
      const that = this;
      if (that.music.id != id) {
        that.amendStateObjValue({ key: "id", value: id });
        that.amendStateObjValue({ key: "current", value: current });
        that.amendStateObjValue({ key: "currentIndex", value: 0 });
        that.amendStateObjValue({
          key: "currentList",
          value: [current],
        });
      }
      that.amendStateObjValue({
        key: "isPlaying",
        value: !that.music.isPlaying,
      });
    },
    ...mapActions(["amendStateObjValue"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
</style>