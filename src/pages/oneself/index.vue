<template>
  <div class="oneself">
    <navbar fixed></navbar>

    <card :level="level" :profile="profile"></card>

    <box :playlist="playlist"></box>

    
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Navbar from "@/common/navbar";
import Card from "./components/card";
import Box from "./components/box";

import Bottombar from "@/common/bottombar";
export default {
  name: "oneself",
  components: {
    Navbar,
    Card,
    Bottombar,
    Box,
  },
  data: function () {
    return { level: 0, profile: {}, playlist: [] };
  },
  computed: {
    ...mapGetters(["login"]),
  },
  mounted: function () {
    const that = this;
    let profile = that.login.profile;

    // let profile = JSON.parse(localStorage.getItem("profile"));
    if (!profile) return false;
    that.$api
      .getUserDetail({ uid: profile.userId })
      .then((res) => {
        that.level = res.data.level;
        that.profile = res.data.profile;
        // that.$api.getUserAccount();

        return that.$api.getUserSubcount();
      })
      .then((res) => {
        return that.$api.getUserPlaylist({
          uid: profile.userId,
        });
      })
      .then((res) => {
        that.playlist = res.data.playlist;
      });
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.oneself {
  background-color: $theme-LIGHTGRAY !important;
}
</style>