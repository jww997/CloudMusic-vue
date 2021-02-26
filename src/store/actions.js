import { getCookie, setCookie, delCookie } from "../assets/js/util.js";
export default {

  getMusic() {

  },



  // togglePlayer: function (index) {
  //   const that = this;
  //   that.setPlayerShow(true);
  //   if (typeof index == "number") {
  //     let list = that.obj.tracks;
  //     let current = list[index];
  //     that.setPlayId(current.id);
  //     that.setPlayIndex(index);
  //     that.setPlayList(list);
  //     that.setCurrentSong(current);
  //   }
  // },





  login({ commit, state }, val = {}) {
    const that = this;
    let cookie = val.cookie;
    setCookie("cookie", cookie);
    commit("SET_LOGIN", val);
  },
  logout({ commit, state }) {
    const that = this;
    let login = state.login;
    login.cookie = "";
    delCookie("cookie");
    commit("SET_LOGIN", login);
  },

}