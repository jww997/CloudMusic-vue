<template>
  <div class="toplist">
    <!-- 顶部导航栏 -->
    <navbar class="navbar" title="排行榜" />
    <!-- 榜单列表 -->
    <list :list="list" />
    <placeholder />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Navbar from "@/components/navbar";
import List from "./list";
import Placeholder from "@/components/placeholder";

export default {
  name: "toplist",
  components: {
    Navbar,
    List,
    Placeholder,
  },
  data() {
    return {
      list: [],
    };
  },
  computed: {
    ...mapGetters(["transition"]),
  },
  mounted() {
    const that = this;
    that.getdata();
  },
  methods: {
    getdata() {
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
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.toplist {
  .navbar {
    background-color: $white;
    color: $text-color;
  }
}
</style>