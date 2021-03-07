<template>
  <div class="kid">
    <div class="left iconfont" is-link @click="showPopup">&#xe70d;</div>
    <div class="frame" @click="toPages({ name: 'search' })">
      <van-icon name="search" />
      <span class="text">搜索</span>
    </div>
    <!-- <div class="right iconfont">&#xe60a;</div> -->

    <van-popup
      v-model="show"
      position="left"
      :style="{ width: '80%', height: '100%' }"
    >
      <setting @hide="hidePopup" @quit="quit"></setting>
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { toPages } from "@/assets/js/util.js";
import Setting from "./components/setting";
export default {
  name: "Search",
  components: {
    Setting,
  },
  data() {
    return {
      // profile: {
      //   nickname: "立即登录",
      // },
      show: false,
    };
  },
  computed: {
    // profile() {
    //   const that = this;
    //   return that.login.profile;
    // },
    ...mapGetters(["login"]),
  },
  methods: {
    toPages,
    showPopup() {
      const that = this;
      that.show = true;
    },
    hidePopup() {
      const that = this;
      that.show = false;
    },
    quit() {
      const that = this;
      that.$api.getLogout();
      that.hidePopup();

      that.logout();
      that.$vant.Toast.success("退出登录成功");
    },
    ...mapActions(["logout"]),
  },
  mounted: function () {
    const that = this;

    that.$api.getLoginStatus().then((res) => {
      let profile = res.data.profile;
      // that.profile = profile;
      if (localStorage.length > 0)
        localStorage.profile = JSON.stringify(profile);
    });
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.kid {
  height: $safeDistance;
  padding: 0 $text-XS;
  box-sizing: border-box;
  @include flexSpaceBetween;
  background-color: #fff;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;

  z-index: 1;
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