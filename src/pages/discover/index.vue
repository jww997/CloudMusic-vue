<template>
  <div>
    <search></search>
    <banner :list="banners"></banner>
  </div>
</template>

<script>
import Search from "@/pages/discover/components/search";
import Banner from "@/pages/discover/components/banner";

import api from "@/api";

export default {
  name: "Discover",
  components: {
    Search,
    Banner,
  },
  data: function () {
    return {
      banners: [],
    };
  },
  mounted: function () {
    const that = this;
    api.getBanner().then((res) => {
      this.banners = res.data.banners;
    });
  },
};
</script>

<style lang="scss" scoped>
</style>