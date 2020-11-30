<template>
  <div class="container">
    <div>
      <cover
        :image="obj.coverImgUrl"
        :name="obj.name"
        :count="obj.playCount"
      ></cover>
    </div>
  </div>
</template>

<script>
import Cover from "@/components/cover";
export default {
  name: "cap",
  components: {
    Cover,
  },
  props: {
    obj: {
      type: Object,
      value: {},
    },
  },
  data: function () {
    return {};
  },
  mounted: function () {},
};
</script>

<style lang="scss" scoped>
</style>