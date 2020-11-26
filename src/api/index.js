
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

// const api = "http://www.mikonchen.top/banner";
let api = "http://49.234.76.196:3000/";

function request(port) {
  const that = this;
  return axios.post(api + port);
}


export default {
  getBanner: () => {
    return request("banner");
  }
}









