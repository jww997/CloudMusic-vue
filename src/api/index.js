
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

// const api = "http://www.mikonchen.top/banner";
let api = "http://49.234.76.196:3000/";

function request(port, parameter) {
  const that = this;
  return axios.post(api + port, parameter);
}


export default {
  getBanner: parameter => { // 轮播图
    return request("banner", parameter);
    /**
     * @type 资源类型,对应以下类型,默认为 0 即PC
            0: pc
            1: android
            2: iphone
            3: ipad
     */
  },
  getPersonalized: parameter => { // 推荐歌单
    return request("personalized", parameter);
    /**
     * @limit 取出数量 , 默认为 30 (不支持 offset)
     */
  },
  getPlaylistDetail: parameter => { // 推荐歌单
    return request("playlist/detail", parameter);
    /**
     * @id 歌单 id  必选参数
     * @s  歌单最近的 s 个收藏者,默认为8 可选参数
     * 说明 : 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，但是返回的trackIds是完整的，tracks 则是不完整的，可拿全部 trackIds 请求一次 song/detail 接口获取所有歌曲的详情 (https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452)
     */
  }
}









