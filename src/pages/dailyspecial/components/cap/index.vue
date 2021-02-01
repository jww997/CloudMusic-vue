<template>
  <div class="children">
    <div class="time">
      <span class="date">{{ formatDate(undefined, 4).d }}</span>
      <span class="month">{{ formatDate(undefined, 4).m }}</span>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/assets/js/filter.js";
export default {
  name: "cap",
  methods: {
    formatDate,
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.children {
  height: 4rem;
  padding: $safeDistance 0.3rem 0.2rem;
  background-color: $theme-RED;
  color: $theme-WHITE;
  border-radius: 0 0 30rem 30rem / 1rem;
  box-sizing: border-box;
  @include flexCenter;
  flex-direction: column;
  align-items: flex-start;
  .time {
    @include flexCenter;
    justify-content: flex-start;
    align-items: flex-end;
    .date {
      font-size: $text-L;
    }
    .month {
      font-size: $text-S;
      &::before {
        content: "/";
        margin: $text-XXXS;
      }
    }
  }
}
</style>