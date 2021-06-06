<template>
  <div class="calendar">
    <block :block="block">
      <div class="resources">
        <div class="resource" v-for="item in list" :key="item.id">
          <div class="left">
            <p>
              <van-tag
                v-for="(item, index) in item.resources[0].uiElement.labelTexts"
                :key="index"
                >{{ item }}</van-tag
              >
            </p>
            <p class="title">
              {{ item.resources[0].uiElement.mainTitle.title }}
            </p>
          </div>
          <div class="right">
            <img :src="item.resources[0].uiElement.image.imageUrl" />
          </div>
        </div>
      </div>
    </block>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Block from "./components/block.vue";
export default {
  name: "calendar",
  props: ["block"],
  components: {
    Block,
  },
  computed: {
    list() {
      try {
        const { creatives } = this.$props.block;
        return creatives;
      } catch (err) {
        return [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.calendar {
  .resource {
    height: 2.5rem;
    margin: 0 $padding-sm;
    box-sizing: border-box;
    border-top: $border-width-base solid $border-color;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      line-height: $line-height-sm;
      font-size: $font-size-sm;
      .title {
        margin-top: $padding-xs;
      }
    }
    .right {
      flex-shrink: 0;
      width: 1.5rem;
      padding-left: $padding-lg;
      img {
        width: 100%;
        border-radius: $border-radius-lg ;
      }
    }
    &:first-child {
      border-top: none;
    }
  }
}
</style>