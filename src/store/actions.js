import { getCookie, setCookie, delCookie, delLocalStorage } from "@/assets/js/util.js";

export default {

  amendStateObjValue({ state, commit }, val = {}) {
    const that = this;
    let { key, value, name } = val;
    // if (!key || !value) return false;
    if (!name) name = "music";
    // console.log(`name = ${name}, key = ${key}, value = ${value}`);

    let obj = state[name];
    obj[key] = value;
    switch (name) {
      case "music":
        commit("SET_MUSIC", obj);
        break;
      case "mv":
        commit("SET_MV", obj);
        break;
    };
  },



  getMusic({ state, commit, actions }, id) {
    const that = this;
    let { music } = state;

    let api = that._vm.$api;
    api.getCheckMusic({ id })
      .then(res => {
        const { success, message } = res.data
        return success ? api.getSongUrl({ id }) : Promise.reject(message);
      })
      .then((res) => {
        let { url } = res.data.data[0];
        if (url) {
          music.id = id;
          music.url = url;
          music.isPlaying = true;
          console.log(`源 => ${url}`);
          commit("SET_MUSIC", music);
        }
      })
      .catch((err) => {
        that._vm.$vant.Toast("亲爱的，暂无版权")
      })
  },



  login({ state, commit }, val = {}) {
    let cookie = val.cookie;
    setCookie("cookie", cookie);
    commit("SET_LOGIN", val);
  },
  logout({ state, commit }) {
    delCookie("cookie");
    delLocalStorage("profile");
    commit("SET_LOGIN", {});
  },




}