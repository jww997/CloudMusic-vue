<template>
  <!-- 发现 -->
  <view class="discover">

    <discover-banner :banners="discover.banners" />
    <discover-menus :menus="discover.menus" />
    <discover-recommends :recommends="discover.recommends" />

  </view>
</template>

<script>

  import DiscoverBanner from './components/banner'; // 轮播图
  import DiscoverMenus from './components/menus'; // 菜单
  import DiscoverRecommends from './components/recommends'; // 热门推荐
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

  .discover {
    overflow: scroll;
  }
</style>