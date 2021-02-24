<template>
  <div class="children">
    <img class="coverImgUrl" :src="obj.coverImgUrl" :alt="obj.name" />
    <span class="name">{{ obj.name }}</span>
    <div class="tags">
      标签:
      <span class="tag" v-for="(item, index) in obj.tags" :key="index">{{
        item
      }}</span>
    </div>
    <div class="description">{{ obj.description }}</div>
    <van-icon name="cross" />
    <!-- <div class="iconfont close">&#xe626;</div> -->
    <!-- <button class="save">保存封面</button> -->
  </div>
</template>

<script>
import Navbar from "@/common/navbar";
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
.children {
  height: 100%;
  @include suspension;
  @include flexCenter;
  flex-direction: column;
  justify-content: flex-start;
  line-height: 0.5rem;
  padding: 0 0.3rem 1rem;
  box-sizing: border-box;
  overflow: scroll;
  background-color: #999;
  z-index: $zIndex-L;
  color: #fff;
  .coverImgUrl {
    width: 6rem;
    border-radius: 0.3rem;
    margin-top: 1rem;
  }
  .name {
    line-height: 0.6rem;
    margin-top: 0.3rem;
    font-size: $text-M;
    font-weight: bold;
    text-align: center;
  }
  .tags,
  .description {
    width: 100%;
    line-height: 0.6rem;
    font-size: $text-S;
  }
  .tags {
    margin-top: 0.5rem;
    @include flexCenter;
    justify-content: flex-start;
    .tag {
      height: 0.4rem;
      font-size: $text-XS;
      margin-left: 0.2rem;
      border: 1px solid #eee;
      padding: 0.1rem 0.2rem;
      border-radius: 0.5rem;
      @include flexCenter;
    }
  }
  .description {
    margin-top: 0.3rem;
    text-align: justify;
    text-align-last: left;
  }
  .close,
  >>> .van-icon {
    font-size: $text-XL;
    position: absolute;
    right: 0.4rem;
    top: 0.4rem;
  }
  .save {
    height: 0.6rem;
    padding: 0.1rem 0.2rem;
    background-color: transparent;
    border: 1px solid #fff;
    border-radius: 0.5rem;
    font-size: $text-XS;
    @include positionCenter;
    @include flexCenter;
    bottom: 0.5rem;
    top: auto;
  }
}
</style>