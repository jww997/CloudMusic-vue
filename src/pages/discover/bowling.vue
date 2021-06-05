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
  name: "list",
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
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.bowling {
  background-color: #fff;
  padding: 0.3rem 0;
  .box {
    // width: 100%;
    box-sizing: content-box;
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
      margin-bottom: 0.2rem;
      border-radius: 50%;
      overflow: hidden;

      // filter: invert(100%);
      // background: #f00 no-repeat center;
      background-size: cover;

      @include flexCenter;

      .date {
        color: $theme-RED;
        font-size: $text-XS;
        margin-bottom: -$text-XXXS;
      }

      &::after {
        content: "";
        z-index: -1;
        background-color: $theme-RED;
        @include positionCenter;
      }
    }
    .text {
      font-size: $text-XS;
      color: $theme-BLACK;
    }
  }
}
</style>
