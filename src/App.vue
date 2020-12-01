<template>
  <div id="app">
    <keep-alive :include="keepAlives">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function () {
    const that = this;
    return {
      keepAlives: that.$store.state.keepAlives,
    };
  },
  watch: {
    $route: {
      handler: function (to, from) {
        const that = this;
        that.keepAlives = that.$store.state.keepAlives;
        console.log(that.$store.state);
      },
    },
  },
  components: {},
};
</script>

<style scoped>
</style>
