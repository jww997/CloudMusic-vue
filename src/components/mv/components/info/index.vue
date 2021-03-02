<template>
  <div class="children">
    <div class="top">
      <div class="left">
        <div class="artists">
          {{ formatArtists(info.artists) }}
          <!-- <span v-for="(item, index) in info.artists" :key="index"
            >{{ item.name }} /
          </span> -->
        </div>
        <div class="name" @click.stop="toggleDesc">
          <span>{{ info.name }}</span>
          <span
            :class="{
              triangle: true,
              active: isShowDesc,
            }"
            v-if="info.desc"
          ></span>
        </div>
        <div :class="{ desc: true, active: !isShowDesc }">{{ info.desc }}</div>
        <div class="playCount">{{ info.playCount }}次观看</div>
      </div>
      <div class="right">
        <div class="handle" v-if="count.likedCount">
          <div class="iconfont">&#xe697;</div>
          <div class="text">{{ count.likedCount }}</div>
        </div>
        <div class="handle" v-if="count.commentCount">
          <div class="iconfont">&#xe65d;</div>
          <div class="text">{{ count.commentCount }}</div>
        </div>
        <div class="handle" v-if="count.shareCount">
          <div class="iconfont">&#xe65c;</div>
          <div class="text">{{ count.shareCount }}</div>
        </div>
        <div class="handle">
          <div class="iconfont">&#xe61d;</div>
          <div class="text">收藏</div>
        </div>
      </div>
    </div>
    <div class="strip">
      <van-slider
        v-model="percentage"
        step="1"
        button-size="10px"
        active-color="#f00"
        inactive-color="#494949"
        @input="togglePercentage"
      />
    </div>
    <div class="bottom">
      <div
        :class="{
          iconfont: true,
          like: true,
          active: count.liked,
        }"
        v-html="count.liked ? '&#xe669;' : '&#xe66a;'"
      ></div>
      <div class="title">
        <span class="name">{{ info.name }}</span>
        <span class="artistName">- {{ info.artistName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { formatArtists } from "@/assets/js/filter.js";
export default {
  name: "info",
  props: {
    info: {},
    count: {},
  },
  data: function () {
    return {
      // isLike: true,
      isShowDesc: false,

      percentage: 0,
    };
  },
  computed: {
    currentTime() {
      const that = this;
      return that.mv.currentTime;
    },
    ...mapState(["mv"]),
  },
  watch: {
    currentTime(newVal, oldVal) {
      const that = this;
      that.percentage = Number.parseFloat(newVal / that.mv.duration) * 100;
    },
  },
  methods: {
    formatArtists,
    togglePercentage: function (val) {
      const that = this;
      that.amendStateObjValue({ name: "mv", key: "isDraging", value: true });
      that.amendStateObjValue({
        name: "mv",
        key: "currentTime",
        value: that.mv.duration * (val / 100),
      }); // 根据选中百分比修改进度条
    },
    toggleDesc: function () {
      const that = this;
      if (!that.info.desc) return false;
      that.isShowDesc = !that.isShowDesc;
    },
    ...mapActions(["amendStateObjValue"]),
  },
};
</script>


<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.children {
  @include positionCenter;
  top: auto;
  .top {
    @include flexSpaceBetween;
    align-items: flex-end;
    opacity: $opacity-L;
    .left {
      padding: 0.3rem 0.5rem;
      line-height: $text-M;
      font-size: $text-S;
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
        line-height: $text-S;
        font-size: $text-XS;
        overflow: scroll;
        transition: $time-M;
        &.active {
          height: 0;
          margin-top: 0;
        }
      }
      .playCount {
        font-size: $text-XS;
        color: #666;
      }
    }
    .right {
      .handle {
        @include flexCenter;
        flex-direction: column;
        padding: 0.3rem;
        .iconfont {
          font-size: $text-M;
        }
        .text {
          font-size: $text-XXS;
          margin-top: 0.2rem;
        }
      }
    }
  }
  .bottom {
    @include flexCenter;
    justify-content: flex-start;
    padding: 0.5rem 0.3rem;
    .like {
      width: 1rem;
      font-size: 0.7rem;
      text-align: center;
      &.active {
        color: #ff3e43;
      }
    }
    .title {
      font-size: 0.3rem;
      .name {
        color: #999;
      }
      .artistName {
        color: #666;
      }
    }
  }
}
</style>