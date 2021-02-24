<template>
  <div class="container">
    <navbar :title="'排行榜'" fixed black backgroundColor="#fff"></navbar>

    <matrix :list="list" destination="toplist/playlist"></matrix>
    <!-- <div class="list">
      <div
        class="billboard"
        v-for="item in list"
        :key="item.id"
        @click="toPages({ name: 'toplist/playlist', params: { id: item.id } })"
      >
        <cover
          :image="item.coverImgUrl"
          :name="item.name"
          :count="item.playCount"
        ></cover>
      </div>
    </div> -->

    <transition name="thirdly">
      <router-view class="thirdly"></router-view>
    </transition>
  </div>
</template>

<script>
import Matrix from "@/common/matrix";

import Navbar from "@/common/navbar";
import Cover from "@/components/cover";
import { toPages } from "@/assets/js/skip.js";
export default {
  name: "ranking",
  components: {
    Matrix,

    Navbar,
    Cover,
  },
  data: function () {
    return {
      list: [],
    };
  },
  mounted: function () {
    const that = this;
    that.getdata();
  },
  methods: {
    toPages,
    getdata: function () {
      const that = this;
      that.$api.getToplist().then((res) => {
        that.list = res.data.list;
      });
      // that.$api.getToplistDetail().then((res) => {
      //   console.log(res);
      // });
    },
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
  padding-bottom: $safeDistance;

  // .list {
  //   padding: 0 0.3rem;
  //   @include flexCenter;
  //   flex-wrap: wrap;
  //   justify-content: flex-start;

  //   .billboard {
  //     flex-shrink: 0;
  //     width: 31.5%;
  //     margin-right: 2%;
  //     margin-top: 0.3rem;
  //     &:nth-child(3n) {
  //       margin-right: 0;
  //     }
  //     & >>> .text {
  //       height: 1rem;
  //     }
  //   }
  // }

  .thirdly {
    z-index: $zIndex-L;
    @include suspension;

    &.thirdly-enter,
    &.thirdly-leave-to {
      opacity: 0;
      transform: translateY(1rem);
    }

    &.thirdly-enter-to,
    &.thirdly-leave {
      opacity: 1;
    }

    &.thirdly-enter-active,
    &.thirdly-leave-active {
      transition: 0.5s;
    }
  }
}
</style>