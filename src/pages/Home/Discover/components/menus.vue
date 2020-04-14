<template>
  <div class="menus-items">
    <div class="menus-item" v-for="item in menus">
      <div class="iconfont" :class="item.iconClass"></div>
      <div class="name">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'homeBanner',
    props: {
      menus: Array
    },
    data: function () {
      return {

      }
    }
  }
</script>

<style scoped>
  .menus-items {
    display: flex;
    justify-content: space-around;
  }

  .menus-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .menus-item>.iconfont {
    width: .7rem;
    height: .7rem;
    line-height: .7rem;
    text-align: center;
    font-size: .7rem;
    border-radius: 50%;
    background-color: #f00;
    background-image: linear-gradient(to right, #FF4947, #E63738);
    color: #fff;
  }

  .menus-item .name {
    margin-top: .2rem;
    font-size: .2rem;
  }
</style>