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
    console.log(`id = ${id}`);
    let music = state.music;
    // if (music.id == id) return false;
    try {
      that._vm.$api.getSongUrl({ id }).then((res) => {
        let url = res.data.data[0].url;
        if (!url) {
          that._vm.$vant.Toast("没有版权 / VIP专享");
          return false;
        } else {
          // that.amendStateObjValue({ key: "id", value: id });
          // that.amendStateObjValue({ key: "url", value: url });
          // that.amendStateObjValue({ key: "isPlaying", value: true });
          music.id = id;
          music.url = url;
          music.isPlaying = true;
          console.log(`源 => ${url}`);
          commit("SET_MUSIC", music);
        }
      });
    } catch (error) { }
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