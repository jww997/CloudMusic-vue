<template>
  <div class="container">
    <navbar :title="'视频'" fixed></navbar>
    <video class="video" :src="url" controls autoplay></video>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
export default {
  name: "mv",
  components: {
    Navbar,
  },
  data: function () {
    return {
      url: "",
    };
  },
  mounted: function () {
    const that = this;
    let id = that.$route.query.id;
    console.log(`MVid = ${id}`);
    that.$api
      .getMvDetail({ mvid: id })
      .then((res) => {
        console.log(res);
        return that.$api.getMvUrl({ id });
      })
      .then((res) => {
        that.url = res.data.data.url;
      });
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.container {
  height: 100vh;
  @include suspension;

  padding-top: 1rem;
  box-sizing: border-box;

  background-color: #000;
  color: #fff;

  .video {
    margin-top: 1.5rem;
    width: 100%;
    min-height: 5rem;
  }
}
</style>