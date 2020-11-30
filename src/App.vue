<template>
  <div id="app">
    <keep-alive include="Discover">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style scoped>
</style>
