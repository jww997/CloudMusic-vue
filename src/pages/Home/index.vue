<template>
  <!-- 首页 -->
  <div class="container">
    <div class="nav">
      <div class="iconfont icon-sidebar"></div>
      <div class="nav-pagination">
        <div
          class="nav-pagination-item"
          :class="home.index == index? 'nav-pagination-item-active': ''"
          v-for="(item,index) in home.navs"
          :key="index"
          @click="toggleHomeIndex"
          :data-index="index"
        >{{item}}</div>
      </div>
      <div class="iconfont icon-search"></div>
    </div>
    <swiper class="swiper" :options="home.option" :activeIndex="home.index" ref="homeSwiper">
      <swiper-slide>
        <mine :mine="mine" />
      </swiper-slide>
      <swiper-slide>
        <discover :discover="discover" />
      </swiper-slide>
      <swiper-slide>云村（待开发）</swiper-slide>
      <swiper-slide>视频（待开发）</swiper-slide>
    </swiper>
  </div>
</template>

<script>
import axios from "axios";

import Mine from "./mine"; // 我的
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
      home: {
        index: 1,
        swiper: {},
        navs: ["我的", "发现", "云村", "视频"],
        option: {
          initialSlide: 1,
          on: {
            slideChange: function(event) {
              that.home.index = this.activeIndex;
            }
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
        ] // 菜单栏
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
      const that = this;
      return that.$refs.homeSwiper.swiper;
    }
  },
  methods: {
    toggleHomeIndex(event) {
      const that = this;
      let { index } = event.target.dataset;
      that.$refs.homeSwiper.swiper.slideTo(index, 500, false);
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
.container,
.nav,
.nav-pagination,
.nav-pagination-item {
  display: flex;
}

.nav,
.nav-pagination {
  justify-content: space-between;
  align-items: center;
}

.container {
  height: 100%;
  flex-direction: column;
}

.nav {
  flex-shrink: 0;
  padding: 0 0.3rem;
}

.nav-pagination {
  width: 55%;
  height: 1rem;
}

.nav-pagination-item {
  transition: 0.1s;
}

.nav-pagination-item-active {
  font-weight: bold;
  transform: scale(1.2);
}

.swiper {
  flex-grow: 1;
  width: 100%;
}
</style>