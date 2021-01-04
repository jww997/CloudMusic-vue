<template>
  <div class="container">
    <!-- <navbar :title="title" :subtitle="subtitle" :fixed="false"></navbar> -->

    <img class="coverImgUrl" :src="obj.coverImgUrl" :alt="obj.name" />
    <span class="name">{{ obj.name }}</span>
    <div class="tags">
      标签:
      <span class="tag" v-for="(item, index) in obj.tags" :key="index">{{
        item
      }}</span>
    </div>
    <div class="description">{{ obj.description }}</div>
    <button class="save">保存封面</button>
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
  line-height: 0.4rem;
  padding: 1rem 0.3rem;
  z-index: 200;
  box-sizing: border-box;
  background-color: #999;
  color: #fff;
  .coverImgUrl {
    width: 5rem;
    border-radius: 0.3rem;
  }
  .name {
    margin-top: 0.3rem;
    font-size: 0.3rem;
  }
  .tags,
  .description {
    width: 100%;
  }
  .tags {
    margin-top: 0.5rem;
    @include flexCenter;
    justify-content: flex-start;
    .tag {
      height: 0.4rem;
      line-height: 0.4rem;
      margin-left: 0.2rem;
      border: 1px solid #eee;
      padding: 0 0.15rem;
      border-radius: 0.5rem;
    }
  }
  .description {
    margin-top: 0.3rem;
  }
  .save {
    height: 0.4rem;
    line-height: 0.4rem;
    padding: 0 0.15rem;
    background-color: transparent;
    border: 1px solid #fff;
    border-radius: 0.5rem;
    @include positionCenter;
    bottom: 0.5rem;
    top: auto;
  }
}
</style>