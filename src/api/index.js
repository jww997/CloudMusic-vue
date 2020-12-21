
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);


// Vue.config.devtools = true
// axios.defaults.timeout = 5000; // 默认5s超时
// axios.defaults.baseURL = 'http://49.234.76.196:3000/';
// // axios.defaults.baseURL = 'http://localhost:3000/';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const limit = 20;

// const api = "http://www.mikonchen.top/";
// let api = "http://49.234.76.196:3000/";
let api = " http://localhost:3000/";


function request(port, parameter = {}) {
  const that = this;
  port += `?timestamp=${Date.parse(new Date()) / 1000}`;
  parameter.cookie = "__csrf=31ed9189fba0069c1e61e6e73e14fbac; Max-Age=1296010; Expires=Tue, 5 Jan 2021 07:42:06 GMT; Path=/;;MUSIC_U=64d65234a8d5b8547f2b23029b23920535b02604a2d2a0743b50d5d0a4c789f55cb0fcee37c101bd; Max-Age=1296000; Expires=Tue, 5 Jan 2021 07:41:56 GMT; Path=/;;__remember_me=true; Max-Age=1296000; Expires=Tue, 5 Jan 2021 07:41:56 GMT; Path=/;;NMTID=00O-SUleSwRVPxDRkGjg8NsL0r6oVsAAAF2hD9oMQ; Max-Age=315360000; Expires=Thu, 19 Dec 2030 07:41:56 GMT; Path=/;";
  return axios.post(api + port, parameter);

  // return axios(port, { params: parameter });
}


export default {




  getLoginCellphone: parameter => { // 手机登录
    return request("login/cellphone", parameter);
    /**
     * @param phone 手机号码
     * @param password 密码
     * @param countrycode (选)国家码,用于国外手机号登录,例如美国传入:1
     * @param md5_password (选)md5加密后的密码,传入后password将失效
     */
  },

  getLoginStatus: parameter => { // 登录状态
    return request("login/status", parameter);
    /**
     * 说明: 调用此接口, 可获取登录状态
     */
  },
  getUserDetail: parameter => { // 获取用户详情
    return request("user/detail", parameter);
    /**
     * @param uid 用户id
     * 说明:登录后调用此接口,传入用户id,可以获取用户详情
     */
  },
  getUserAccount: parameter => { // 获取账号信息
    return request("user/account", parameter);
    /**
     * 说明:登录后调用此接口,可获取用户账号信息
     */
  },
  getUserSubcount: parameter => { // 获取用户信息,歌单,收藏,mv,dj数量
    return request("user/subcount", parameter);
    /**
     * 说明:登录后调用此接口,可获取用户账号信息
     */
  },
  getUserLevel: parameter => { // 获取用户等级信息
    return request("user/level", parameter);
    /**
     * 说明:登录后调用此接口,可以获取用户等级信息,包含当前登录天数,听歌次数,下一等级需要的登录天数和听歌次数,当前等级进度,对应https://music.163.com/#/user/level
     */
  },










































  getHomepageBlockPage: parameter => { // 首页-发现
    return request("homepage/block/page", parameter);
    /**
     * @param refresh 是否刷新数据,默认为true
     * 说明:调用此接口,可获取APP首页信息
     */
  },
  getHomepageDragonBall: parameter => { // 首页-发现-圆形图标入口列表
    return request("homepage/dragon/ball", parameter);
    /**
     * 说明:调用此接口,可获取APP首页圆形图标入口列表
     */
  },




  getBanner: parameter => { // 轮播图
    return request("banner", parameter);
    /**
     * @param type (选)资源类型,0PC, 1android, 2iphone, 3ipad
     */
  },
  getPersonalized: parameter => { // 推荐歌单
    return request("personalized", parameter);
    /**
     * @param limit (选)取出数量,默认为30(不支持offset)
     */
  },
  getPlaylistDetail: parameter => { // 推荐歌单
    return request("playlist/detail", parameter);
    /**
     * @param id 歌单 id
     * @param s  (选)歌单最近的s个收藏者,默认为8
     * 说明:歌单能看到歌单名字,但看不到具体歌单内容,调用此接口,传入歌单id,可以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，但是返回的trackIds是完整的，tracks则是不完整的，可拿全部trackIds请求一次song/detail接口获取所有歌曲的详情(https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452)
     */
  },
  getSongDetail: parameter => { // 获取歌曲详情
    return request("song/detail", parameter);
    /**
     * @param ids 音乐id,如ids=347230
     * 说明:调用此接口,传入音乐id(支持多个id,用,隔开),可获得歌曲详情(注意:歌曲封面现在需要通过专辑内容接口获取)
     */
  },
  getSongUrl: parameter => { // 获取音乐地址
    return request("song/url", parameter);
    /**
     * @param id 音乐id
     * @param br (选)码率,默认设置了999000即最大码率,如果要320k则可设置为320000,其他类推
     * 说明:使用歌单详情接口后,能得到的音乐的id,但不能得到的音乐url,调用此接口,传入的音乐id(可多个,用逗号隔开),可以获取对应的音乐的url,未登录状态返回试听片段(返回字段包含被截取的正常歌曲的开始时间和结束时间)
     * 注:部分用户反馈获取的url会403,hwaphon找到的解决方案是当获取到音乐的id后，将https://music.163.com/song/media/outer/url?id=id.mp3以src赋予Audio即可播放
     */
  },
  getCalendar: parameter => { // 音乐日历(需要登录)
    return request("calendar", parameter);
    /**
     * @param startTime
     * @param endTime
     * 说明: 登录后调用此接口, 传入开始和结束时间, 可获取音乐日历
     * 调用例子: /calendar?startTime=1606752000000&endTime=1609430399999
     */
  },











}









