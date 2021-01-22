<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
    <!-- <van-loading
      class="loading"
      size="24px"
      v-if="isLoading && total != data.length"
    >
      加载中...
    </van-loading> -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import BScroll from "better-scroll";
export default {
  name: "scroll",
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 1,
    },
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: true,
    },
    /**
     * 是否开启横向滚动
     */
    scrollX: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否派发滚动事件
     */
    listenScroll: {
      type: Boolean,
      default: false,
    },
    /**
     * 列表的数据
     */
    data: {
      type: Array,
      default: null,
    },
    /**
     * 是否派发滚动到底部的事件，用于上拉加载
     */
    pullup: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否派发顶部下拉的事件，用于下拉刷新
     */
    pulldown: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否派发列表滚动开始的事件
     */
    beforeScroll: {
      type: Boolean,
      default: false,
    },
    /**
     * 当数据更新后，刷新scroll的延时。
     */
    refreshDelay: {
      type: Number,
      default: 20,
    },
  },
  computed: {
    ...mapGetters(["playId"]),
  },
  methods: {
    _initScroll() {
      const that = this;
      if (!that.$refs.wrapper) return false;
      // better-scroll的初始化
      that.scroll = new BScroll(that.$refs.wrapper, {
        probeType: that.probeType,
        click: that.click,
        scrollX: that.scrollX,
      });

      // 是否派发滚动事件
      if (that.listenScroll) {
        that.scroll.on("scroll", (pos) => {
          that.$emit("scroll", pos);
        });
      }

      // 是否派发滚动到底部事件，用于上拉加载
      if (that.pullup) {
        that.scroll.on("scrollEnd", () => {
          // 滚动到底部
          if (that.scroll.y <= that.scroll.maxScrollY + 50) {
            that.$emit("scrollToEnd");
          }
        });
      }

      // 是否派发顶部下拉事件，用于下拉刷新
      if (that.pulldown) {
        that.scroll.on("touchend", (pos) => {
          // 下拉动作
          if (pos.y > 50) {
            that.$emit("pulldown");
          }
        });
      }

      // 是否派发列表滚动开始的事件
      if (that.beforeScroll) {
        that.scroll.on("beforeScrollStart", () => {
          that.$emit("beforeScroll");
        });
      }
    },
    disable() {
      const that = this;
      // 代理better-scroll的disable方法
      that.scroll && that.scroll.disable();
    },
    enable() {
      const that = this;
      // 代理better-scroll的enable方法
      that.scroll && that.scroll.enable();
    },
    refresh() {
      const that = this;
      // 代理better-scroll的refresh方法
      that.scroll && that.scroll.refresh();
    },
    scrollTo() {
      const that = this;
      // 代理better-scroll的scrollTo方法
      that.scroll && that.scroll.scrollTo.apply(that.scroll, arguments);
    },
    scrollToElement() {
      const that = this;
      // 代理better-scroll的scrollToElement方法
      that.scroll && that.scroll.scrollToElement.apply(that.scroll, arguments);
    },
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data() {
      const that = this;
      setTimeout(() => {
        // console.log("滚动刷新");
        that.refresh();
      }, that.refreshDelay);
    },
    playId(val) {
      const that = this;
      that.refresh();
    },
    $route: {
      handler(val, oldval) {
        const that = this;
        if (val != oldval) {
          that.refresh();
          // that.scrollToElement(0);
        }
      },
    },
  },
  mounted() {
    // 保证在DOM渲染完毕后初始化better-scroll
    setTimeout(() => {
      const that = this;
      that._initScroll();
    }, 20);
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.wrapper {
  height: 100%;
}
</style>