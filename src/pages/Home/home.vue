<template>
  <!-- 首页 -->
  <div class="container">
    <div class="topBar">
      <div class="iconfont icon-sidebar"></div>
      <div class="topBar-pagination">
        <div
          class="swiper-slide-visible topBar-pagination-item"
          :class="homeSwiperIndex == index? 'topBar-pagination-item-active': ''"
          v-for="(item,index) in homeSwiperItems"
          :key="index"
          @click="toggleHomeSwiperIndex"
          :data-id="index"
        >{{item}}</div>
      </div>
      <div class="iconfont icon-search"></div>
    </div>
    <swiper
      class="homeSwiper"
      :options="homeSwiperOption"
      :activeIndex="homeSwiperIndex"
      ref="mySwiper"
    >
      <!-- 我的 -->
      <swiper-slide>
        <mine :mine="mine" />
      </swiper-slide>
      <!-- 发现 -->
      <swiper-slide>
        <discover :discover="discover" />
      </swiper-slide>
      <!-- 云村 -->
      <swiper-slide>云村（待开发）</swiper-slide>
      <!-- 视频 -->
      <swiper-slide>视频（待开发）</swiper-slide>
    </swiper>
  </div>
</template>

<script>
import axios from "axios";

import Mine from "./Mine/mine"; // 我的
import Discover from "./Discover/discover"; // 发现

export default {
  name: "Home",
  components: {
    Mine,
    Discover
  },
  data() {
    const that = this;
    return {
      homeSwiperItems: ["我的", "发现", "云村", "视频"],
      homeSwiper: {},
      homeSwiperIndex: 0, // 容器下标
      homeSwiperOption: {
        initialSlide: 0, // 初始下标
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        on: {
          slideChange: function(event) {
            that.homeSwiper = this;
            that.homeSwiperIndex = this.activeIndex;
          }
        }
      },
      mine: {
        menus: [
          {
            name: "每日推荐",
            iconClass: "icon-dailySpecial",
            dataTo: ""
          },
          {
            name: "歌单",
            iconClass: "icon-songList",
            dataTo: "songListSquare"
          },
          {
            name: "排行榜",
            iconClass: "icon-rankingList",
            dataTo: "rankingList"
          },
          {
            name: "电台",
            iconClass: "icon-radioStation",
            dataTo: "radioStation"
          },
          {
            name: "私人FM",
            iconClass: "icon-FM",
            dataTo: ""
          }
        ], // 菜单栏
      },
      discover: {
        banners: [], // 轮播图
        menus: [
          {
            name: "每日推荐",
            iconClass: "icon-dailySpecial",
            dataTo: ""
          },
          {
            name: "歌单",
            iconClass: "icon-songList",
            dataTo: "songListSquare"
          },
          {
            name: "排行榜",
            iconClass: "icon-rankingList",
            dataTo: "rankingList"
          },
          {
            name: "电台",
            iconClass: "icon-radioStation",
            dataTo: "radioStation"
          },
          {
            name: "私人FM",
            iconClass: "icon-FM",
            dataTo: ""
          }
        ], // 菜单栏
        recommends: [] // 推荐歌单
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods: {
    toggleHomeSwiperIndex(event) {
      // 容器下标
      console.log("event.target.dataset.id=", event.target.dataset.id);
      console.log(this.homeSwiper.activeIndex);
    },
    getdata(api, callBack) {
      axios.get("http://localhost:3000/" + api).then(res => {
        if (res.status == 200) {
          callBack(res);
        }
      });
    }
  },
  mounted() {
    const that = this;
    that.getdata("banner", res => {
      that.discover.banners = res.data.banners;
    });
    that.getdata("personalized", res => {
      that.discover.recommends = res.data.result;
    });
  }
};
</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.topBar {
  flex-shrink: 0;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  background-color: #f00;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.topBar > .iconfont {
  padding: 0 0.3rem;
}

.topBar-pagination {
  font-size: 0.25rem;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.topBar-pagination-item {
  width: 1.2rem;
}

.topBar-pagination-item-active {
  font-size: 0.3rem;
  font-weight: bold;
  color: #fff;
}

.homeSwiper {
  width: 100%;
  flex-grow: 1;
}
</style>