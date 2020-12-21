<template>
  <div class="container">
    <person :status="status" :level="level"></person>
    <application></application>

    <tabbar></tabbar>
  </div>
</template>

<script>
import Tabbar from "@/components/tabbar";
import Person from "./components/person";
import Application from "./components/application";

export default {
  name: "Mine",
  components: {
    Person,
    Tabbar,
    Application,
  },
  data: function () {
    return {
      status: {},
      level: {},
    };
  },
  mounted: function () {
    const that = this;
    that.$api
      .getLoginStatus()
      .then((res) => {
        that.status = res.data.profile;
        return that.$api.getUserLevel();
      })
      .then((res) => {
        that.level = res.data.data;
      });
    // that.$api.getUserAccount();
    // that.$api.getUserSubcount();

    // that.$api.getLoginCellphone({
    //   phone: 15812811722,
    //   password: "MI15812811722",
    // });
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
.container {
  background-color: #eee;
}
</style> 
