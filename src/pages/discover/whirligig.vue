<template>
  <div class="whirligig">
    <block :block="block">
      <slide :width="118" :list="list" @handleClick="toSonglist">
        <template slot="box" slot-scope="{ item }">
          <playlist
            class="playlist"
            :image="item.uiElement.image.imageUrl"
            :name="item.uiElement.mainTitle.title"
            :count="item.resources[0].resourceExtInfo.playCount"
          />
        </template>
      </slide>
    </block>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { toPages } from "@/assets/js/util.js";
import Block from "./components/block";
import Slide from "./components/slide";
import playlist from "./components/playlist";

export default {
  name: "whirligig",
  components: {
    Block,
    Slide,
    playlist,
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
    toSonglist: function (value) {
      toPages.call(this, {
        name: "playlist",
        params: { id: value.creativeId },
      });
    },
  },
}; 
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.whirligig {
  .playlist {
    margin-top: $padding-xs;
    margin-left: $padding-sm;
    box-sizing: border-box;
  }
}
</style>
