<template>
  <div class="banner">
    <slide
      :list="list"
      :autoplay="5000"
      :indicatorsColor="'white'"
      @handleClick="toLink"
    >
      <template slot="box" slot-scope="{ item }">
        <div class="banner-box" :data-url="item.url" :data-video="item.video">
          <img class="image" :src="item.imageUrl" />
          <span
            class="text"
            :style="{ backgroundColor: item.titleColor }"
            v-if="item.typeTitle"
            >{{ item.typeTitle }}</span
          >
        </div>
      </template>
    </slide>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { toPages } from "@/assets/js/util.js";
import Slide from "./components/slide.vue";

export default {
  name: "banner",
  props: ["list"],
  components: {
    Slide,
  },
  methods: {
    toLink: function (val) {
      console.log(1);
      const that = this;
      switch (val.targetType) {
        case 3000: // 数字单曲
          window.location.href = val.url;
          break;
        case 1: // 新歌首发
          this.amendStateObjValue({ key: "id", value: val.encodeId });
          toPages.call(this, { name: "player" });
          break;
      }
    },
    ...mapActions(["amendStateObjValue"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.banner {
  background-color: $white;
  .banner-box {
    margin: 0 3%;
    border-radius: 0.2rem;
    background-color: $background-color;
    border: 1px solid $red;
    position: relative;
    overflow: hidden;
    .image {
      width: 100%;
      height: 100%;
    }
    .text {
      // font-size: $text-XXXS;
      padding: 0.1rem 0.2rem;
      border-radius: 0.15rem 0 0 0;
      opacity: 0.8;
      color: $white;
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
}
</style>