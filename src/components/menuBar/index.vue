<template>
  <div class="menuBar-items">
    <div class="menuBar-item" v-for="(item, index) in menus" :key="index">
      <div class="iconfont" :class="item.iconClass"></div>
      <div class="menuBar-item-name">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "menuBar",
  props: {
    menus: {
      type: Array,
      value: []
    }
  },
  data: function() {
    return {};
  }
};
</script>

<style scoped>
.menuBar-items {
  display: flex;
  justify-content: space-around;
  padding: .2rem 0;
}

.menuBar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.menuBar-item > .iconfont {
  width: 0.7rem;
  height: 0.7rem;
  line-height: 0.7rem;
  text-align: center;
  font-size: 0.7rem;
  border-radius: 50%;
  background-color: #f00;
  background-image: linear-gradient(to right, #ff4947, #e63738);
  color: #fff;
}

.menuBar-item-name {
  margin-top: 0.2rem;
  font-size: 0.2rem;
}
</style>