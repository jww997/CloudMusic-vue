"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _axios = _interopRequireDefault(require("axios"));

var _getLoginCellphone$ge;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var api = "http://www.mikonchen.top"; // const api = "http://49.234.76.196";

var port = 3000;
var limit = 20;

function request(suffix) {
  var parameter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    // 额外配置项
    isCookie: false // 是否需要登录

  };

  var cookie = _vue["default"].prototype.$cookie.getCookie("cookie");

  config.isCookie && cookie && (parameter.cookie = cookie);
  suffix += "?timestamp=".concat(Date.parse(new Date()) / 1000); // POST请求url必须添加时间戳,使每次请求url不一样,不然请求会被缓存

  return _axios["default"].post("".concat(api, ":").concat(port, "/").concat(suffix), parameter);
}

var _default = (_getLoginCellphone$ge = {
  getLoginCellphone: function getLoginCellphone(parameter) {
    // 手机登录
    return request("login/cellphone", parameter);
    /**
     * @param phone 手机号码
     * @param password 密码
     * @param countrycode (选)国家码,用于国外手机号登录,例如美国传入:1
     * @param md5_password (选)md5加密后的密码,传入后password将失效
     */
  },
  getLogin: function getLogin(parameter) {
    // 邮箱登录
    return request("login", parameter);
    /**
     * @param email 163网易邮箱
     * @param password 密码
     * @param md5_password (选)md5加密后的密码,传入后password将失效
     * 完成登录后,会在浏览器保存一个Cookies用作登录凭证,大部分API都需要用到这个Cookies,非跨域情况请求会自动带上Cookies,跨域情况参考调用前须知
     * v3.30.0后支持手动传入cookie,登录接口返回内容新增cookie字段,保存到本地后,get请求带上?cookie=xxx或者post请求body带上cookie即可,如:/user/cloud?cookie=xxx或者{ ..., cookie: "xxx" }
     */
  },
  getLoginQrKey: function getLoginQrKey(parameter) {
    // 二维码登录 二维码key生成接口
    return request("login/qr/key", parameter);
    /**
     * 说明:调用此接口可生成一个key
     * 说明:二维码登录涉及到3个接口,调用务必带上时间戳,防止缓存
     * 注意:调用登录接口的速度比调用其他接口慢,因为登录过程调用了加密算法
     */
  },
  getLoginQrCreate: function getLoginQrCreate(parameter) {
    // 二维码登录 二维码生成接口
    return request("login/qr/create", parameter);
    /**
     * @param key 由第一个接口生成
     * @param qrimg (选)传入后会额外返回二维码图片base64编码
     * 说明:调用此接口传入上一个接口生成的key可生成二维码图片的base64和二维码信息,可使用base64展示图片,或者使用二维码信息内容自行使用第三方二维码生产库渲染二维码
     * 说明:二维码登录涉及到3个接口,调用务必带上时间戳,防止缓存
     * 注意:调用登录接口的速度比调用其他接口慢,因为登录过程调用了加密算法
     */
  },
  getLoginQrCheck: function getLoginQrCheck(parameter) {
    // 二维码登录 二维码检测扫码状态接口
    return request("login/qr/check", parameter);
    /**
     * @param key 由第一个接口生成
     * @param qrimg (选)传入后会额外返回二维码图片base64编码
     * 说明:轮询此接口可获取二维码扫码状态,800为二维码过期,801为等待扫码,802为待确认,803为授权登录成功(803状态码下会返回cookies)
     * 调用可参考项目文件例子/public/qrlogin.html(访问地址:http://localhost:3000/qrlogin.html)
     * 说明:二维码登录涉及到3个接口,调用务必带上时间戳,防止缓存
     * 注意:调用登录接口的速度比调用其他接口慢,因为登录过程调用了加密算法
     */
  },
  getLoginRefresh: function getLoginRefresh(parameter) {
    // 刷新登录
    return request("login/refresh", parameter);
    /**
     * 说明:调用此接口,可刷新登录状态
     */
  },
  getCaptchaSent: function getCaptchaSent(parameter) {
    // 发送验证码
    return request("captcha/sent", parameter);
    /**
     * @param phone 手机号码
     * @param ctcode (选)国家区号,默认86即中国
     * 说明:调用此接口,传入手机号码,可发送验证码
     */
  },
  getCaptchaVerify: function getCaptchaVerify(parameter) {
    // 验证验证码
    return request("captcha/verify", parameter);
    /**
     * @param phone 手机号码
     * @param captcha 验证码
     * @param ctcode (选)国家区号,默认86即中国
     * 说明:调用此接口,传入手机号码和验证码,可校验验证码是否正确
     */
  },
  getRegisterCellphone: function getRegisterCellphone(parameter) {
    // 注册(修改密码)
    return request("register/cellphone", parameter);
    /**
     * @param phone 手机号码
     * @param captcha 验证码
     * @param password 密码
     * @param nickname 昵称
     * 说明:调用此接口,传入手机号码和验证码,密码,昵称,可注册网易云音乐账号(同时可修改密码)
     */
  },
  getCellphoneExistenceCheck: function getCellphoneExistenceCheck(parameter) {
    // 检测手机号码是否已注册
    return request("cellphone/existence/check", parameter);
    /**
     * @param phone 手机号码
     * @param countrycode (选)国家码，用于国外手机号，例如美国传入：1
     * 说明:调用此接口,可检测手机号码是否已注册
     */
  },
  getActivateInitProfile: function getActivateInitProfile(parameter) {
    // 初始化昵称
    return request("activate/init/profile", parameter);
    /**
     * @param nickname 昵称
     * 说明:刚注册的账号(需登录),调用此接口,可初始化昵称
     */
  },
  getRebind: function getRebind(parameter) {
    // 更换绑定手机
    return request("rebind", parameter);
    /**
     * @param oldcaptcha 原手机验证码
     * @param captcha 新手机验证码
     * @param phone 手机号码
     * @param ctcode 国家区号,默认86即中国
     * 说明:调用此接口,可更换绑定手机(流程:先发送验证码到原手机号码,再发送验证码到新手机号码然后再调用此接口)
     */
  },
  getLogout: function getLogout(parameter) {
    // 退出登录
    return request("logout", parameter);
    /**
     * 说明:调用此接口,可退出登录
     */
  },
  getLoginStatus: function getLoginStatus(parameter) {
    // 登录状态
    return request("login/status", parameter, {
      isCookie: true
    });
    /**
     * 说明: 调用此接口, 可获取登录状态
     */
  },
  getUserDetail: function getUserDetail(parameter) {
    // 获取用户详情
    return request("user/detail", parameter);
    /**
     * @param uid 用户id
     * 说明:登录后调用此接口,传入用户id,可以获取用户详情
     */
  },
  getUserAccount: function getUserAccount(parameter) {
    // 获取账号信息
    return request("user/account", parameter, {
      isCookie: true
    });
    /**
     * 说明:登录后调用此接口,可获取用户账号信息
     */
  },
  getUserSubcount: function getUserSubcount(parameter) {
    // 获取用户信息,歌单,收藏,mv,dj数量
    return request("user/subcount", parameter, {
      isCookie: true
    });
    /**
     * 说明:登录后调用此接口,可获取用户账号信息
     */
  },
  getUserLevel: function getUserLevel(parameter) {
    // 获取用户等级信息
    return request("user/level", parameter);
    /**
     * 说明:登录后调用此接口,可以获取用户等级信息,包含当前登录天数,听歌次数,下一等级需要的登录天数和听歌次数,当前等级进度,对应https://music.163.com/#/user/level
     */
  },
  getUserBinding: function getUserBinding(parameter) {
    // 获取用户绑定信息
    return request("user/binding", parameter);
    /**
     * @param uid 用户id
     * 说明:登录后调用此接口,可以获取用户绑定信息
     */
  },
  getUserReplacephone: function getUserReplacephone(parameter) {
    // 用户绑定手机
    return request("user/replacephone", parameter);
    /**
     * @param phone 手机号码
     * @param oldcaptcha 原手机号码的验证码
     * @param captcha 新手机号码的验证码
     * @param countrycode (选)国家地区代码,默认86
     * 说明:登录后调用此接口,可以更换绑定手机
     */
  },
  getUserUpdate: function getUserUpdate(parameter) {
    // 更新用户信息
    return request("user/update", parameter);
    /**
     * @param gender 性别0:保密1:男性2:女性
     * @param birthday :出生日期 时间戳 unix timestamp
     * @param nickname 用户昵称
     * @param province 省份id
     * @param city 城市id
     * @param signature 用户签名
     * 说明:登录后调用此接口,传入相关信息,可以更新用户信息
     */
  },
  getAvatarUpload: function getAvatarUpload(parameter) {
    // 更新头像
    return request("avatar/upload", parameter);
    /**
     * @param imgSize (选)图片尺寸,默认为300
     * @param imgX (选)水平裁剪偏移,方形图片可不传,默认为0imgY:垂直裁剪偏移,方形图片可不传,默认为0
     * 说明:登录后调用此接口,使用'Content-Type':'multipart/form-data'上传图片formData(name为'imgFile'),可更新头像(参考:https://github.com/Binaryify/NeteaseCloudMusicApi/blob/master/public/avatar_update.html),支持命令行调用,参考module_example目录下`avatar_upload.js`
     */
  },
  getCountriesCodeList: function getCountriesCodeList(parameter) {
    // 国家编码列表
    return request("countries/code/list", parameter);
    /**
     * 说明:调用此接口,可获取国家编码列表
     */
  },
  getUserPlaylist: function getUserPlaylist(parameter) {
    // 获取用户歌单
    return request("user/playlist", parameter);
    /**
     * @param uid 用户id
     * @param limit (选)返回数量,默认为30
     * @param offset (选)偏移数量，用于分页,如:(页数-1)*30,其中30为limit的值,默认为0
     * 说明:登录后调用此接口,传入用户id,可以获取用户歌单
     */
  },
  getPlaylistUpdate: function getPlaylistUpdate(parameter) {
    // 更新歌单
    return request("playlist/update", parameter);
    /**
     * @param id 歌单id
     * @param name 歌单名字
     * @param desc 歌单描述
     * @param tags 歌单tag,多个用`;`隔开,只能用官方规定标签
     * 说明:登录后调用此接口,可以更新用户歌单
     */
  },
  getPlaylistDescUpdate: function getPlaylistDescUpdate(parameter) {
    // 更新歌单描述
    return request("playlist/desc/update", parameter);
    /**
     * @param id 歌单id
     * @param desc 歌单描述
     * 说明:登录后调用此接口,可以单独更新用户歌单描述
     */
  },
  getPlaylistNameUpdate: function getPlaylistNameUpdate(parameter) {
    // 更新歌单名
    return request("playlist/name/update", parameter);
    /**
     * @param id 歌单id
     * @param name 歌单名
     * 说明:登录后调用此接口,可以单独更新用户歌单名
     */
  },
  getPlaylistTagsUpdate: function getPlaylistTagsUpdate(parameter) {
    // 更新歌单标签
    return request("playlist/tags/update", parameter);
    /**
     * @param id 歌单id
     * @param tags 歌单标签
     * 说明:登录后调用此接口,可以单独更新用户歌单标签
     */
  },
  getPlaylistCoverUpdate: function getPlaylistCoverUpdate(parameter) {
    // 歌单封面上传
    return request("playlist/cover/update", parameter);
    /**
     * @param id 歌单id
     * @param imgSize (选)图片尺寸,默认为300
     * @param imgX (选)水平裁剪偏移,方形图片可不传,默认为0imgY:垂直裁剪偏移,方形图片可不传,默认为0
     * 说明:登录后调用此接口,使用'Content-Type':'multipart/form-data'上传图片formData(name为'imgFile'),可更新歌单封面(参考:https://github.com/Binaryify/NeteaseCloudMusicApi/blob/master/public/playlist_cover_update.html)
     */
  },
  getPlaylistOrderUpdate: function getPlaylistOrderUpdate(parameter) {
    // 调整歌单顺序
    return request("playlist/order/update", parameter);
    /**
     * @param ids 歌单id列表 [111,222]
     * 说明:登录后调用此接口,可以根据歌单id顺序调整歌单顺序
     */
  },
  getSongOrderUpdate: function getSongOrderUpdate(parameter) {
    // 调整歌曲顺序
    return request("song/order/update", parameter);
    /**
     * @param pid 歌单id
     * @param ids 歌单id列表 [5268328,1219871]
     * 说明:登录后调用此接口,可以根据歌曲id顺序调整歌曲顺序
     */
  },
  getUserDj: function getUserDj(parameter) {
    // 获取用户电台
    return request("user/dj", parameter);
    /**
     * @param uid 用户id
     * 说明:登录后调用此接口,传入用户id,可以获取用户电台
     */
  },
  getUserFollows: function getUserFollows(parameter) {
    // 获取用户关注列表
    return request("user/follows", parameter);
    /**
     * @param uid 用户id
     * @param limit (选)返回数量,默认为30
     * @param offset (选)偏移数量，用于分页,如:(页数-1)*30,其中30为limit的值,默认为0
     * 说明:登录后调用此接口,传入用户id,可以获取用户关注列表
     */
  },
  getUserFolloweds: function getUserFolloweds(parameter) {
    // 获取用户粉丝列表
    return request("user/followeds", parameter);
    /**
     * @param uid 用户id
     * @param limit (选)返回数量,默认为30
     * @param lasttime (选)返回数据的lasttime,默认-1,传入上一次返回结果的lasttime,将会返回下一页的数据
     * 说明:登录后调用此接口,传入用户id,可以获取用户粉丝列表
     */
  },
  getUserEvent: function getUserEvent(parameter) {
    // 获取用户动态
    return request("user/event", parameter);
    /**
     * @param uid 用户id
     * @param limit (选)返回数量,默认为30
     * @param lasttime (选)返回数据的lasttime,默认-1,传入上一次返回结果的lasttime,将会返回下一页的数据
     * 说明:登录后调用此接口,传入用户id,可以获取用户动态
     * 返回结果的type参数对应:
     * 18     分享单曲
     * 19     分享专辑
     * 17,28  分享电台节目
     * 22     转发
     * 39     发布视频
     * 35,13  分享歌单
     * 24     分享专栏文章
     * 41,21  分享视频
     */
  },
  getEventForward: function getEventForward(parameter) {
    // 转发用户动态
    return request("event/forward", parameter);
    /**
     * @param uid 用户id
     * @param evId 动态id
     * @param forwards 转发的评论
     * 说明:登录后调用此接口,可以转发用户动态
     */
  },
  getEventDel: function getEventDel(parameter) {
    // 删除用户动态
    return request("event/del", parameter);
    /**
     * @param evId 动态id
     * 说明:登录后调用此接口,可以删除用户动态
     */
  },
  getShareResource: function getShareResource(parameter) {
    // 分享歌曲、歌单、mv、电台、电台节目到动态
    return request("share/resource", parameter);
    /**
     * @param id 资源id（歌曲，歌单，mv，电台，电台节目对应id）
     * @param type (选)资源类型，默认歌曲song，可传song,playlist,mv,djradio,djprogram
     * @param msg (选)内容，140字限制，支持emoji，@用户名（/user/follows接口获取的用户名，用户名后和内容应该有空格），图片暂不支持
     * 说明:登录后调用此接口,可以分享歌曲、歌单、mv、电台、电台节目到动态
     */
  },
  getCommentEvent: function getCommentEvent(parameter) {
    // 获取动态评论
    return request("comment/event", parameter);
    /**
     * @param threadId 动态id，可通过/event，/user/event接口获取
     * 说明:登录后调用此接口,可以获取动态下评论
     */
  },
  getFollow: function getFollow(parameter) {
    // 关注/取消关注用户
    return request("follow", parameter);
    /**
     * @param id 用户id
     * @param t 1为关注,其他为取消关注
     * 说明:登录后调用此接口,传入用户id,和操作t,可关注/取消关注用户
     */
  },
  getUserRecord: function getUserRecord(parameter) {
    // 获取用户播放记录
    return request("user/record", parameter);
    /**
     * @param uid 用户id
     * @param type (选)type=1时只返回weekData,type=0时返回allData
     * 说明:登录后调用此接口,传入用户id,可获取用户播放记录
     */
  },
  getHotTopic: function getHotTopic(parameter) {
    // 获取热门话题
    return request("hot/topic", parameter);
    /**
     * @param limit (选)取出评论数量,默认为20
     * @param offset (选)偏移数量,用于分页,如:(评论页数-1)*20,其中20为limit的值
     * 说明:调用此接口,可获取热门话题
     */
  },
  getTopicDetail: function getTopicDetail(parameter) {
    // 获取话题详情
    return request("topic/detail", parameter);
    /**
     * @param limit (选)取出评论数量,默认为20
     * @param offset (选)偏移数量,用于分页,如:(评论页数-1)*20,其中20为limit的值
     * 说明:调用此接口,可获取话题详情
     */
  },
  getTopicDetailEventHot: function getTopicDetailEventHot(parameter) {
    // 获取话题详情热门动态
    return request("topic/detail/event/hot", parameter);
    /**
     * 说明:调用此接口,可获取话题详情热门动态
     */
  },
  getCommentHotwallList: function getCommentHotwallList(parameter) {
    // 云村热评(官方下架,暂不能用)
    return request("comment/hotwall/list", parameter);
    /**
     * 说明:登录后调用此接口,可获取云村热评
     */
  },
  getPlaymodeIntelligenceList: function getPlaymodeIntelligenceList(parameter) {
    // 心动模式/智能播放
    return request("playmode/intelligence/list", parameter);
    /**
     * @param id 歌曲id
     * @param pid 歌单id
     * @param sid (选)要开始播放的歌曲的id
     * 说明:登录后调用此接口,可获取心动模式/智能播放列表
     */
  },
  getEvent: function getEvent(parameter) {
    // 获取动态消息
    return request("event", parameter);
    /**
     * @param pagesize 每页数据,默认20
     * @param lasttime 返回数据的lasttime,默认-1,传入上一次返回结果的lasttime,将会返回下一页的数据
     * 说明:调用此接口,可获取各种动态,对应网页版网易云，朋友界面里的各种动态消息，如分享的视频，音乐，照片等！
     */
  },
  getArtistList: function getArtistList(parameter) {
    // 歌手分类列表
    return request("artist/list", parameter);
    /**
     * @param limit (选)返回数量,默认为30
     * @param offset (选)偏移数量，用于分页,如:如:(页数-1)*30,其中30为limit的值,默认为0initial:按首字母索引查找参数,如/artist/list?type=1&area=96&initial=b返回内容将以name字段开头为b或者拼音开头为b为顺序排列,热门传-1,#传0
     * @param type (选)取值: -1:全部 1:男歌手 2:女歌手 3:乐队
     * @param area (选)取值: -1:全部 7华语 96欧美 8:日本 16韩国 0:其他
     * 说明:调用此接口,可获取歌手分类列表
     */
  },
  getArtistSub: function getArtistSub(parameter) {
    // 收藏/取消收藏歌手
    return request("artist/sub", parameter);
    /**
     * @param id 歌手id
     * @param t 操作,1为收藏,其他为取消收藏
     * 说明:调用此接口,可收藏歌手
     */
  },
  getArtistTopSong: function getArtistTopSong(parameter) {
    // 歌手热门50首歌曲
    return request("artist/top/song", parameter);
    /**
     * @param id 歌手id
     * @param t 操作,1为收藏,其他为取消收藏
     * 说明:调用此接口,可获取歌手热门50首歌曲
     */
  },
  getArtistSongs: function getArtistSongs(parameter) {
    // 歌手全部歌曲
    return request("artist/songs", parameter);
    /**
     * @param id 歌手id
     * @param order (选)hot,time按照热门或者时间排序
     * @param limit (选)取出歌单数量,默认为50
     * @param offset (选)偏移数量,用于分页,如:(评论页数-1)*50,其中50为limit的值
     * 说明:调用此接口,可获取歌手全部歌曲
     */
  },
  getArtistSublist: function getArtistSublist(parameter) {
    // 收藏的歌手列表
    return request("artist/sublist", parameter);
    /**
     * 说明:调用此接口,可获取收藏的歌手列表
     */
  },
  getTopicSublist: function getTopicSublist(parameter) {
    // 收藏的专栏
    return request("topic/sublist", parameter);
    /**
     * @param limit (选)取出歌单数量,默认为50
     * @param offset (选)偏移数量,用于分页,如:(评论页数-1)*50,其中50为limit的值
     * 说明:调用此接口,可获取收藏的专栏
     */
  },
  getVideoSub: function getVideoSub(parameter) {
    // 收藏视频
    return request("video/sub", parameter);
    /**
     * @param id 视频id
     * @param t 1为收藏,其他为取消收藏
     * 说明:调用此接口,可收藏视频
     */
  },
  getMvSub: function getMvSub(parameter) {
    // 收藏/取消收藏MV
    return request("mv/sub", parameter);
    /**
     * @param mvid MVid
     * @param t 1为收藏,其他为取消收藏
     * 说明:调用此接口,可收藏/取消收藏MV
     */
  },
  getMvSublist: function getMvSublist(parameter) {
    // 收藏的MV列表
    return request("mv/subsublist", parameter);
    /**
     * 说明:调用此接口,可获取收藏的MV列表
     */
  },
  getPlaylistCatlist: function getPlaylistCatlist(parameter) {
    // 歌单分类
    return request("playlist/catlist", parameter);
    /**
     * 说明:调用此接口,可获取歌单分类,包含category信息
     */
  },
  getPlaylistHot: function getPlaylistHot(parameter) {
    // 热门歌单分类
    return request("playlist/hot", parameter);
    /**
     * 说明:调用此接口,可获取歌单分类,包含category信息
     */
  },
  getTopPlaylist: function getTopPlaylist(parameter) {
    // 歌单(网友精选碟)
    return request("top/playlist", parameter);
    /**
     * @param order(选)可选值为'new'和'hot',分别对应最新和最热,默认为'hot'
     * @param cat cat:tag,比如"华语"、"古风"、"欧美"、"流行",默认为"全部",可从歌单分类接口获取(/playlist/catlist)
     * @param limit 取出歌单数量,默认为50
     * @param offset 偏移数量,用于分页,如:(评论页数-1)*50,其中50为limit的值
     * 说明:调用此接口,可获取网友精选碟歌单
     */
  },
  getPlaylistHighqualityTags: function getPlaylistHighqualityTags(parameter) {
    // 精品歌单标签列表
    return request("playlist/highquality/tags", parameter);
    /**
     * 说明:调用此接口,可获取精品歌单标签列表
     */
  },
  getTopPlaylistHighquality: function getTopPlaylistHighquality(parameter) {
    // 获取精品歌单
    return request("top/playlist/highquality", parameter);
    /**
     * @param cat (选)比如"华语"、"古风"、"欧美"、"流行",默认为"全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags)
     * @param limit  取出歌单数量,默认为20
     * @param before 分页参数,取上一页最后一个歌单的updateTime获取下一页数据
     * 说明:调用此接口,可获取精品歌单
     */
  },
  getRelatedPlaylist: function getRelatedPlaylist(parameter) {
    // 相关歌单推荐
    return request("related/playlist", parameter);
    /**
     * @param id 歌单id
     * 说明:调用此接口,传入歌单id可获取相关歌单(对应页面https://music.163.com/#/playlist?id=1)
     */
  },
  getPlaylistDetail: function getPlaylistDetail(parameter) {
    // 获取歌单详情
    return request("playlist/detail", parameter, {
      isCookie: true
    });
    /**
     * @param id 歌单id
     * @param s (选)歌单最近的s个收藏者,默认为8
     * 说明:歌单能看到歌单名字,但看不到具体歌单内容,调用此接口,传入歌单id,可以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，但是返回的trackIds是完整的，tracks则是不完整的，可拿全部trackIds请求一次song/detail接口获取所有歌曲的详情(https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452)
     */
  },
  getPlaylistDetailDynamic: function getPlaylistDetailDynamic(parameter) {
    // 歌单详情动态
    return request("playlist/detail/dynamic", parameter);
    /**
     * @param id 歌单id
     * 说明:调用后可获取歌单详情动态部分,如评论数,是否收藏,播放数
     */
  },
  getSongUrl: function getSongUrl(parameter) {
    // 获取音乐地址
    return request("song/url", parameter, {
      isCookie: true
    });
    /**
     * @param id 音乐id
     * @param br (选)码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
     * 说明:使用歌单详情接口后,能得到的音乐的id,但不能得到的音乐url,调用此接口,传入的音乐id(可多个,用逗号隔开),可以获取对应的音乐的url,未登录状态返回试听片段(返回字段包含被截取的正常歌曲的开始时间和结束时间)
     * 注:部分用户反馈获取的url会403,hwaphon找到的解决方案是当获取到音乐的id后，将https://music.163.com/song/media/outer/url?id=id.mp3以src赋予Audio即可播放
     */
  },
  getCheckMusic: function getCheckMusic(parameter) {
    // 音乐是否可用
    return request("check/music", parameter);
    /**
     * @param id 歌曲id
     * @param br (选)码率,默认设置了999000即最大码率,如果要320k则可设置为320000,其他类推
     * 说明:调用此接口,传入歌曲id,可获取音乐是否可用,返回{success:true,message:'ok'}或者{success:false,message:'亲爱的,暂无版权'}
     */
  },
  getSearch: function getSearch(parameter) {
    // 搜索
    return request("search", parameter);
    /**
     * @param keywords 关键词
     * @param limit (选)返回数量,默认为30offset:偏移数量，用于分页,如:如:(页数-1)*30,其中30为limit的值,默认为0
     * @param type (选)搜索类型；默认为1即单曲,取值意义:1:单曲,10:专辑,100:歌手,1000:歌单,1002:用户,1004:MV,1006:歌词,1009:电台,1014:视频,1018:综合
     * 说明:调用此接口,传入搜索关键词可以搜索该音乐/专辑/歌手/歌单/用户,关键词可以多个,以空格隔开,如"周杰伦搁浅"(不需要登录),搜索获取的mp3url不能直接用,可通过/song/url接口传入歌曲id获取具体的播放链接
     */
  },
  getCloudSearch: function getCloudSearch(parameter) {
    // 搜索(更全)
    return request("cloudsearch", parameter);
    /**
     * @param keywords 关键词
     * @param limit (选)返回数量,默认为30offset:偏移数量，用于分页,如:如:(页数-1)*30,其中30为limit的值,默认为0
     * @param type (选)搜索类型；默认为1即单曲,取值意义:1:单曲,10:专辑,100:歌手,1000:歌单,1002:用户,1004:MV,1006:歌词,1009:电台,1014:视频,1018:综合
     * 说明:调用此接口,传入搜索关键词可以搜索该音乐/专辑/歌手/歌单/用户,关键词可以多个,以空格隔开,如"周杰伦搁浅"(不需要登录),搜索获取的mp3url不能直接用,可通过/song/url接口传入歌曲id获取具体的播放链接
     */
  },
  getSearchDefault: function getSearchDefault(parameter) {
    // 默认搜索关键词
    return request("search/default", parameter);
    /**
     * 说明:调用此接口,可获取默认搜索关键词
     */
  },
  getSearchHot: function getSearchHot(parameter) {
    // 热搜列表(简略)
    return request("search/hot", parameter);
    /**
     * 说明:调用此接口,可获取热门搜索列表
     */
  },
  getSearchHotDetail: function getSearchHotDetail(parameter) {
    // 热搜列表(详细)
    return request("search/hot/detail", parameter);
    /**
     * 说明:调用此接口,可获取热门搜索列表
     */
  },
  getSearchHotSuggest: function getSearchHotSuggest(parameter) {
    // 搜索建议
    return request("search/hot/suggest", parameter);
    /**
     * @param keywords 关键词
     * @param type (选)如果传'mobile'则返回移动端数据
     * 说明:调用此接口,传入搜索关键词可获得搜索建议,搜索结果同时包含单曲,歌手,歌单,mv信息
     */
  },
  getSearchHotMultimatch: function getSearchHotMultimatch(parameter) {
    // 搜索多重匹配
    return request("search/hot/multimatch", parameter);
    /**
     * @param keywords 关键词
     * 说明:调用此接口,传入搜索关键词可获得搜索结果
     */
  },
  getPlaylistCreate: function getPlaylistCreate(parameter) {
    // 新建歌单
    return request("playlist/create", parameter);
    /**
     * @param name 歌单名
     * @param privacy 是否设置为隐私歌单，默认否，传'10'则设置成隐私歌单
     * @param type 歌单类型,默认'NORMAL',传'VIDEO'则为视频歌单
     * 说明:调用此接口,传入歌单名字可新建歌单
     */
  },
  getPlaylistDelete: function getPlaylistDelete(parameter) {
    // 删除歌单
    return request("playlist/delete", parameter);
    /**
     * @param id 歌单id,可多个,用逗号隔开
     * 说明:调用此接口,传入歌单id可删除歌单
     */
  },
  getPlaylistSubscribe: function getPlaylistSubscribe(parameter) {
    // 收藏/取消收藏歌单
    return request("playlist/subscribe", parameter);
    /**
     * @param t 类型,1:收藏,2:取消收藏id:歌单id
     * 说明:调用此接口,传入类型和歌单id可收藏歌单或者取消收藏歌单
     */
  },
  getPlaylistSubscribers: function getPlaylistSubscribers(parameter) {
    // 歌单收藏者
    return request("playlist/subscribers", parameter);
    /**
     * @param id 歌单id
     * @param limit 取出评论数量,默认为20
     * @param offset 偏移数量,用于分页,如:(评论页数-1)*20,其中20为limit的值
     * 说明:调用此接口,传入歌单id可获取歌单的所有收藏者
     */
  },
  getPlaylistTracks: function getPlaylistTracks(parameter) {
    // 对歌单添加或删除歌曲
    return request("playlist/tracks", parameter);
    /**
     * @param op 从歌单增加单曲为add,删除为del
     * @param pid 歌单idtracks:歌曲id,可多个,用逗号隔开
     * 说明:调用此接口,可以添加歌曲到歌单或者从歌单删除某首歌曲(需要登录)
     * 调用例子:/playlist/tracks?op=add&pid=24381616&tracks=347231(对应把歌曲添加到'我'的歌单,测试的时候请把这里的pid换成你自己的,id和tracks不对可能会报502错误)
     */
  },
  getPlaylistTrackAdd: function getPlaylistTrackAdd(parameter) {
    // 收藏视频到视频歌单
    return request("playlist/track/add", parameter);
    /**
     * @param pid 歌单id
     * @param ids 视频id,支持多个,用,隔开
     * 说明:调用此接口,可收藏视频到视频歌单(需要登录)
     */
  },
  getPlaylistTrackDelete: function getPlaylistTrackDelete(parameter) {
    // 删除视频歌单里的视频
    return request("playlist/track/delete", parameter);
    /**
     * @param pid 歌单id
     * @param ids 视频id,支持多个,用,隔开
     * 说明:调用此接口,可删除视频歌单里的视频(需要登录)必选参数:
     */
  },
  getPlaylistVideoRecent: function getPlaylistVideoRecent(parameter) {
    // 最近播放的视频
    return request("playlist/video/recent", parameter);
    /**
     * @param pid 歌单id
     * @param ids 视频id,支持多个,用,隔开
     * 说明:调用此接口,可获取最近播放的视频(需要登录)
     */
  },
  getLyric: function getLyric(parameter) {
    // 获取歌词
    return request("lyric", parameter);
    /**
     * @param id 音乐id
     * 说明:调用此接口,传入音乐id可获得对应音乐的歌词(不需要登录)
     */
  },
  getTopSong: function getTopSong(parameter) {
    // 新歌速递
    return request("top/song", parameter);
    /**
     * @param type 地区类型id,对应以下: 全部:0 华语:7 欧美:96 日本:8 韩国:16
     * 说明:调用此接口,可获取新歌速递
     */
  },
  getHomepageBlockPage: function getHomepageBlockPage(parameter) {
    // 首页-发现
    return request("homepage/block/page", parameter, {
      isCookie: true
    });
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
  },
  getCommentMusic: function getCommentMusic(parameter) {
    // 歌曲评论
    return request("comment/music", parameter);
    /**
     * @param id 音乐id
     * @param limit (选)取出评论数量,默认为20
     * @param offset (选)偏移数量,用于分页,如:(评论页数-1)*20,其中20为limit的值
     * @param before (选)分页参数,取上一页最后一项的time获取下一页数据(获取超过5000条评论的时候需要用到)
     * 说明:调用此接口,传入音乐id和limit参数,可获得该音乐的所有评论(不需要登录)
     */
  },
  getCommentFloor: function getCommentFloor(parameter) {
    // 楼层评论
    return request("comment/floor", parameter);
    /**
     * @param parentCommentId 楼层评论id
     * @param id 资源id
     * @param type 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型 0:歌曲 1:mv 2:歌单 3:专辑 4:电台 5:视频
     * @param limit (选)取出评论数量,默认为20
     * @param time (选)分页参数,取上一页最后一项的time获取下一页数据
     * 说明:调用此接口,传入资源parentCommentId和资源类型type和资源id参数,可获得该资源的歌曲楼层评论
     */
  },
  getCommentAlbum: function getCommentAlbum(parameter) {
    // 专辑评论
    return request("comment/album", parameter);
    /**
     * @param id 专辑id
     * @param limit (选)取出评论数量,默认为20
     * @param offset (选)偏移数量,用于分页,如:(评论页数-1)*20,其中20为limit的值
     * @param before (选)分页参数,取上一页最后一项的time获取下一页数据(获取超过5000条评论的时候需要用到)
     * 说明:调用此接口,传入音乐id和limit参数,可获得该专辑的所有评论(不需要登录)
     */
  },
  getCommentPlaylist: function getCommentPlaylist(parameter) {
    // 歌单评论
    return request("comment/playlist", parameter);
    /**
     * @param id 歌单id
     * @param limit (选)取出评论数量,默认为20
     * @param offset (选)偏移数量,用于分页,如:(评论页数-1)*20,其中20为limit的值
     * @param before (选)分页参数,取上一页最后一项的time获取下一页数据(获取超过5000条评论的时候需要用到)
     * 说明:调用此接口,传入音乐id和limit参数,可获得该歌单的所有评论(不需要登录)
     */
  },
  getCommentMv: function getCommentMv(parameter) {
    // mv评论
    return request("comment/mv", parameter);
    /**
     * @param id mvid
     * @param limit (选)取出评论数量,默认为20
     * @param offset (选)偏移数量,用于分页,如:(评论页数-1)*20,其中20为limit的值
     * @param before (选)分页参数,取上一页最后一项的time获取下一页数据(获取超过5000条评论的时候需要用到)
     * 说明:调用此接口,传入音乐id和limit参数,可获得该mv的所有评论(不需要登录)
     */
  },
  getCommentDj: function getCommentDj(parameter) {
    // 电台节目评论
    return request("comment/dj", parameter);
    /**
     * @param id 电台节目的id
     * @param limit (选)取出评论数量,默认为20
     * @param offset (选)偏移数量,用于分页,如:(评论页数-1)*20,其中20为limit的值
     * @param before (选)分页参数,取上一页最后一项的time获取下一页数据(获取超过5000条评论的时候需要用到)
     * 说明:调用此接口,传入音乐id和limit参数,可获得该电台节目的所有评论(不需要登录)
     */
  },
  getCommentVideo: function getCommentVideo(parameter) {
    // 视频评论
    return request("comment/video", parameter);
    /**
     * @param id 视频的id
     * @param limit (选)取出评论数量,默认为20
     * @param offset (选)偏移数量,用于分页,如:(评论页数-1)*20,其中20为limit的值
     * @param before (选)分页参数,取上一页最后一项的time获取下一页数据(获取超过5000条评论的时候需要用到)
     * 说明:调用此接口,传入音乐id和limit参数,可获得该视频的所有评论(不需要登录)
     */
  },
  getCommentHot: function getCommentHot(parameter) {
    // 热门评论
    return request("comment/hot", parameter);
    /**
     * @param id 资源id
     * @param type 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型 0:歌曲 1:mv 2:歌单 3:专辑 4:电台 5:视频
     * @param limit (选)取出评论数量,默认为20
     * @param offset (选)偏移数量,用于分页,如:(评论页数-1)*20,其中20为limit的值
     * @param before (选)分页参数,取上一页最后一项的time获取下一页数据(获取超过5000条评论的时候需要用到)
     * 说明:调用此接口,传入type,资源id可获得对应资源热门评论(不需要登录)
     */
  },
  getCommentNew: function getCommentNew(parameter) {
    // 新版评论接口
    return request("comment/new", parameter);
    /**
     * @param id 资源id,如歌曲id,mvid
     * @param type 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型 0:歌曲 1:mv 2:歌单 3:专辑 4:电台 5:视频 6:动态
     * @param pageNo (选)分页参数,第N页,默认为1
     * @param pageSize (选)分页参数,每页多少条数据,默认20
     * @param sortType (选)1:按推荐排序,2:按热度排序,3:按时间排序
     * @param cursor (选)当sortType为3时且页数不是第一页时需传入,值为上一条数据的time
     * 说明:调用此接口,传入资源类型和资源id,以及排序方式,可获取对应资源的评论
     */
  },
  getCommentLike: function getCommentLike(parameter) {
    // 给评论点赞
    return request("comment/like", parameter);
    /**
     * @param id 资源id,如歌曲id,mvid
     * @param cid 评论id
     * @param t 是否点赞,1为点赞,0为取消点赞
     * @param type 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型 0:歌曲 1:mv 2:歌单 3:专辑 4:电台 5:视频 6:动态
     * 说明:调用此接口,传入type,资源id,和评论idcid和是否点赞参数t即可给对应评论点赞(需要登录)
     * 调用例子:/comment/like?id=29178366&cid=12840183&t=1&type=0对应给https://music.163.com/#/song?id=29178366最热门的评论点赞
     * 注意：动态点赞不需要传入id参数，需要传入动态的threadId参数,如：/comment/like?type=6&cid=1419532712&threadId=A_EV_2_6559519868_32953014&t=0，threadId可通过/event，/user/event接口获取
     */
  },
  getHugComment: function getHugComment(parameter) {
    // 抱一抱评论
    return request("hug/comment", parameter);
    /**
     * @param uid 用户id
     * @param cid 评论id
     * @param sid 资源id
     * 说明:调用此接口,可抱一抱评论
     */
  },
  getCommentHugList: function getCommentHugList(parameter) {
    // 评论抱一抱列表
    return request("comment/hug/list", parameter);
    /**
     * @param uid 用户id
     * @param cid 评论id
     * @param sid 资源id 
     * @param page (选)页数
     * @param cursor (选)上一页返回的cursor,默认-1,第一页不需要传
     * @param idCursor (选)上一页返回的idCursor,默认-1,第一页不需要传
     * @param pageSize (选)每页页数,默认100
     * 说明:调用此接口,可获取评论抱一抱列表
     */
  },
  getComment: function getComment(parameter) {
    // 发送/删除评论
    return request("comment", parameter);
    /**
     * @param t 1发送,2回复
     * @param type 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型 0:歌曲 1:mv 2:歌单 3:专辑 4:电台 5:视频 6:动态
     * @param id 对应资源id 
     * @param content 要发送的内容
     * @param commentId 回复的评论id(回复评论时必填)
     * 说明:调用此接口,可发送评论或者删除评论
     * 调用例子:/comment?t=1&type=1&id=5436712&content=test(往广岛之恋mv发送评论:test)
     * 注意：如给动态发送评论，则不需要传id，需要传动态的threadId,如：/comment?t=1&type=6&threadId=A_EV_2_6559519868_32953014&content=test
     */
  }
}, _defineProperty(_getLoginCellphone$ge, "getComment", function getComment(parameter) {
  // 删除评论
  return request("comment", parameter);
  /**
   * @param t 0删除
   * @param type 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型 0:歌曲 1:mv 2:歌单 3:专辑 4:电台 5:视频 6:动态
   * @param id 对应资源idcontent:内容id,可通过/comment/mv等接口获取
   * 调用例子:/comment?t=0&type=1&id=5436712&commentId=1535550516319(在广岛之恋mv删除评论)
   * 注意：如给动态删除评论，则不需要传id，需要传动态的`threadId`,如：`/comment?t=0&type=6&threadId=A_EV_2_6559519868_32953014&commentId=1419516382`
   */
}), _defineProperty(_getLoginCellphone$ge, "getBanner", function getBanner(parameter) {
  // banner
  return request("banner", parameter, {
    isCookie: true
  });
  /**
   * @param type (选)资源类型,0PC, 1android, 2iphone, 3ipad
   */
}), _defineProperty(_getLoginCellphone$ge, "getResourceLike", function getResourceLike(parameter) {
  // 资源点赞(MV,电台,视频)
  return request("resource/like", parameter);
  /**
   * @param type 资源类型,对应以下类型 1:mv 4:电台 5:视频 6:动态
   * @param t 操作,1为点赞,其他未取消点赞
   * @param id 资源id
   * 说明:调用此接口,可对MV,电台,视频点赞
   * 注意：如给动态点赞，不需要传入id，需要传入threadId,可通过event,/user/event接口获取，如：/resource/like?t=1&type=6&threadId=A_EV_2_6559519868_32953014
   */
}), _defineProperty(_getLoginCellphone$ge, "getPlaylistMylike", function getPlaylistMylike(parameter) {
  // 获取点赞过的视频
  return request("playlist/mylike", parameter);
  /**
   * 说明:调用此接口,可获取获取点赞过的视频
   */
}), _defineProperty(_getLoginCellphone$ge, "getSongDetail", function getSongDetail(parameter) {
  // 获取歌曲详情
  return request("song/detail", parameter);
  /**
   * @param ids 音乐id,如ids=347230
   * 说明:调用此接口,传入音乐id(支持多个id,用,隔开),可获得歌曲详情(注意:歌曲封面现在需要通过专辑内容接口获取)
   */
}), _defineProperty(_getLoginCellphone$ge, "getAlbum", function getAlbum(parameter) {
  // 获取专辑内容
  return request("album", parameter);
  /**
   * @param id 专辑id
   * 说明:调用此接口,传入专辑id,可获得专辑内容
   */
}), _defineProperty(_getLoginCellphone$ge, "getAlbumDetailDynamic", function getAlbumDetailDynamic(parameter) {
  // 专辑动态信息
  return request("album/detail/dynamic", parameter);
  /**
   * @param id 专辑id
   * 说明:调用此接口,传入专辑id,可获得专辑动态信息,如是否收藏,收藏数,评论数,分享数
   */
}), _defineProperty(_getLoginCellphone$ge, "getAlbumSub", function getAlbumSub(parameter) {
  // 收藏/取消收藏专辑
  return request("album/sub", parameter);
  /**
   * @param id 专辑id
   * @param t 1为收藏,其他为取消收藏
   * 说明:调用此接口,可收藏/取消收藏专辑
   * 调用例子:/album/sub?t=1/album/sub?t=0
   */
}), _defineProperty(_getLoginCellphone$ge, "getAlbumSublist", function getAlbumSublist(parameter) {
  // 获取已收藏专辑列表
  return request("album/sublist", parameter);
  /**
   * @param limit (选)取出数量,默认为25
   * @param offset (选)偏移数量,用于分页,如:(页数-1)*25,其中25为limit的值,默认为0
   * 说明:调用此接口,可获得已收藏专辑列表
   */
}), _defineProperty(_getLoginCellphone$ge, "getArtists", function getArtists(parameter) {
  // 获取歌手单曲
  return request("artists", parameter);
  /**
   * @param id 歌手id,可由搜索接口获得
   * 说明:调用此接口,传入歌手id,可获得歌手部分信息和热门歌曲
   */
}), _defineProperty(_getLoginCellphone$ge, "getArtistMv", function getArtistMv(parameter) {
  // 获取歌手mv
  return request("artist/mv", parameter);
  /**
   * @param id 歌手id,可由搜索接口获得
   * 说明:调用此接口,传入歌手id,可获得歌手mv信息,具体mv播放地址可调用/mv传入此接口获得的mvid来拿到,如:/artist/mv?id=6452,/mv?mvid=5461064
   */
}), _defineProperty(_getLoginCellphone$ge, "getArtistAlbum", function getArtistAlbum(parameter) {
  // 获取歌手专辑
  return request("artist/album", parameter);
  /**
   * @param id 歌手id
   * @param limit (选)取出数量,默认为50
   * @param offset (选)偏移数量,用于分页,如:(页数-1)*50,其中50为limit的值,默认为0
   * 说明:调用此接口,传入歌手id,可获得歌手专辑内容
   */
}), _defineProperty(_getLoginCellphone$ge, "getArtistDesc", function getArtistDesc(parameter) {
  // 获取歌手描述
  return request("artist/desc", parameter);
  /**
   * @param id 歌手id
   * 说明:调用此接口,传入歌手id,可获得歌手描述
   */
}), _defineProperty(_getLoginCellphone$ge, "getArtistDetail", function getArtistDetail(parameter) {
  // 获取歌手详情
  return request("artist/detail", parameter);
  /**
   * @param id 歌手id
   * @param limit (选)取出数量,默认为50
   * @param offset (选)偏移数量,用于分页,如:(页数-1)*50,其中50为limit的值,默认为0
   * 说明:调用此接口,传入歌手id,可获得获取歌手详情
   */
}), _defineProperty(_getLoginCellphone$ge, "getSimiArtist", function getSimiArtist(parameter) {
  // 获取相似歌手
  return request("simi/artist", parameter);
  /**
   * @param id 歌手id
   * 说明:调用此接口,传入歌手id,可获得相似歌手
   */
}), _defineProperty(_getLoginCellphone$ge, "getSimiPlaylist", function getSimiPlaylist(parameter) {
  // 获取相似歌单
  return request("simi/playlist", parameter);
  /**
   * @param id 歌曲id
   * 说明:调用此接口,传入歌曲id,可获得相似歌单
   */
}), _defineProperty(_getLoginCellphone$ge, "getSimiMv", function getSimiMv(parameter) {
  // 相似mv
  return request("simi/mv", parameter);
  /**
   * @param mvid mvid
   * 说明:调用此接口,传入mvid可获取相似mv
   */
}), _defineProperty(_getLoginCellphone$ge, "getSimiSong", function getSimiSong(parameter) {
  // 获取相似音乐
  return request("simi/song", parameter);
  /**
   * @param id 歌曲id
   * 说明:调用此接口,传入歌曲id,可获得相似歌曲
   */
}), _defineProperty(_getLoginCellphone$ge, "getSimiUser", function getSimiUser(parameter) {
  // 获取最近5个听了这首歌的用户
  return request("simi/user", parameter);
  /**
   * @param id 歌曲id
   * 说明:调用此接口,传入歌曲id,最近5个听了这首歌的用户
   */
}), _defineProperty(_getLoginCellphone$ge, "getRecommendResource", function getRecommendResource(parameter) {
  // 获取每日推荐歌单(需要登录)
  return request("recommend/resource", parameter, {
    isCookie: true
  });
  /**
   * 说明:调用此接口,可获得每日推荐歌单
   */
}), _defineProperty(_getLoginCellphone$ge, "getRecommendSongs", function getRecommendSongs(parameter) {
  // 获取每日推荐歌曲(需要登录)
  return request("recommend/songs", parameter, {
    isCookie: true
  });
  /**
   * 说明:调用此接口,可获得每日推荐歌曲
   */
}), _defineProperty(_getLoginCellphone$ge, "getHistoryRecommendSongs", function getHistoryRecommendSongs(parameter) {
  // 获取历史日推可用日期列表
  return request("history/recommend/songs", parameter, {
    isCookie: true
  });
  /**
   * 说明:调用此接口,可获得历史日推可用日期列表
   */
}), _defineProperty(_getLoginCellphone$ge, "getHistoryRecommendSongsDetail", function getHistoryRecommendSongsDetail(parameter) {
  // 获取历史日推详情数据
  return request("history/recommend/songs/detail", parameter, {
    isCookie: true
  });
  /**
   * @param date 日期,通过历史日推可用日期列表接口获取,不能任意日期
   * 说明:调用此接口,传入当日日期,可获得当日历史日推数据
   */
}), _defineProperty(_getLoginCellphone$ge, "getPersonalFm", function getPersonalFm(parameter) {
  // 私人FM
  return request("personal_fm", parameter, {
    isCookie: true
  });
  /**
   * 说明:私人FM(需要登录)
   */
}), _defineProperty(_getLoginCellphone$ge, "getDailySignin", function getDailySignin(parameter) {
  // 签到
  return request("daily_signin", parameter, {
    isCookie: true
  });
  /**
   * @param type (选)签到类型,默认0,其中0为安卓端签到,1为web/PC签到
   * 说明:调用此接口,传入签到类型(可不传,默认安卓端签到),可签到(需要登录),其中安卓端签到可获得3点经验,web/PC端签到可获得2点经验
   */
}), _defineProperty(_getLoginCellphone$ge, "getLike", function getLike(parameter) {
  // 喜欢音乐
  return request("like", parameter);
  /**
   * @param id 歌曲id
   * @param like (选)布尔值,默认为true即喜欢,若传false,则取消喜欢
   * 说明:调用此接口,传入音乐id,可喜欢该音乐 喜欢成功则返回数据的code为200,其余为失败
   */
}), _defineProperty(_getLoginCellphone$ge, "getLikelist", function getLikelist(parameter) {
  // 喜欢音乐列表
  return request("likelist", parameter);
  /**
   * @param uid 用户id
   * 说明:调用此接口,传入用户id,可获取已喜欢音乐id列表(id数组)
   */
}), _defineProperty(_getLoginCellphone$ge, "getFmTrash", function getFmTrash(parameter) {
  // 垃圾桶
  return request("fm_trash", parameter);
  /**
   * @param id 歌曲id
   * 说明:调用此接口,传入音乐id,可把该音乐从私人FM中移除至垃圾桶
   */
}), _defineProperty(_getLoginCellphone$ge, "getTopAlbum", function getTopAlbum(parameter) {
  // 新碟上架
  return request("top/album", parameter);
  /**
   * @param limit (选)取出数量,默认为50
   * @param offset (选)偏移数量,用于分页,如:(页数-1)*50,其中50为limit的值,默认为0
   * @param area (选)ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
   * @param type (选)new:全部hot:热门,默认为new
   * @param year (选)年,默认本年
   * @param month (选)月,默认本月
   * 说明:调用此接口,可获取新碟上架列表,如需具体音乐信息需要调用获取专辑列表接口/album,然后传入id,如/album?id=32311&limit=30
   */
}), _defineProperty(_getLoginCellphone$ge, "getAlbumNew", function getAlbumNew(parameter) {
  // 全部新碟
  return request("album/new", parameter);
  /**
   * @param limit (选)取出数量,默认为50
   * @param offset (选)偏移数量,用于分页,如:(页数-1)*50,其中50为limit的值,默认为0
   * @param area (选)ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
   * 说明:登录后调用此接口,可获取全部新碟
   */
}), _defineProperty(_getLoginCellphone$ge, "getAlbumNewest", function getAlbumNewest(parameter) {
  // 最新专辑
  return request("album/newest", parameter);
  /**
   * 说明:调用此接口，获取云音乐首页新碟上架数据
   */
}), _defineProperty(_getLoginCellphone$ge, "getScrobble", function getScrobble(parameter) {
  // 听歌打卡
  return request("scrobble", parameter);
  /**
   * @param id 歌曲id,sourceid:歌单或专辑id
   * @param time (选)歌曲播放时间,单位为秒
   * 说明:调用此接口,传入音乐id,来源id，歌曲时间time，更新听歌排行数据
   */
}), _defineProperty(_getLoginCellphone$ge, "getTopArtists", function getTopArtists(parameter) {
  // 热门歌手
  return request("top/artists", parameter);
  /**
   * @param limit (选)取出数量,默认为50
   * @param offset (选)偏移数量,用于分页,如:(页数-1)*50,其中50为limit的值,默认为0
   * 说明:调用此接口,可获取热门歌手数据
   */
}), _defineProperty(_getLoginCellphone$ge, "getMvAll", function getMvAll(parameter) {
  // 全部mv
  return request("mv/all", parameter);
  /**
   * @param area (选)地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部type:类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
   * @param order (选)排序,可选值为上升最快,最热,最新,不填则为上升最快
   * @param limit (选)取出数量,默认为30
   * @param offset (选)偏移数量,用于分页,如:(页数-1)*50,其中50为limit的值,默认为0
   * 说明:调用此接口,可获取全部mv
   */
}), _defineProperty(_getLoginCellphone$ge, "getMvFirst", function getMvFirst(parameter) {
  // 最新mv
  return request("mv/first", parameter);
  /**
   * @param area (选)地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
   * @param limit (选)取出数量,默认为30
   * 说明:调用此接口,可获取最新mv
   */
}), _defineProperty(_getLoginCellphone$ge, "getMvExclusiveRcmd", function getMvExclusiveRcmd(parameter) {
  // 网易出品mv
  return request("mv/exclusive/rcmd", parameter);
  /**
   * @param limit (选)取出数量,默认为30
   * @param offset (选)偏移数量,用于分页,如:(页数-1)*30,其中30为limit的值,默认为0
   * 说明:调用此接口,可获取网易出品mv
   */
}), _defineProperty(_getLoginCellphone$ge, "getPersonalizedMv", function getPersonalizedMv(parameter) {
  // 推荐mv
  return request("personalized/mv", parameter);
  /**
   * 说明:调用此接口,可获取推荐mv
   */
}), _defineProperty(_getLoginCellphone$ge, "getPersonalized", function getPersonalized(parameter) {
  // 推荐歌单
  return request("personalized", parameter);
  /**
   * @param limit (选)取出数量,默认为30(不支持offset)
   */
}), _defineProperty(_getLoginCellphone$ge, "getPersonalizedNewsong", function getPersonalizedNewsong(parameter) {
  // 推荐新音乐
  return request("personalized/newsong", parameter);
  /**
   * @param limit (选)取出数量,默认为10(不支持offset)
   * 说明:调用此接口,可获取推荐新音乐
   */
}), _defineProperty(_getLoginCellphone$ge, "getPersonalizedDjprogram", function getPersonalizedDjprogram(parameter) {
  // 推荐电台
  return request("personalized/djprogram", parameter);
  /**
   * 说明:调用此接口,可获取推荐电台
   */
}), _defineProperty(_getLoginCellphone$ge, "getPersonalizedRecommend", function getPersonalizedRecommend(parameter) {
  // 推荐电台
  return request("personalized/recommend", parameter);
  /**
   * 说明:调用此接口,可获取推荐电台
   */
}), _defineProperty(_getLoginCellphone$ge, "getPersonalizedPrivatecontent", function getPersonalizedPrivatecontent(parameter) {
  // 独家放送(入口列表)
  return request("personalized/privatecontent", parameter);
  /**
   * 说明:调用此接口,可获取独家放送
   */
}), _defineProperty(_getLoginCellphone$ge, "getPersonalizedPrivatecontentList", function getPersonalizedPrivatecontentList(parameter) {
  // 独家放送列表
  return request("personalized/privatecontent/list", parameter);
  /**
   * @param limit 返回数量,默认为60
   * @param offset 偏移数量，用于分页,如:(页数-1)*60,其中60为limit的值,默认为0
   * 说明:调用此接口,可获取独家放送列表
   */
}), _defineProperty(_getLoginCellphone$ge, "getTopMv", function getTopMv(parameter) {
  // mv排行
  return request("top/mv", parameter);
  /**
   * @param limit (选)取出数量,默认为30
   * @param area (选)地区,可选值为内地,港台,欧美,日本,韩国,不填则为全部
   * @param offset (选)偏移数量,用于分页,如:(页数-1)*30,其中30为limit的值,默认为0
   * 说明:调用此接口,可获取mv排行
   */
}), _defineProperty(_getLoginCellphone$ge, "getMvDetail", function getMvDetail(parameter) {
  // 获取mv数据
  return request("mv/detail", parameter);
  /**
   * @param mvid MVid
   * 说明:调用此接口,传入mvid(在搜索音乐的时候传type=1004获得),可获取对应MV数据,数据包含mv名字,歌手,发布时间,mv视频地址等数据,其中mv视频网易做了防盗链处理,可能不能直接播放,需要播放的话需要调用'mv地址'接口
   */
}), _defineProperty(_getLoginCellphone$ge, "getMvDetailInfo", function getMvDetailInfo(parameter) {
  // 获取mv点赞转发评论数数据
  return request("mv/detail/info", parameter);
  /**
   * @param mvid MVid
   * 说明:调用此接口,传入mvid(在搜索音乐的时候传type=1004获得),可获取对应MV点赞转发评论数数据
   */
}), _defineProperty(_getLoginCellphone$ge, "getMvUrl", function getMvUrl(parameter) {
  // mv地址
  return request("mv/url", parameter);
  /**
   * @param id mvid
   * @param r (选)分辨率,默认1080,可从/mv/detail接口获取分辨率列表
   * 说明:调用此接口,传入mvid,可获取mv播放地址
   */
}), _defineProperty(_getLoginCellphone$ge, "getVideoGroupList", function getVideoGroupList(parameter) {
  // 获取视频标签列表
  return request("video/group/list", parameter);
  /**
   * 说明:调用此接口,可获取视频标签列表
   */
}), _defineProperty(_getLoginCellphone$ge, "getVideoCategoryList", function getVideoCategoryList(parameter) {
  // 获取视频分类列表
  return request("video/category/list", parameter);
  /**
   * 说明:调用此接口,可获取视频分类列表
   */
}), _defineProperty(_getLoginCellphone$ge, "getVideoGroup", function getVideoGroup(parameter) {
  // 获取视频标签/分类下的视频
  return request("video/group", parameter);
  /**
   * @param id videoGroup的id
   * @param offset (选)默认0
   * 说明:调用此接口,传入标签/分类id,可获取到相关的视频,分页参数只能传入offset
   */
}), _defineProperty(_getLoginCellphone$ge, "getVideoTimelineAll", function getVideoTimelineAll(parameter) {
  // 获取全部视频列表
  return request("video/timeline/all", parameter);
  /**
   * @param offset (选)默认0
   * 说明:调用此接口,可获取视频分类列表,分页参数只能传入offset
   */
}), _defineProperty(_getLoginCellphone$ge, "getVideoTimelineRecommend", function getVideoTimelineRecommend(parameter) {
  // 获取推荐视频
  return request("video/timeline/recommend", parameter);
  /**
   * @param offset (选)默认0
   * 说明:调用此接口,可获取推荐视频,分页参数只能传入offset
   */
}), _defineProperty(_getLoginCellphone$ge, "getRelatedAllvideo", function getRelatedAllvideo(parameter) {
  // 相关视频
  return request("related/allvideo", parameter);
  /**
   * @param id 视频的id
   * 说明:调用此接口,可获取相关视频
   */
}), _defineProperty(_getLoginCellphone$ge, "getVideoDetail", function getVideoDetail(parameter) {
  // 视频详情
  return request("video/detail", parameter);
  /**
   * @param id 视频的id
   * 说明:调用此接口,可获取视频详情
   */
}), _defineProperty(_getLoginCellphone$ge, "getVideoDetailInfo", function getVideoDetailInfo(parameter) {
  // 获取视频点赞转发评论数数据
  return request("video/detail/info", parameter);
  /**
   * 说明:调用此接口,传入vid(视频id),可获取对应视频点赞转发评论数数据必选参数:vid:视频id
   */
}), _defineProperty(_getLoginCellphone$ge, "getVideoUrl", function getVideoUrl(parameter) {
  // 获取视频播放地址
  return request("video/url", parameter);
  /**
   * @param id 视频的id
   * 说明:调用此接口,传入视频id,可获取视频播放地址
   */
}), _defineProperty(_getLoginCellphone$ge, "getToplist", function getToplist(parameter) {
  // 所有榜单
  return request("toplist", parameter);
  /**
   * 说明:调用此接口,可获取所有榜单接口地址:/toplist
   */
}), _defineProperty(_getLoginCellphone$ge, "getTopList", function getTopList(parameter) {
  // 排行榜详情
  return request("top/list", parameter);
  /**
   * @param id 榜单id,通过所有榜单接口获取
   * 说明:请使用歌单详情接口,传入排行榜id获取排行榜详情数据(排行榜也是歌单的一种)
   * 说明:调用此接口,传入榜单id,可获取不同排行榜数据(v3.34.0之后不再支持idx参数)
   */
}), _defineProperty(_getLoginCellphone$ge, "getToplistDetail", function getToplistDetail(parameter) {
  // 所有榜单内容摘要
  return request("toplist/detail", parameter);
  /**
   * 说明:调用此接口,可获取所有榜单内容摘要
   */
}), _defineProperty(_getLoginCellphone$ge, "getToplistArtist", function getToplistArtist(parameter) {
  // 歌手榜
  return request("toplist/artist", parameter);
  /**
   * @param type (选)地区 1:华语 2:欧美 3:韩国 4:日本
   * 说明:调用此接口,可获取排行榜中的歌手榜
   */
}), _defineProperty(_getLoginCellphone$ge, "getUserCloud", function getUserCloud(parameter) {
  // 云盘
  return request("user/cloud", parameter);
  /**
   * @param limit (选)返回数量,默认为200
   * @param offset (选)偏移数量，用于分页,如:(页数-1)*200,其中200为limit的值,默认为0
   * 说明:登录后调用此接口,可获取云盘数据,获取的数据没有对应url,需要再调用一次/song/url获取url
   */
}), _defineProperty(_getLoginCellphone$ge, "getUserCloudDetail", function getUserCloudDetail(parameter) {
  // 云盘数据详情
  return request("user/cloud/detail", parameter);
  /**
   * @param id 歌曲id,可多个,用逗号隔开
   * 说明:登录后调用此接口,传入云盘歌曲id，可获取云盘数据详情
   */
}), _defineProperty(_getLoginCellphone$ge, "getUserCloudDel", function getUserCloudDel(parameter) {
  // 云盘歌曲删除
  return request("user/cloud/del", parameter);
  /**
   * @param id 歌曲id,可多个,用逗号隔开
   * 说明:登录后调用此接口,可删除云盘歌曲
   */
}), _defineProperty(_getLoginCellphone$ge, "getCloud", function getCloud(parameter) {
  // 云盘上传
  return request("cloud", parameter);
  /**
   * 说明:登录后调用此接口,使用'Content-Type':'multipart/form-data'上传mp3formData(name为'songFile'),可上传歌曲到云盘
   * 参考:https://github.com/Binaryify/NeteaseCloudMusicApi/blob/master/public/cloud.html
   * 访问地址:http://localhost:3000/cloud.html)
   * 支持命令行调用,参考module_example目录下song_upload.js
   */
}), _defineProperty(_getLoginCellphone$ge, "getMsgPrivate", function getMsgPrivate(parameter) {
  // 通知-私信
  returnrequest("msg/private", parameter);
  /**
   * @param limit (选)返回数量,默认为30
   * @param offset (选)偏移数量，用于分页,如:(页数-1)*30,其中30为limit的值,默认为0
   * 说明:登录后调用此接口,可获取私信
   */
}), _defineProperty(_getLoginCellphone$ge, "getSendText", function getSendText(parameter) {
  // 发送私信
  returnrequest("send/text", parameter);
  /**
   * @param user_ids 用户id,多个需用逗号隔开
   * @param msg 要发送的信息
   * 说明:登录后调用此接口,传入用户id和要发送的信息,可以发送私信,返回内容为历史私信,包含带歌单的私信信息(注:不能发送私信给自己)
   * 调用例子:/send/text?user_ids=32953014&msg=test,/send/text?user_ids=32953014,475625142&msg=test
   */
}), _defineProperty(_getLoginCellphone$ge, "getSendSong", function getSendSong(parameter) {
  // 发送私信音乐
  returnrequest("send/song", parameter);
  /**
   * @param user_ids 用户id,多个需用逗号隔开
   * @param msg 要发送的信息
   * 说明:登录后调用此接口,传入用户id和要发送的信息,音乐id,可以发送音乐私信,返回内容为历史私信
   * 调用例子:/send/song?user_ids=1&id=351318&msg=测试
   */
}), _defineProperty(_getLoginCellphone$ge, "getSendPlaylist", function getSendPlaylist(parameter) {
  // 发送私信(带歌单)
  returnrequest("send/playlist", parameter);
  /**
   * @param user_ids 用户id,多个需用逗号隔开
   * @param msg 要发送的信息
   * 说明:登录后调用此接口,传入用户id和要发送的信息和歌单id,可以发送带歌单的私信(注:不能发送重复的歌单)
   * 调用例子:/send/playlist?msg=test&user_ids=475625142&playlist=705123491,/send/playlist?msg=test2&user_ids=475625142,32953014&playlist=705123493
   */
}), _defineProperty(_getLoginCellphone$ge, "getMsgRecentcontact", function getMsgRecentcontact(parameter) {
  // 最近联系人
  returnrequest("msg/recentcontact", parameter);
  /**
   * 说明:登录后调用此接口,可获取最接近联系人
   */
}), _defineProperty(_getLoginCellphone$ge, "getMsgPrivateHistory", function getMsgPrivateHistory(parameter) {
  // 私信内容
  returnrequest("msg/private/history", parameter);
  /**
   * @param uid 用户id
   * @param limit (选)返回数量,默认为30
   * @param before (选)分页参数,取上一页最后一项的time获取下一页数据
   * 说明:登录后调用此接口,可获取私信内容
   */
}), _defineProperty(_getLoginCellphone$ge, "getMsgComments", function getMsgComments(parameter) {
  // 通知-评论
  returnrequest("msg/comments", parameter);
  /**
   * @param uid 用户的id，只能和登录账号的id一致
   * @param limit (选)返回数量,默认为30
   * @param before (选)分页参数,取上一页最后一个歌单的updateTime获取下一页数据
   * 说明:登录后调用此接口,可获取评论
   */
}), _defineProperty(_getLoginCellphone$ge, "getMsgForwards", function getMsgForwards(parameter) {
  // 通知-@我
  returnrequest("msg/forwards", parameter);
  /**
   * @param limit (选)返回数量,默认为30
   * @param offset (选)偏移数量，用于分页,如:(页数-1)*30,其中30为limit的值,默认为0
   * 说明:登录后调用此接口,可获取 @ 我数据
   */
}), _defineProperty(_getLoginCellphone$ge, "getMsgNotices", function getMsgNotices(parameter) {
  // 通知-通知
  returnrequest("msg/notices", parameter);
  /**
   * @param limit (选)返回数量,默认为30
   * @param lasttime (选)返回数据的time,默认-1,传入上一次返回结果的time,将会返回下一页的数据
   * 说明:登录后调用此接口,可获取通知
   */
}), _defineProperty(_getLoginCellphone$ge, "getSetting", function getSetting(parameter) {
  // 设置
  returnrequest("setting", parameter);
  /**
   * 说明:登录后调用此接口,可获取用户设置
   */
}), _defineProperty(_getLoginCellphone$ge, "getAlbumList", function getAlbumList(parameter) {
  // 数字专辑-新碟上架
  returnrequest("album/list", parameter);
  /**
   * @param limit (选)返回数量,默认为30
   * @param offset (选)偏移数量，用于分页,如:(页数-1)*30,其中30为limit的值,默认为0
   * 说明:调用此接口,可获取数字专辑-新碟上架
   */
}), _defineProperty(_getLoginCellphone$ge, "getAlbum_songsaleboard", function getAlbum_songsaleboard(parameter) {
  // 数字专辑&数字单曲-榜单
  returnrequest("album_songsaleboard", parameter);
  /**
   * @param limit (选)返回数量,默认为30
   * @param offset (选)偏移数量，用于分页,如:(页数-1)*30,其中30为limit的值,默认为0
   * @param albumType (选)为数字专辑,1为数字单曲
   * @param type (选)daily:日榜,week:周榜,year:年榜,total:总榜
   * 说明:调用此接口,可获取数字专辑&数字单曲-榜单
   */
}), _defineProperty(_getLoginCellphone$ge, "getAlbumListStyle", function getAlbumListStyle(parameter) {
  // 数字专辑-语种风格馆
  returnrequest("album/list/style", parameter);
  /**
   * @param limit (选)返回数量,默认为30
   * @param offset (选)偏移数量，用于分页,如:(页数-1)*30,其中30为limit的值,默认为0
   * @param area地区Z_H (选)华语,E_A:欧美,KR:韩国,JP:日本
   * 说明:调用此接口,可获取语种风格馆数字专辑列表
   * 调用例子:/album/list/style?area=Z_H&offset=2
   */
}), _defineProperty(_getLoginCellphone$ge, "getAlbumDetail", function getAlbumDetail(parameter) {
  // 数字专辑详情
  returnrequest("album/detail", parameter);
  /**
   * 说明:调用此接口,传入数字专辑id可获取数字专辑详情(和歌单详情有差异)
   */
}), _defineProperty(_getLoginCellphone$ge, "getDigitalAlbumPurchased", function getDigitalAlbumPurchased(parameter) {
  // 我的数字专辑
  returnrequest("digitalAlbum/purchased", parameter);
  /**
   * 说明:登录后调用此接口,可获取我的数字专辑
   */
}), _defineProperty(_getLoginCellphone$ge, "getDigitalAlbumOrdering", function getDigitalAlbumOrdering(parameter) {
  // 购买数字专辑
  returnrequest("digitalAlbum/ordering", parameter);
  /**
   * @param id 专辑的id
   * @param payment 支付方式，0为支付宝3为微信
   * @param quantity 购买的数量
   * 说明:登录后调用此接口,可获取购买数字专辑的地址,把地址生成二维码后,可扫描购买专辑
   */
}), _defineProperty(_getLoginCellphone$ge, "getCalendar", function getCalendar(parameter) {
  // 音乐日历(需要登录)
  returnrequest("calendar", parameter);
  /**
   * @param startTime
   * @param endTime
   * 说明:登录后调用此接口, 传入开始和结束时间, 可获取音乐日历
   * 调用例子: /calendar?startTime=1606752000000&endTime=1609430399999
   */
}), _defineProperty(_getLoginCellphone$ge, "getYunbei", function getYunbei(parameter) {
  // 云贝
  returnrequest("yunbei", parameter);
  /**
   * 说明:登录后调用此接口可获取云贝签到信息(连续签到天数,第二天全部可获得的云贝)
   */
}), _defineProperty(_getLoginCellphone$ge, "getYunbeiToday", function getYunbeiToday(parameter) {
  // 云贝今日签到信息
  returnrequest("yunbei/today", parameter);
  /**
   * 说明:登录后调用此接口可获取云贝今日签到信息(今日签到获取的云贝数)
   */
}), _defineProperty(_getLoginCellphone$ge, "getYunbeiSign", function getYunbeiSign(parameter) {
  // 云贝签到
  returnrequest("yunbei/sign", parameter);
  /**
   * 说明:登录后调用此接口可进行云贝签到
   */
}), _defineProperty(_getLoginCellphone$ge, "getYunbeiInfo", function getYunbeiInfo(parameter) {
  // 云贝账户信息
  returnrequest("yunbei/info", parameter);
  /**
   * 说明:登录后调用此接口可获取云贝账户信息(账户云贝数)
   */
}), _defineProperty(_getLoginCellphone$ge, "getYunbeiTasks", function getYunbeiTasks(parameter) {
  // 云贝所有任务
  returnrequest("yunbei/tasks", parameter);
  /**
   * 说明:登录后调用此接口可获取云贝所有任务
   */
}), _defineProperty(_getLoginCellphone$ge, "getYunbeiTasksTodo", function getYunbeiTasksTodo(parameter) {
  // 云贝todo任务
  returnrequest("yunbei/tasks/todo", parameter);
  /**
   * 说明:登录后调用此接口可获取云贝todo任务
   */
}), _defineProperty(_getLoginCellphone$ge, "getYunbeiTask", function getYunbeiTask(parameter) {
  // 云贝完成任务
  returnrequest("yunbei/task", parameter);
  /**
   * @param userTaskId 任务id
   * @param depositCode (选)任务depositCode
   * 说明:登录后调用此接口可获取云贝todo任务
   */
}), _defineProperty(_getLoginCellphone$ge, "getYunbeiTasksReceipt", function getYunbeiTasksReceipt(parameter) {
  // 云贝收入
  returnrequest("yunbei/tasks/receipt", parameter);
  /**
   * @param limit (选)取出评论数量,默认为10
   * @param offset (选)偏移数量,用于分页,如:(评论页数-1)*10,其中10为limit的值
   * 说明:登录后调用此接口可获取云贝收入
   */
}), _defineProperty(_getLoginCellphone$ge, "getYunbeiTasksExpense", function getYunbeiTasksExpense(parameter) {
  // 云贝支出
  returnrequest("yunbei/tasks/expense", parameter);
  /**
   * @param limit (选)取出评论数量,默认为10
   * @param offset (选)偏移数量,用于分页,如:(评论页数-1)*10,其中10为limit的值
   * 说明:登录后调用此接口可获取云贝支出
   */
}), _defineProperty(_getLoginCellphone$ge, "getArtistNewSong", function getArtistNewSong(parameter) {
  // 关注歌手新歌
  returnrequest("artist/new/song", parameter);
  /**
   * @param limit (选)取出评论数量,默认为20
   * @param before (选)上一页数据返回的publishTime的数据
   * 说明:登录后调用此接口可获取关注歌手新歌
   */
}), _defineProperty(_getLoginCellphone$ge, "getArtistNewMv", function getArtistNewMv(parameter) {
  // 关注歌手新MV
  returnrequest("artist/new/mv", parameter);
  /**
   * @param limit (选)取出评论数量,默认为20
   * @param before (选)上一页数据返回的publishTime的数据
   * 说明:登录后调用此接口可获取关注歌手新MV
   */
}), _defineProperty(_getLoginCellphone$ge, "getBatch", function getBatch(parameter) {
  // batch批量请求接口
  returnrequest("batch", parameter);
  /**
   * 说明:登录后调用此接口,传入接口和对应原始参数(原始参数非文档里写的参数,需参考源码),可批量请求接口
   * 调用例子:使用GET方式:/batch?/api/v2/banner/get={"clientType":"pc"}使用POST方式传入参数:{"/api/v2/banner/get":{"clientType":"pc"}}
   */
}), _getLoginCellphone$ge);

exports["default"] = _default;