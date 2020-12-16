"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _axios = _interopRequireDefault(require("axios"));

var _vueAxios = _interopRequireDefault(require("vue-axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueAxios["default"], _axios["default"]); // const api = "http://www.mikonchen.top/banner";
// let api = "http://49.234.76.196:3000/";


var api = " http://localhost:3000/";

function request(port, parameter) {
  var that = this;
  return _axios["default"].post(api + port, parameter);
}

var _default = {
  getBanner: function getBanner(parameter) {
    // 轮播图
    return request("banner", parameter);
    /**
     * @param type (选)资源类型,0PC, 1android, 2iphone, 3ipad
     */
  },
  getPersonalized: function getPersonalized(parameter) {
    // 推荐歌单
    return request("personalized", parameter);
    /**
     * @param limit (选)取出数量,默认为30(不支持offset)
     */
  },
  getPlaylistDetail: function getPlaylistDetail(parameter) {
    // 推荐歌单
    return request("playlist/detail", parameter);
    /**
     * @param id 歌单 id
     * @param s  (选)歌单最近的s个收藏者,默认为8
     * 说明:歌单能看到歌单名字,但看不到具体歌单内容,调用此接口,传入歌单id,可以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，但是返回的trackIds是完整的，tracks则是不完整的，可拿全部trackIds请求一次song/detail接口获取所有歌曲的详情(https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452)
     */
  },
  getSongDetail: function getSongDetail(parameter) {
    // 获取歌曲详情
    return request("song/detail", parameter);
    /**
     * @param ids 音乐id,如ids=347230
     * 说明:调用此接口,传入音乐id(支持多个id,用,隔开),可获得歌曲详情(注意:歌曲封面现在需要通过专辑内容接口获取)
     */
  },
  getSongUrl: function getSongUrl(parameter) {
    // 获取音乐地址
    return request("song/url", parameter);
    /**
     * @param id 音乐id
     * @param br (选)码率,默认设置了999000即最大码率,如果要320k则可设置为320000,其他类推
     * 说明:使用歌单详情接口后,能得到的音乐的id,但不能得到的音乐url,调用此接口,传入的音乐id(可多个,用逗号隔开),可以获取对应的音乐的url,未登录状态返回试听片段(返回字段包含被截取的正常歌曲的开始时间和结束时间)
     * 注:部分用户反馈获取的url会403,hwaphon找到的解决方案是当获取到音乐的id后，将https://music.163.com/song/media/outer/url?id=id.mp3以src赋予Audio即可播放
     */
  },
  getCalendar: function getCalendar(parameter) {
    // 音乐日历(需要登录)
    return request("calendar", parameter);
    /**
     * @param startTime
     * @param endTime
     * 说明: 登录后调用此接口, 传入开始和结束时间, 可获取音乐日历
     * 调用例子: /calendar?startTime=1606752000000&endTime=1609430399999
     */
  },
  getHomepageBlockPage: function getHomepageBlockPage(parameter) {
    // 首页-发现
    return request("homepage/block/page", parameter);
    /**
     * @param refresh 是否刷新数据,默认为true
     * 说明:调用此接口,可获取APP首页信息
     */
  },
  getHomepageDragonBall: function getHomepageDragonBall(parameter) {
    // 首页-发现-圆形图标入口列表
    return request("homepage/dragon/ball", parameter);
    /**
     * 说明:调用此接口,可获取APP首页圆形图标入口列表
     */
  }
};
exports["default"] = _default;