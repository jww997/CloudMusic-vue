<template>
  <div class="songs">
    <div
      :class="{ song: true, active: music.isPlaying && item.id == music.id }"
      v-for="(item, index) in list"
      :key="item.id"
      @click="toggleMusic(item.id, index)"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave"
    >
      <!-- 排序 -->
      <div class="serial">
        <van-icon class="volume" name="volume" />
        <span class="index">{{ index + 1 }}</span>
      </div>
      <!-- 歌曲信息 -->
      <div class="text">
        <p class="text-top">
          <span class="title">{{ item.name }}</span>
          <span class="subtitle" v-if="formatArtists(item.alia)"
            >({{ formatArtists(item.alia) }})</span
          >
        </p>
        <p class="text-bottom">
          {{ `${formatArtists(item.ar)} - ${item.al.name}` }}
        </p>
      </div>
      <!-- 视频入口 -->
      <van-icon
        class="video"
        name="video-o"
        v-if="item.mv != 0"
        @click.stop="toggleMv(item.mv)"
      />
      <!-- 更多操作 -->
      <van-icon
        class="ellipsis"
        name="ellipsis"
        @click.stop="handleEllipsisClick"
      />
    </div>
    <!-- 更多操作弹窗 -->
    <van-share-sheet
      v-model="isShowOptions"
      :options="options"
      title="立即分享给好友"
      description="描述信息"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { formatArtists } from "@/assets/js/filter.js";
import { toPages } from "@/assets/js/util.js";

export default {
  name: "List",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    sorttype: {
      type: String,
      default: "1",
    },
    allTop: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      // 更多操作
      isShowOptions: false,
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
        ],
      ],
    };
  },
  computed: {
    id() {
      const that = this;
      return that.music.id;
    },
    ...mapGetters(["music", "mv"]),
  },
  watch: {
    id(val, oldVal) {
      const that = this;
      let currentList = that.music.currentList;
      let currentIndex = that.music.currentIndex;
      if (!currentList.length) return false;
      let current = currentList[currentIndex];
      that.amendStateObjValue({ key: "current", value: current });
      that.amendStateObjValue({ key: "currentIndex", value: currentIndex });
    },
  },
  methods: {
    handleEllipsisClick() {
      this.isShowOptions = true;
    },

    toPages,
    formatArtists,

    mouseenter: function (index) {
      const that = this;
    },
    mouseleave: function (index) {
      const that = this;
    },

    toggleMusic(id, index) {
      const that = this;
      that.amendStateObjValue({ key: "currentIndex", value: -1 });
      if (that.music.id == id) {
        that.toPages({ name: "player" });
      } else {
        that.amendStateObjValue({ key: "id", value: id });
        that.amendStateObjValue({ key: "currentList", value: that.list });
        that.amendStateObjValue({ key: "currentIndex", value: index });
      }
    },
    toggleMv: function (id) {
      const that = this;
      that.toPages({ name: "mv" });
      that.amendStateObjValue({ name: "mv", key: "id", value: id });
      // that.amendStateObjValue({ name: "mv", key: "isShow", value: true });
    },
    ...mapActions(["amendStateObjValue"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.songs {
  padding: 0 $padding-sm;
  .song {
    height: 50px;
    margin-top: $padding-base;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .serial,
    .video,
    .ellipsis {
      flex-shrink: 0;
      width: 0.6rem;
      text-align: center;
    }
    .volume,
    .video,
    .ellipsis {
      font-size: $font-size-lg * 1.3;
    }
    .serial {
      flex-shrink: 0;
      font-size: $font-size-lg;
      .volume {
        display: none;
        color: $theme-color;
      }
    }
    .text {
      flex-grow: 1;
      margin-left: $padding-sm;
      line-height: $line-height-md;
      transition: $animation-duration-base;
      .text-top,
      .text-bottom {
        width: 6rem;
        @include omit;
      }
      .text-top {
        font-size: $font-size-lg;
        font-weight: bold;
      }
      .text-bottom {
        font-size: $font-size-xs;
      }
    }
    .ellipsis {
      margin-left: $padding-xs;
    }

    &.active {
      .serial {
        .volume {
          display: block;
        }
        .index {
          display: none;
        }
      }
      .text {
        color: $theme-color;
      }
    }
  }
}
</style>