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
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.calendar {
  .resource {
    height: 2.5rem;
    padding: 0 0.3rem;
    box-sizing: border-box;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      font-size: 0.3rem;
      .title {
        margin-top: 0.2rem;
      }
    }
    .right {
      width: 1.5rem;

      img {
        width: 100%;
        border-radius: 0.2rem;
      }
    }
    &:first-child {
      border-top: none;
    }
  }
}
</style>