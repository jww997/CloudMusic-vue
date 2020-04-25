<template>
  <div class="recommends">
    <div>推荐歌单</div>
    <div>
      <span>为您精挑细选</span>
      <button>查看更多</button>
    </div>
    <swiper class="recommends-items" :options="recommendsSwiperOption">
      <swiper-slide class="recommends-item" v-for="(item,index) in this.recommends" :key="index">
        <div class="img">
          <img :src="item.picUrl" />
        </div>
        <div class="name">{{item.name}}</div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  export default {
    name: 'homeRecRommends',
    props: {
      recommends: Array
    },
    data: function () {
      return {
        recommendsSwiperOption: {
          slidesPerView: 3,
          spaceBetween: 10,
        }
      }
    }
  }
</script>

<style scoped>
  .recommends>div:first-child {
    font-size: .1rem;
    color: #B6B6B6;
    margin-top: .3rem;
    padding: 0 .3rem;
  }

  .recommends>div:nth-child(2) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .3rem;
  }

  .recommends>div:nth-child(2) span {
    font-size: .3rem;
    font-weight: bold;
  }

  .recommends>div:nth-child(2) button {
    font-size: .15rem;
    padding: 0 .2rem;
    background-color: #fff;
    border: 1px solid #EDEDED;
    border-radius: 20px;
  }

  .recommends-items {
    padding: 0 .3rem;
    box-sizing: border-box;
    margin-top: .25rem;
  }

  .recommends-item {
    box-sizing: border-box;
  }



  .recommends-item .img {
    border-radius: 5px;
    overflow: hidden;
  }

  .recommends-item img {
    width: 100%;
  }

  .recommends-item .name {
    margin-top: .1rem;
    font-size: .2rem;
    line-height: .3rem;
    display: -webkit-box;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
</style>