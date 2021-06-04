<template>
  <div class="toplist">
    <navbar :title="'排行榜'" fixed black backgroundColor="#fff"></navbar>

    <matrix :list="list" destination="playlist"></matrix>
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

    <bottombar></bottombar>

    <transition :name="transition">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Matrix from "@/common/matrix";

import Bottombar from "@/common/bottombar";

import Navbar from "@/common/navbar";
import Cover from "@/components/cover";
import { toPages } from "@/assets/js/util.js";
export default {
  name: "ranking",
  components: {
    Matrix,Bottombar,

    Navbar,
    Cover,
  },
  data: function () {
    return {
      list: [],
    };
  },
  computed: {
    ...mapGetters(["transition"]),
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
.toplist {
  @include suspension;
  padding: $safeDistance 0;
  z-index: $zIndex-M;
}
</style>