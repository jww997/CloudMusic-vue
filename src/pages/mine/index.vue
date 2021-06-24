<template>
  <div class="mine">
    <detail :detail="detail" />
    <my-songlist :list="playlist" @handleClick="toPlaylist" />
    <placeholder />
  </div>
</template>

<script>
import { getCookie, setCookie } from "@/assets/js/util.js";
import { getLocalStorage, setLocalStorage } from "@/assets/js/util.js";
import { toPages } from "@/assets/js/util.js";
import Detail from "./detail";
import MySonglist from "./mysonglist";
import Placeholder from "@/components/placeholder";

export default {
  name: "mine",
  components: {
    Detail,
    MySonglist,
    Placeholder
  },
  data() {
    return { detail: {}, playlist: [], more: false };
  },
  methods: {
    login() {
      this.$api
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
        });
    },
    toPlaylist(id) {
      toPages.call(this, { name: "playlist", params: { id: id } });
    }
  },
  mounted() {
    const that = this;
    console.log(getCookie("cookie")) && that.login();

    const { id: uid } = getLocalStorage("account");
    that.$api.getUserDetail({ uid }).then(res => {
      that.detail = res.data;
    });
    that.$api.getUserPlaylist({ uid }).then(res => {
      const { playlist, more } = res.data;
      that.playlist = playlist;
      that.more = more;
    });
  }
};
</script>

<style lang="scss" scoped>
@import "~sass/var.scss";
@import "~sass/mixins.scss";
</style>
