<template>
  <div class="mine">
    <searchbar class="searchbar" />
    <van-image :src="qrurl" />
    <button @click="loginEnter">登录</button>
    <button @click="loginOut">退出登录</button>
    <detail :detail="detail" />
    <my-songlist :list="playlist" @handleClick="toPlaylist" />
    <placeholder />
    <placeholder />
  </div>
</template>

<script>
import { getCookie, setCookie, delCookie } from "@/assets/js/util.js";
import {
  getLocalStorage,
  setLocalStorage,
  delLocalStorage
} from "@/assets/js/util.js";
import { toPages } from "@/assets/js/util.js";
import Searchbar from "../discover/components/searchbar";
import Detail from "./detail";
import MySonglist from "./mysonglist";
import Placeholder from "@/components/placeholder";

export default {
  name: "mine",
  components: {
    Searchbar,
    Detail,
    MySonglist,
    Placeholder
  },
  data() {
    return { detail: {}, playlist: [], more: false, qrurl: "" };
  },
  methods: {
    loginEnter() {
      const that = this;
      that.$api
        .getLoginCellphone({
          phone: "15812811722",
          password: "MI15812811722"
        })
        .then(res => {
          const {
            cookie,
            token,
            profile,
            loginType,
            account,
            bindings
          } = res.data;
          setCookie("cookie", cookie);
          setLocalStorage("token", token);
          setLocalStorage("profile", profile);
          setLocalStorage("loginType", loginType);
          setLocalStorage("account", account);
          setLocalStorage("bindings", bindings);
        })
        .then(() => {
          that.getdata();
        });
    },
    loginOut() {
      const that = this;
      that.$api.getLogout().then(res => {
        delCookie("cookie");
        delLocalStorage("token");
        delLocalStorage("profile");
        delLocalStorage("loginType");
        delLocalStorage("account");
        delLocalStorage("bindings");
      });

      that.detail = {};
      that.playlist = [];
      that.more = false;
    },
    getdata() {
      const that = this;
      const { id: uid } = getLocalStorage("account");
      that.$api.getUserDetail({ uid }).then(res => {
        that.detail = res.data;
      });
      that.$api.getUserPlaylist({ uid }).then(res => {
        const { playlist, more } = res.data;
        that.playlist = playlist;
        that.more = more;
      });

      that.$api.getUserBinding({ uid });
    },
    toPlaylist(id) {
      toPages.call(this, { name: "playlist", params: { id } });
    }
  },
  mounted() {
    const that = this;
    that.$api
      .getLoginQrKey()
      .then(res => {
        const { unikey: key } = res.data.data;
        return that.$api.getLoginQrCreate({ key });
      })
      .then(res => {
        that.qrurl = res.data.qrurl;
      });

    if (!getCookie("cookie")) return false;
    this.getdata();
  }
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
.mine {
  .searchbar {
    background-color: transparent;
  }
}
</style>
