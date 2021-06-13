<template>
  <div class="subscribers">
    <!-- 左侧头像 -->
    <div class="portraits">
      <img
        class="portrait"
        v-for="(item, index) in list"
        :key="index"
        :src="item.avatarUrl"
        :alt="item.name"
      />
    </div>
    <!-- 右侧文本 -->
    <div class="text" v-if="list && list.length">{{ list.length }}人收藏</div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "subscribers",
  props: ["list"],
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.subscribers {
  height: 50px;
  padding: 0 $padding-sm;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .portraits {
    .portrait {
      width: 0.7rem;
      margin-right: $padding-base;
      border-radius: 50%;
    }
  }
  .text {
    font-size: $font-size-sm;
  }
}
</style>