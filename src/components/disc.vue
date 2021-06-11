<template>
  <div
    class="disc"
    ref="disc"
    :class="{ animation, active }"
    :style="{ backgroundImage }"
    @click="$emit('handleClick')"
  >
    <div class="cover">
      <img :src="cover" />
    </div>
    <!-- <img class="lid" :src="lid" /> -->
    <img class="light" :src="light" />
  </div>
</template>

<script>
export default {
  name: "disc",
  props: ["cover", "active"],
  data() {
    return {
      animation: true,
    };
  },
  computed: {
    backgroundImage() {
      return `url(${require("@/assets/images/chassis.png")})`;
    },
    lid() {
      return require("@/assets/images/lid.png");
    },
    light() {
      return require("@/assets/images/light.png");
    },
  },
  watch: {
    cover() {
      this.active = false;
      this.animation = false;
      setTimeout(() => {
        // 动画位置重置
        this.animation = true;
        this.active = true;
      }, 300);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.disc {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: no-repeat center;
  background-size: cover;
  position: relative;

  .cover,
  .lid,
  .light {
    transform: scale(1.1);
    @include positionCenter;
  }
  .lid,
  .light {
    width: 100%;
    height: 100%;
  }
  .cover {
    max-width: 63%;
    max-height: 63%;
    border-radius: 50%;
    overflow: hidden;
    @include flexCenter;
  }
  .cover img {
    max-width: 100%;
    max-height: 100%; // 部分图片呈长方形
  }
  .cover {
    z-index: 1;
  }
  .lid {
    z-index: 2;
  }
  .light {
    z-index: 3;
  }
  &.animation {
    animation: turn 20s linear infinite paused;
  }
  &.active {
    animation-play-state: running;
  }
}
</style>