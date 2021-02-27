import { getCookie, setCookie, delCookie } from "@/assets/js/util.js";
import vant from "@/assets/js/vant.js";
import api from "@/api";

export default {

  getMusic({ state, commit }, id) {
    const that = this;
    console.log(`id = ${id}`);
    let music = state.music;
    if (music.id == id) return false;
    try {
      api.getSongUrl({ id }).then((res) => {
        let url = res.data.data[0].url;
        if (!url) {
          vant.Toast({
            duration: 3000,
            message: "没有版权 / VIP专享",
          });
        } else {
          music.id = id;
          music.url = url;
          music.isPlaying = true;
          commit("SET_MUSIC", music);
        }
      });
    } catch (error) { }
  },



  login({ state, commit }, val = {}) {
    const that = this;
    let cookie = val.cookie;
    setCookie("cookie", cookie);
    commit("SET_LOGIN", val);
  },
  logout({ state, commit }) {
    const that = this;
    let login = state.login;
    login.cookie = "";
    delCookie("cookie");
    commit("SET_LOGIN", login);
  },

}