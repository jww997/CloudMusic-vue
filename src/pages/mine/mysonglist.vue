<template>
  <div class="mysonglist">
    <div class="box">
      <div class="title">创建歌单</div>
      <songlist
        :list="list.filter(res => !res.ordered)"
        @handleClick="handleClick"
      />
    </div>
    <div class="box">
      <div class="title">收藏歌单</div>
      <songlist
        :list="list.filter(res => res.ordered)"
        @handleClick="handleClick"
      />
    </div>
  </div>
</template>

<script>
import Songlist from "./components/songlist";
export default {
  name: "mysonglist",
  props: ["list"],
  components: { Songlist },
  computed: {},
  methods: {
    handleClick(id) {
      this.$emit("handleClick", id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.mysonglist {
  margin: 0 $padding-sm;
  .box {
    margin-top: $padding-sm;
    border-radius: $border-radius-lg;
    background-color: $white;
    .title {
      padding: $padding-sm $padding-sm 0;
      font-size: $font-size-lg;
      font-weight: bold;
    }
  }
}
</style>
