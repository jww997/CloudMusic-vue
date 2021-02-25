<template>
  <div class="children">
    <div class="one">登录体验更多精彩</div>
    <div class="two">未注册手机号登录后将自动创建账户</div>
    <div class="telephone">
      <div class="ctcode">+{{ ctcode }}</div>
      <input
        class="input"
        type="text"
        placeholder="请输入手机号码"
        v-model="phone"
      />
      <van-icon class="cross" name="cross" v-if="phone" />
    </div>
    <div class="password">
      <input
        class="input"
        type="password"
        placeholder="请输入密码"
        v-model="password"
      />
      <span class="forget">忘记密码？</span>
    </div>
    <!-- <button class="btn" @click="login">下一步</button> -->
    <button class="btn" @click="login">登录</button>
  </div>
</template>

<script>
import { toPages } from "@/assets/js/util.js";
export default {
  name: "phone",
  data() {
    return {
      phone: "15812811722",
      password: "MI15812811722",
      ctcode: 86,
    };
  },
  methods: {
    login: function () {
      const that = this;
      let phone = that.phone;
      let password = that.password;
      if (!phone || !password) return false;
      that.$api
        .getLoginCellphone({
          phone,
          password,
        })
        .then((res) => {
          that.$vant.Toast.success({
            message: "登录成功",
            forbidClick: true,
          });

          that.$cookie.getCookie("cookie")
            ? that.$cookie.delCookie("cookie")
            : "";
          that.$cookie.setCookie("cookie", res.data.cookie);
          // toPages({ name: "discover" });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~sass/mixins.scss";
@import "~sass/varibles.scss";
.children {
  padding: 0 $text-XS;
  .one {
    font-size: $text-S;
    margin-top: 1rem;
  }
  .two {
    font-size: $text-XS;
    margin-top: $text-XXS;
    margin-bottom: 1rem;
    color: $theme-GRAY;
  }
  .telephone,
  .password {
    font-size: $text-S;
    padding: $text-XXS 0;
    border-bottom: 1px solid $theme-LIGHTGRAY;
    @include flexSpaceBetween;
  }
  .telephone {
    .ctcode,
    .cross {
      flex-shrink: 0;
    }
    .ctcode {
      position: relative;
      padding-right: $text-M;
    }
    .ctcode::after {
      content: "";
      width: 0;
      height: 0;
      border: 5px solid;
      border-color: #000 transparent transparent;
      @include positionCenter;
      left: auto;
      top: 3px;
    }
    .input {
      flex-grow: 1;
      margin: 0 $text-XS;
    }
    .cross {
      color: $theme-GRAY;
    }
  }
  .password {
    margin-top: $text-XS;
    .forget {
      font-size: $text-XS;
      color: $theme-BLUE;
    }
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    border-radius: $text-M;
    padding: $text-XS 0;
    font-size: $text-S;
    background-color: $theme-RED;
    color: $theme-WHITE;
  }
}
</style>