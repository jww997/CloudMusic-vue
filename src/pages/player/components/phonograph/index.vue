<template>
  <div class="children active">
    <div
      class="disc"
      :style="{
        backgroundImage: 'url(' + require('@/assets/images/chassis.png') + ')',
      }"
    >
      <img class="cover" :src="obj.al.picUrl" />
      <!-- <img class="lid" :src="require('@/assets/images/lid.png')" /> -->
      <img class="light" :src="require('@/assets/images/light.png')" />
    </div>
    <img class="stick" :src="require('@/assets/images/stick.png')" />
  </div>
</template>

<script>
export default {
  name: "phonograph",
  props: {
    obj: {
      type: Object,
      default: {},
    },
  },
  computed: {
    image: function () {
      const that = this;
      let al = that.obj && that.obj.al;
      return al && al.picUrl;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
@keyframes turn {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.children {
  padding-top: 1.8rem;
  padding-bottom: 0.5rem;
  position: relative;
  .disc {
    width: 5rem;
    height: 0;
    margin: 0 auto;
    padding-bottom: 5rem;
    background: no-repeat center;
    background-size: 100% 100%;
    border-radius: 50%;
    position: relative;
    animation-duration: 20s;
    animation-name: turn;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-play-state: paused;
    img {
      width: 100%;
      @include positionCenter;
      transform: scale(1.1);
    }
    .cover {
      transform: scale(0.7);
      border-radius: 50%;
      z-index: 1;
    }
    // .lid {
    //   z-index: 2;
    // }
    .light {
      z-index: 3;
    }
  }
  .stick {
    width: 2rem;
    transform-origin: 0.35rem 0.35rem;
    transform: rotate(-40deg);
    transition: 0.5s;
    @include positionCenter;
    bottom: auto;
    left: 1.3rem;
    z-index: 4;
  }
  &.active {
    .disc {
      animation-play-state: running;
    }
    .stick {
      transform: rotate(0);
    }
  }
}
</style>