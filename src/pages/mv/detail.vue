<template>
  <div class="detail">
    <!-- 文本介绍 -->
    <div class="text">
      <div class="artists">{{ artists }}</div>
      <div class="name" @click="handleNameClick">
        <span>{{ info.name }}</span>
        <span
          :class="{
            triangle: true,
            active: isShowDescription,
          }"
          v-if="info.desc"
        ></span>
      </div>
      <div :class="{ desc: true, active: !isShowDescription }">
        {{ info.desc }}
      </div>
      <div class="playCount">{{ playCount }}</div>
    </div>
    <!-- 用户操作 -->
    <div class="options">
      <div
        class="option"
        v-for="{ id, handleFn, icon, count, name } in options"
        :key="id"
        @click="$emit(handleFn)"
      >
        <div class="iconfont" v-html="icon"></div>
        <div class="text" v-html="count || name"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { formatUnit, formatArtists } from "@/assets/js/filter.js";

export default {
  name: "detail",
  props: ["info", "options"],
  data() {
    return {
      isShowDescription: false,
    };
  },
  computed: {
    artists() {
      return formatArtists(this.info.artists);
    },
    playCount() {
      return `${formatUnit(this.info.playCount)}次观看`;
    },

    currentTime() {
      const that = this;
      return that.mv.currentTime;
    },
    ...mapState(["mv"]),
  },
  methods: {
    handleNameClick() {
      const that = this;
      if (!that.info.desc) return false;
      that.isShowDescription = !that.isShowDescription;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.detail {
  line-height: $line-height-sm;
  padding: 0 $padding-sm;
  @include positionCenter;
  bottom: 100px;
  top: auto;

  @include flexSpaceBetween;
  align-items: flex-end;
  .text {
    flex-grow: 1;
    font-size: $font-size-sm;
    .name,
    .desc,
    .playCount {
      margin-top: 0.2rem;
      text-align: justify;
    }
    .name {
      display: flex;
      align-items: center;
      .triangle {
        width: 0;
        height: 0;
        margin-left: 0.2rem;
        margin-bottom: -0.2rem;
        border: 0.2rem solid;
        border-radius: 0.1rem;
        border-color: #fff transparent transparent;
        transform-origin: center;
        transition: 0.3s;
        &.active {
          margin-bottom: 0;
          margin-top: -0.2rem;
          transform: rotate(180deg);
        }
      }
    }
    .desc {
      height: 4rem;
      max-height: 4rem;
      // line-height: $text-S;
      // font-size: $text-XS;
      overflow: scroll;
      transition: $time-M;
      &.active {
        height: 0;
        margin-top: 0;
      }
    }
    .playCount {
      // font-size: $text-XS;
      color: #666;
    }
  }
  .options {
    flex-shrink: 0;
    margin-left: $padding-sm;
    .option {
      margin-top: $padding-sm;
      text-align: center;
      .text {
        font-size: $text-XXS;
        margin-top: 0.2rem;
      }
    }
  }
}
</style>