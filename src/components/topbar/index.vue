<template>
  <div class="kid">
    <div class="left iconfont" is-link @click="showPopup">&#xe70d;</div>
    <div class="frame">
      <van-icon name="search" />
      <span class="text">搜索</span>
    </div>
    <!-- <div class="right iconfont">&#xe60a;</div> -->

    <van-popup
      v-model="show"
      position="left"
      :style="{ width: '80%', height: '100%' }"
    >
      <setting :profile="profile"></setting>
    </van-popup>
  </div>
</template>

<script>
import Setting from "./components/setting";
export default {
  name: "Search",
  components: {
    Setting,
  },
  data() {
    return {
      profile: {},
      show: false,
    };
  },
  methods: {
    showPopup() {
      const that = this;
      that.show = true;
    },
  },
  mounted: function () {
    const that = this;

    that.$api.getLoginStatus().then((res) => {
      let profile = res.data.profile;

      that.profile = profile;
      if (localStorage.length > 0) {
        localStorage.profile = JSON.stringify(profile);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.kid {
  margin: $text-XS $text-XS 0;
  @include flexSpaceBetween;
  .left,
  >>> .van-icon {
    flex-shrink: 0;
    font-size: $text-M;
  }
  .left,
  .right,
  .frame {
    box-shadow: 0 0 2rem 0 #aaa;
  }
  .left {
    margin-right: $text-XS;
  }
  .right {
    margin-left: $text-XS;
  }
  .frame {
    flex-grow: 1;
    border-radius: 3rem;
    padding: $text-XXS;
    overflow: hidden;
    color: #666;
    @include flexSpaceBetween;
    .text {
      flex-grow: 1;
      font-size: $text-XS;
      margin-left: $text-XS;
    }
  }
}
</style>