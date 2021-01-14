<template>
  <div class="container">
    <navbar :title="'每日推荐'" fixed black></navbar>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
export default {
  name: "dailyspecial",
  components: {
    Navbar,
  },
  mounted: function () {
    const that = this;
    // that.$api.getRecommendResource({
    //   cookie:
    //     "__csrf=31ed9189fba0069c1e61e6e73e14fbac; Max-Age=1296010; Expires=Tue, 5 Jan 2021 07:42:06 GMT; Path=/;;MUSIC_U=64d65234a8d5b8547f2b23029b23920535b02604a2d2a0743b50d5d0a4c789f55cb0fcee37c101bd; Max-Age=1296000; Expires=Tue, 5 Jan 2021 07:41:56 GMT; Path=/;;__remember_me=true; Max-Age=1296000; Expires=Tue, 5 Jan 2021 07:41:56 GMT; Path=/;;NMTID=00O-SUleSwRVPxDRkGjg8NsL0r6oVsAAAF2hD9oMQ; Max-Age=315360000; Expires=Thu, 19 Dec 2030 07:41:56 GMT; Path=/",
    // });
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.container {
  @include suspension;
  box-sizing: border-box;
  padding-top: $safeDistance;
}
</style>