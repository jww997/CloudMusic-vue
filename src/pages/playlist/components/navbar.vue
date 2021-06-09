<template>
  <div class="navbar">
    <van-icon class="icon" name="arrow-left" @click="back" />
    <div class="headline" v-if="title">
      <p class="title">{{ title }}</p>
      <p class="subtitle" v-if="subtitle">{{ subtitle }}</p>
    </div>
    <div class="addonAfter">
      <slot name="addonAfter"></slot>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "navbar",
  props: [
    "title",
    "subtitle",
    "fixed",
    "black",
    "backgroundColor",
    "iconLeft",
    "type",
  ],
  computed: {
    ...mapState(["music", "mv"]),
  },
  methods: {
    back() {
      const that = this;
      let router = that.$router;
      window.history.length > 1 ? router.go(-1) : router.push("/");
    },
    hide() {
      const that = this;
      let mv = that.mv;
      let music = that.music;
      music.isShow = false;
      mv.isShow = false;
      that.setMusic(music);
      that.setMv(mv);
    },
    ...mapMutations({
      setMusic: "SET_MUSIC",
      setMv: "SET_MV",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.navbar {
  height: 50px;
  padding: 0 $padding-sm;
  background-color: transparent;
  color: $white;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  .icon,
  .addonAfter {
    flex-shrink: 0;
    min-width: 0.7rem;
    max-width: 50%;
  }
  .icon {
    font-size: $font-size-lg * 1.5;
  }
  .headline {
    flex-grow: 1;
    line-height: $line-height-md;
    text-align: center;
    .title {
      font-size: $font-size-lg * 1.3;
      font-weight: bold;
    }
    .subtitle {
      font-size: $font-size-lg;
    }
  }
  // -webkit-backdrop-filter: saturate(180%) blur(20px);
  // backdrop-filter: saturate(180%) blur(20px);
}
</style>