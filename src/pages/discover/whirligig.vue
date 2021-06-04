<template>
  <div class="whirligig">
    <!-- <van-skeleton title animate :row="1" /> -->
    <block :block="block">
      <van-swipe
        class="swiper"
        indicator-color="white"
        width="118"
        :show-indicators="false"
        :loop="false"
      >
        <div v-for="(item, index) in list" :key="index">
          <van-swipe-item
            class="swiper-item"
            v-if="index < 6"
            @click.stop="
              toPages({ name: 'playlist', params: { id: item.creativeId } })
            "
          >
            <cover
              :image="item.uiElement.image.imageUrl"
              :name="item.uiElement.mainTitle.title"
              :count="item.resources[0].resourceExtInfo.playCount"
            ></cover>
          </van-swipe-item>
        </div>
      </van-swipe>
    </block>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { formatUnit } from "@/assets/js/filter";
import { toPages } from "@/assets/js/util.js";
import Cover from "@/components/cover";
import Block from "./components/block";

export default {
  name: "whirligig",
  components: {
    Cover,
    Block,
  },
  props: ["block"],
  computed: {
    title() {
      try {
        const {
          uiElement: {
            subTitle: { title },
          },
        } = this.$props.block;
        return title;
      } catch (err) {
        return "";
      }
    },
    btnText() {
      try {
        const {
          uiElement: {
            button: { text },
          },
        } = this.$props.block;
        return text;
      } catch (err) {
        return "";
      }
    },
    list() {
      try {
        const { creatives } = this.$props.block;
        return creatives;
      } catch (err) {
        return [];
      }
    },
  },
  methods: {
    formatUnit,
    toPages,
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.whirligig {
  padding-bottom: 0.2rem;
  border-top: 0.15rem solid #eee;
  .swiper {
    .swiper-item {
      margin-top: 0.3rem;
      padding-left: 0.2rem;
      box-sizing: border-box;
    }
  }
}
</style>
