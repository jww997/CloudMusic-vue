<template>
  <div class="bowling">
    <slide :width="70" :list="list">
      <template slot="box" slot-scope="{ item }">
        <div class="box" @click="toPage(item.id)">
          <!-- <div class="iconfont" v-html="item.icon"></div> -->
          <div
            class="icon"
            :style="{
              backgroundImage: 'url(' + item.iconUrl + ')',
            }"
            :alt="item.name"
          >
            <span class="date" v-if="item.id == -1">{{ date }}</span>
            <!-- :class="{ icon: true, active: !item.id }" -->
            <!-- webkitMask: 'url(' + item.iconUrl + ')' -->
            <!-- <img :src="item.iconUrl" :alt="item.name" /> -->
          </div>
          <span class="text">{{ item.name }}</span>
        </div>
      </template>
    </slide>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { formatDate } from "@/assets/js/filter.js";
import { toPages } from "@/assets/js/util.js";
import Slide from "./components/slide.vue";

export default {
  name: "bowling",
  components: {
    Slide,
  },
  data() {
    return { list: [] };
  },
  computed: {
    date() {
      return formatDate(undefined, 3).d;
    },
  },
  methods: {
    toPages,
    toPage: function (id) {
      const that = this;
      let name;
      switch (id) {
        case -1:
          name = "dailyspecial";
          break;
        case -2:
          name = "square";
          break;
        case -3:
          name = "toplist";
          break;
        case -6:
          that.amendStateObjValue({ key: "currentIndex", value: -1 });
          that.$api.getPersonalFm().then((res) => {
            that.amendStateObjValue({
              key: "currentList",
              value: res.data.data,
            });
            that.amendStateObjValue({ key: "currentIndex", value: 0 });
            that.amendStateObjValue({ key: "isShow", value: true });
          });
          break;
      }
      if (!name) {
        that.$vant.Toast({ type: "html", duration: 500, message: "敬请期待" });
        return false;
      }
      that.toPages({ name, params: {} });
    },
    ...mapActions(["amendStateObjValue"]),
  },
  mounted() {
    const that = this;
    that.$api.getHomepageDragonBall().then((res) => {
      that.list = res.data.data;
    });
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.bowling {
  background-color: $background-color-light;
  padding: $padding-sm 0;
  margin-bottom: $border-width-base;
  .box {
    @include flexCenter;
    flex-direction: column;
    .icon,
    .text {
      flex-shrink: 0;
    }
    .icon {
      width: 1rem;
      height: 1rem;
      position: relative;
      border-radius: 50%;
      overflow: hidden;
      background-size: cover;
      @include flexCenter;
      // filter: invert(100%);
      .date {
        color: $red;
        font-size: $font-size-xs;
        margin-bottom: -$padding-xs;
      }

      &::after {
        content: "";
        z-index: -1;
        background-color: $red;
        @include positionCenter;
      }
    }
    .text {
      margin-top: $padding-xs;
      font-size: $font-size-sm;
      color: $text-color;
    }
  }
}
</style>
