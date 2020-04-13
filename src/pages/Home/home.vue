<template>
  <div class="container">
    <div class="topBar">
      <div class="iconfont icon-sidebar"></div>
      <div class="topBar-pagination">
        <div :class="homeSwiperIndex == index? 'topBar-pagination-item-active': ''" class="swiper-slide-visible"
          v-for="(item, index) in homeSwiperItems" @click="toggleHomeSwiperIndex" :data-id="index">
          {{item}}</div>
      </div>
      <div class="iconfont icon-search"></div>
    </div>
    <swiper class="homeSwiper" :options="homeSwiperOption" :activeIndex="homeSwiperIndex" ref="mySwiper">
      <!-- 我的 -->
      <swiper-slide>我的（待开发）</swiper-slide>
      <!-- 发现 -->
      <swiper-slide class="discover">
        <discover-banner :banners="discover.banners" />
        <discover-menus :menus="discover.menus" />
        <discover-recommends :recommends="discover.recommends" />
      </swiper-slide>
      <!-- 云村 -->
      <swiper-slide>云村（待开发）</swiper-slide>
      <!-- 视频 -->
      <swiper-slide>视频（待开发）</swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import axios from 'axios';
  // 发现
  import DiscoverBanner from './components/discover/banner'; // 轮播图
  import DiscoverMenus from './components/discover/menus'; // 菜单
  import DiscoverRecommends from './components/discover/recommends'; // 热门推荐
  export default {
    name: "Home",
    components: {
      DiscoverBanner,
      DiscoverMenus,
      DiscoverRecommends,
    },
    data() {
      const that = this;
      return {
        discover: {
          banners: [], // 轮播图
          menus: [{
            name: '每日推荐',
            iconClass: 'icon-dailySpecial',
            dataTo: '',
          }, {
            name: '歌单',
            iconClass: 'icon-songList',
            dataTo: 'songListSquare',
          }, {
            name: '排行榜',
            iconClass: 'icon-rankingList',
            dataTo: 'rankingList',
          }, {
            name: '电台',
            iconClass: 'icon-radioStation',
            dataTo: 'radioStation',
          }, {
            name: '私人FM',
            iconClass: 'icon-FM',
            dataTo: '',
          }], // 菜单栏
          recommends: [], // 推荐歌单
        },




        homeSwiperItems: ['我的', '发现', '云村', '视频'],
        homeSwiper: {},
        homeSwiperIndex: 1, // 容器下标
        homeSwiperOption: {
          initialSlide: 1, // 初始下标
          watchSlidesProgress: true,
          watchSlidesVisibility: true,
          on: {
            slideChange: function (event) {
              that.homeSwiper = this;
              that.homeSwiperIndex = this.activeIndex;
            },
          },
        },
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper;
      }
    },
    methods: {
      toggleHomeSwiperIndex(event) { // 容器下标
        console.log('event.target.dataset.id=', event.target.dataset.id);
        console.log(this.homeSwiper.activeIndex);
      },
      getdata(api, callBack) {
        axios.get('http://localhost:3000/' + api)
          .then(res => {
            if (res.status == 200) {
              callBack(res);
            };
          })
      },
    },
    mounted() {
      const that = this;
      that.getdata('banner', res => {
        that.discover.banners = res.data.banners;
      });
      that.getdata('personalized', res => {
        console.log(res.data.result);
        that.discover.recommends = res.data.result;
      });
    }
  }
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
    height: .7rem;
    padding: 0 .25rem;
    background-color: #f00;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
  }

  .topBar-pagination {
    width: 60%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: .25rem;
    color: rgba(255, 255, 255, .5);
  }

  .topBar-pagination>div {
    flex: 1;
    height: 100%;
    text-align: center;
  }

  .topBar-pagination-item-active {
    font-size: .3rem;
    font-weight: bold;
    color: #fff;
  }

  .homeSwiper {
    width: 100%;
  }

  .discover {
    overflow: scroll;
  }
</style>