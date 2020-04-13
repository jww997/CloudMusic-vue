<template>
  <swiper class="bannersSwiper" :options="bannersSwiperOption">
    <swiper-slide class="bannersSwiper-item" v-for="item in this.banners">
      <div>
        <img :src="item.imageUrl" />
        <div class="typeTitle">{{item.typeTitle}}</div>
      </div>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  export default {
    name: 'homeBanner',
    props: {
      banners: Array
    },
    data: function () {
      return {
        bannersSwiperOption: {
          autoplay: true,
          loop: true,
          pagination: {
            el: '.swiper-pagination',
          },
        }
      }
    }
  }
</script>

<style scoped>
  .bannersSwiper {
    width: 100%;
    height: 3rem;
    background-color: transparent;
    position: relative;
    overflow: hidden;
  }

  .bannersSwiper::after {
    content: "";
    width: 100%;
    height: 50%;
    background-color: #f00;
    position: absolute;
    top: 0;
    z-index: -1;
  }

  .bannersSwiper-item {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bannersSwiper img {
    width: 7rem;
  }

  .bannersSwiper-item>div {
    border-radius: .1rem;
    position: relative;
    overflow: hidden;
  }

  .bannersSwiper .typeTitle {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: .2rem;
    padding: .1rem;
    border-radius: .1rem 0 0 0;
    background-color: #f00;
    color: #fff;
  }
</style>