<template>
  <div class="container">
    <!-- <navbar :title="title" :subtitle="subtitle" :fixed="false"></navbar> -->

    <img class="coverImgUrl" :src="obj.coverImgUrl" :alt="obj.name" />
    <span class="name">{{ obj.name }}</span>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
export default {
  name: "capplus",
  props: {
    obj: {},
  },
  components: {
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.container {
  @include suspension;
  @include flexCenter;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #000;
  color: #fff;
  .coverImgUrl {
    width: 5rem;
    border-radius: 0.3rem;
  }
  .name {
    margin-top: 0.3rem;
    font-size: 0.4rem;
  }
}
</style>