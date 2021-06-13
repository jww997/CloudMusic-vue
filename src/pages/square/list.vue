<template>
  <div class="list">
    <van-row>
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
  </div>
</template>

<script>
import { toPages } from "@/assets/js/util.js";
import Playlist from "../discover/components/playlist";

export default {
  name: "list",
  props: ["list"],
  components: {
    Playlist,
  },
  methods: {
    toPlaylist(value) {
      toPages.call(this, {
        name: "playlist",
        params: { id: value },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.list {
  padding-right: $padding-sm;
  .playlist {
    height: 5rem;
    margin-left: $padding-sm;
  }
}
</style>