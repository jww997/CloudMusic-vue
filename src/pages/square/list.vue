<template>
  <div class="list">
    <scroll :handleScrollBottom="handleScrollBottom">
      <van-row gutter="12">
        <van-col span="8" v-for="item in list" :key="item.id">
          <playlist
            class="playlist"
            :image="item.coverImgUrl"
            :name="item.name"
            :count="item.playCount"
            @handleClick="toPlaylist(item.id)"
          />
        </van-col>
      </van-row>
    </scroll>
  </div>
</template>

<script>
import { toPages } from "@/assets/js/util.js";
import Playlist from "../discover/components/playlist";
import Scroll from "@/components/scroll";

export default {
  name: "list",
  props: ["list"],
  components: {
    Playlist,
    Scroll,
  },
  methods: {
    toPlaylist(value) {
      toPages.call(this, {
        name: "playlist",
        params: { id: value },
      });
    },
    handleScrollBottom() {
      this.$emit("handleScrollBottom");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.list {
  min-height: 15rem;
  background-color: $white;
  padding: $padding-sm $padding-sm 0;
  .playlist {
    height: 4.5rem;
  }
}
</style>