<template>
  <div class="container">
    <div>播放全部</div>
    <div>
      <div class="song" v-for="(item, index) in obj.tracks" :key="index">
        <div>{{ ++index }}</div>
        <div>
          <p>{{ item.name }}</p>
          <p>{{item.ar[0].name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  props: {
    obj: {
      type: Object,
      value: {},
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~styles/mixins.scss";
@import "~styles/varibles.scss";
.container {
  // @include test;
  .song {
    display: flex;
    // align-content: center;
  }
}
</style>