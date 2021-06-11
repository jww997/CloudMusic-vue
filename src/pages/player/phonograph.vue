<template>
  <div class="phonograph" @click="$emit('handleClick')">
    <!-- 唱片 -->
    <disc class="disc" :cover="cover" :active="music.isPlaying" />
    <!-- 手柄 -->
    <img
      class="stick"
      :class="{ active: stickActive && music.isPlaying }"
      :src="stickImage"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Disc from "@/components/disc.vue";

export default {
  name: "phonograph",
  props: ["cover"],
  components: {
    Disc,
  },
  data() {
    return {
      touchTimer: 0,
      touchDuration: 500,

      stickActive: true,
    };
  },
  computed: {
    image() {
      const that = this;
      let al = that.phonograph && that.phonograph.al;
      return al && al.picUrl;
    },
    backgroundImage() {
      return `url(${require("@/assets/images/chassis.png")})`;
    },
    lightImage() {
      return require("@/assets/images/light.png");
    },
    lidImage() {
      return require("@/assets/images/lid.png");
    },
    stickImage() {
      return require("@/assets/images/stick.png");
    },
    ...mapGetters(["music"]),
  },
  watch: {
    cover() {
      this.stickActive = false;
      setTimeout(() => {
        this.stickActive = true;
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.phonograph {
  padding: 0 $padding-sm;
  position: relative;
  @include flexCenter;
  .disc,
  .stick {
    transition: $animation-duration-base;
  }
  .disc {
    width: 8rem;
    height: 8rem;
    margin-top: 2.5rem;
  }
  .stick {
    width: 2.5rem;
    transform-origin: 0.4rem 0.4rem;
    transform: rotate(-45deg);
    @include positionCenter;
    bottom: auto;
    left: 1.3rem;
    z-index: 5;
    &.active {
      transform: rotate(0);
    }
  }
}
</style>