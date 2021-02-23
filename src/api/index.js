/**
 * @Author: Gavin
 * @Begin: 2020-12-30 10:49:29
 * @Update: 2021-1-29 11:21:49
 * @Update log: 接口整合
 */
import axios from 'axios';

// axios.defaults.timeout = 5000; // 默认5s超时
// axios.defaults.baseURL = 'http://49.234.76.196:3000/';
// axios.defaults.baseURL = 'http://localhost:3000/';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const limit = 20;
const api = "http://www.mikonchen.top:3000/";
// let api = "http://49.234.76.196:3000/";
// let api = "http://localhost:3000/";


function request(
  port,
  parameter = {},
  config = {  // 额外配置
    isCookie: false, // 需要登录
  }) {
  const that = this;
  port += `?timestamp=${Date.parse(new Date()) / 1000}`;


  config.isCookie && (parameter.cookie = "MUSIC_U=64d65234a8d5b8547f2b23029b2392053b359e53d8326c3cc4ae38c90fa7c07f5cb0fcee37c101bd; Max-Age=1296000; Expires=Sat, 13 Feb 2021 03:10:39 GMT; Path=/;;__remember_me=true; Max-Age=1296000; Expires=Sat, 13 Feb 2021 03:10:39 GMT; Path=/;;__csrf=0160b6fd59753b106beb52de188463c6; Max-Age=1296010; Expires=Sat, 13 Feb 2021 03:10:49 GMT; Path=/;;NMTID=00OWxHtGX5BDk8cJ02pne6hsSg198gAAAF3TB8MlQ; Max-Age=315360000; Expires=Mon, 27 Jan 2031 03:10:39 GMT; Path=/;");


  return axios.post(api + port, parameter);
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
  getLogin: parameter => { // 邮箱登录
    return request("login", parameter);
    /**
     * @param email 163网易邮箱
     * @param password 密码
     * @param md5_password (选)md5加密后的密码,传入后password将失效
     * 完成登录后,会在浏览器保存一个Cookies用作登录凭证,大部分API都需要用到这个Cookies,非跨域情况请求会自动带上Cookies,跨域情况参考调用前须知
     * v3.30.0后支持手动传入cookie,登录接口返回内容新增cookie字段,保存到本地后,get请求带上?cookie=xxx或者post请求body带上cookie即可,如:/user/cloud?cookie=xxx或者{ ..., cookie: "xxx" }
     */
  },
  getLoginQrKey: parameter => { // 二维码登录 二维码key生成接口
    return request("login/qr/key", parameter);
    /**
     * 说明:调用此接口可生成一个key
     * 说明:二维码登录涉及到3个接口,调用务必带上时间戳,防止缓存
     * 注意:调用登录接口的速度比调用其他接口慢,因为登录过程调用了加密算法
     */
  },
  getLoginQrCreate: parameter => { // 二维码登录 二维码生成接口
    return request("login/qr/create", parameter);
    /**
     * @param key 由第一个接口生成
     * @param qrimg (选)传入后会额外返回二维码图片base64编码
     * 说明:调用此接口传入上一个接口生成的key可生成二维码图片的base64和二维码信息,可使用base64展示图片,或者使用二维码信息内容自行使用第三方二维码生产库渲染二维码
     * 说明:二维码登录涉及到3个接口,调用务必带上时间戳,防止缓存
     * 注意:调用登录接口的速度比调用其他接口慢,因为登录过程调用了加密算法
     */
  },
  getLoginQrCheck: parameter => { // 二维码登录 二维码检测扫码状态接口
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


  getLoginRefresh: parameter => { // 刷新登录
    return request("login/refresh", parameter);
    /**
     * 说明:调用此接口,可刷新登录状态
     */
  },
  getCaptchaSent: parameter => { // 发送验证码
    return request("captcha/sent", parameter);
    /**
     * @param phone 手机号码
     * @param ctcode (选)国家区号,默认86即中国
     * 说明:调用此接口,传入手机号码,可发送验证码
     */
  },
  getCaptchaVerify: parameter => { // 验证验证码
    return request("captcha/verify", parameter);
    /**
     * @param phone 手机号码
     * @param captcha 验证码
     * @param ctcode (选)国家区号,默认86即中国
     * 说明:调用此接口,传入手机号码和验证码,可校验验证码是否正确
     */
  },
  getRegisterCellphone: parameter => { // 注册(修改密码)
    return request("register/cellphone", parameter);
    /**
     * @param phone 手机号码
     * @param captcha 验证码
     * @param password 密码
     * @param nickname 昵称
     * 说明:调用此接口,传入手机号码和验证码,密码,昵称,可注册网易云音乐账号(同时可修改密码)
     */
  },
  getCellphoneExistenceCheck: parameter => { // 检测手机号码是否已注册
    return request("cellphone/existence/check", parameter);
    /**
     * @param phone 手机号码
     * @param countrycode (选)国家码，用于国外手机号，例如美国传入：1
     * 说明:调用此接口,可检测手机号码是否已注册
     */
  },
  getActivateInitProfile: parameter => { // 初始化昵称
    return request("activate/init/profile", parameter);
    /**
     * @param nickname 昵称
     * 说明:刚注册的账号(需登录),调用此接口,可初始化昵称
     */
  },
  getRebind: parameter => { // 更换绑定手机
    return request("rebind", parameter);
    /**
     * @param oldcaptcha 原手机验证码
     * @param captcha 新手机验证码
     * @param phone 手机号码
     * @param ctcode 国家区号,默认86即中国
     * 说明:调用此接口,可更换绑定手机(流程:先发送验证码到原手机号码,再发送验证码到新手机号码然后再调用此接口)
     */
  },
  getLogout: parameter => { // 退出登录
    return request("logout", parameter);
    /**
     * 说明:调用此接口,可退出登录
     */
  },

  getLoginStatus: parameter => { // 登录状态
    return request("login/status", parameter, { isCookie: true });
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
    return request("user/account", parameter, { isCookie: true });
    /**
     * 说明:登录后调用此接口,可获取用户账号信息
     */
  },
  getUserSubcount: parameter => { // 获取用户信息,歌单,收藏,mv,dj数量
    return request("user/subcount", parameter, { isCookie: true });
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
  getUserBinding: parameter => { // 获取用户绑定信息
    return request("user/binding", parameter);
    /**
     * @param uid 用户id
     * 说明:登录后调用此接口,可以获取用户绑定信息
     */
  },
  getUserReplacephone: parameter => { // 用户绑定手机
    return request("user/replacephone", parameter);
    /**
     * @param phone 手机号码
     * @param oldcaptcha 原手机号码的验证码
     * @param captcha 新手机号码的验证码
     * @param countrycode (选)国家地区代码,默认86
     * 说明:登录后调用此接口,可以更换绑定手机
     */
  },
  getUserUpdate: parameter => { // 更新用户信息
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
  getAvatarUpload: parameter => { // 更新头像
    return request("avatar/upload", parameter);
    /**
     * @param imgSize (选)图片尺寸,默认为300
     * @param imgX (选)水平裁剪偏移,方形图片可不传,默认为0imgY:垂直裁剪偏移,方形图片可不传,默认为0
     * 说明:登录后调用此接口,使用'Content-Type':'multipart/form-data'上传图片formData(name为'imgFile'),可更新头像(参考:https://github.com/Binaryify/NeteaseCloudMusicApi/blob/master/public/avatar_update.html),支持命令行调用,参考module_example目录下`avatar_upload.js`
     */
  },
  getCountriesCodeList: parameter => { // 国家编码列表
    return request("countries/code/list", parameter);
    /**
     * 说明:调用此接口,可获取国家编码列表
     */
  },
  getUserPlaylist: parameter => { // 获取用户歌单
    return request("user/playlist", parameter);
    /**
     * @param uid 用户id
     * @param limit (选)返回数量,默认为30
     * @param offset (选)偏移数量，用于分页,如:(页数-1)*30,其中30为limit的值,默认为0
     * 说明:登录后调用此接口,传入用户id,可以获取用户歌单
     */
  },
  getPlaylistUpdate: parameter => { // 更新歌单
    return request("playlist/update", parameter);
    /**
     * @param id 歌单id
     * @param name 歌单名字
     * @param desc 歌单描述
     * @param tags 歌单tag,多个用`;`隔开,只能用官方规定标签
     * 说明:登录后调用此接口,可以更新用户歌单
     */
  },
  getPlaylistDescUpdate: parameter => { // 更新歌单描述
    return request("playlist/desc/update", parameter);
    /**
     * @param id 歌单id
     * @param desc 歌单描述
     * 说明:登录后调用此接口,可以单独更新用户歌单描述
     */
  },
  getPlaylistNameUpdate: parameter => { // 更新歌单名
    return request("playlist/name/update", parameter);
    /**
     * @param id 歌单id
     * @param name 歌单名
     * 说明:登录后调用此接口,可以单独更新用户歌单名
     */
  },
  getPlaylistTagsUpdate: parameter => { // 更新歌单标签
    return request("playlist/tags/update", parameter);
    /**
     * @param id 歌单id
     * @param tags 歌单标签
     * 说明:登录后调用此接口,可以单独更新用户歌单标签
     */
  },
  getPlaylistCoverUpdate: parameter => { // 歌单封面上传
    return request("playlist/cover/update", parameter);
    /**
     * @param id 歌单id
     * @param imgSize (选)图片尺寸,默认为300
     * @param imgX (选)水平裁剪偏移,方形图片可不传,默认为0imgY:垂直裁剪偏移,方形图片可不传,默认为0
     * 说明:登录后调用此接口,使用'Content-Type':'multipart/form-data'上传图片formData(name为'imgFile'),可更新歌单封面(参考:https://github.com/Binaryify/NeteaseCloudMusicApi/blob/master/public/playlist_cover_update.html)
     */
  },
  getPlaylistOrderUpdate: parameter => { // 调整歌单顺序
    return request("playlist/order/update", parameter);
    /**
     * @param ids 歌单id列表 [111,222]
     * 说明:登录后调用此接口,可以根据歌单id顺序调整歌单顺序
     */
  },
  getSongOrderUpdate: parameter => { // 调整歌曲顺序
    return request("song/order/update", parameter);
    /**
     * @param pid 歌单id
     * @param ids 歌单id列表 [5268328,1219871]
     * 说明:登录后调用此接口,可以根据歌曲id顺序调整歌曲顺序
     */
  },
  getUserDj: parameter => { // 获取用户电台
    return request("user/dj", parameter);
    /**
     * @param uid 用户id
     * 说明:登录后调用此接口,传入用户id,可以获取用户电台
     */
  },
  getUserFollows: parameter => { // 获取用户关注列表
    return request("user/follows", parameter);
    /**
     * @param uid 用户id
     * @param limit (选)返回数量,默认为30
     * @param offset (选)偏移数量，用于分页,如:(页数-1)*30,其中30为limit的值,默认为0
     * 说明:登录后调用此接口,传入用户id,可以获取用户关注列表
     */
  },
  getUserFolloweds: parameter => { // 获取用户粉丝列表
    return request("user/followeds", parameter);
    /**
     * @param uid 用户id
     * @param limit (选)返回数量,默认为30
     * @param lasttime (选)返回数据的lasttime,默认-1,传入上一次返回结果的lasttime,将会返回下一页的数据
     * 说明:登录后调用此接口,传入用户id,可以获取用户粉丝列表
     */
  },
  getUserEvent: parameter => { // 获取用户动态
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
  getEventForward: parameter => { // 转发用户动态
    return request("event/forward", parameter);
    /**
     * @param uid 用户id
     * @param evId 动态id
     * @param forwards 转发的评论
     * 说明:登录后调用此接口,可以转发用户动态
     */
  },
  getEventDel: parameter => { // 删除用户动态
    return request("event/del", parameter);
    /**
     * @param evId 动态id
     * 说明:登录后调用此接口,可以删除用户动态
     */
  },
  getShareResource: parameter => { // 分享歌曲、歌单、mv、电台、电台节目到动态
    return request("share/resource", parameter);
    /**
     * @param id 资源id（歌曲，歌单，mv，电台，电台节目对应id）
     * @param type (选)资源类型，默认歌曲song，可传song,playlist,mv,djradio,djprogram
     * @param msg (选)内容，140字限制，支持emoji，@用户名（/user/follows接口获取的用户名，用户名后和内容应该有空格），图片暂不支持
     * 说明:登录后调用此接口,可以分享歌曲、歌单、mv、电台、电台节目到动态
     */
  },
  getCommentEvent: parameter => { // 获取动态评论
    return request("comment/event", parameter);
    /**
     * @param threadId 动态id，可通过/event，/user/event接口获取
     * 说明:登录后调用此接口,可以获取动态下评论
     */
  },
  getFollow: parameter => { // 关注/取消关注用户
    return request("follow", parameter);
    /**
     * @param id 用户id
     * @param t 1为关注,其他为取消关注
     * 说明:登录后调用此接口,传入用户id,和操作t,可关注/取消关注用户
     */
  },
  getUserRecord: parameter => { // 获取用户播放记录
    return request("user/record", parameter);
    /**
     * @param uid 用户id
     * @param type (选)type=1时只返回weekData,type=0时返回allData
     * 说明:登录后调用此接口,传入用户id,可获取用户播放记录
     */
  },
  getHotTopic: parameter => { // 获取热门话题
    return request("hot/topic", parameter);
    /**
     * @param limit (选)取出评论数量,默认为20
     * @param offset (选)偏移数量,用于分页,如:(评论页数-1)*20,其中20为limit的值
     * 说明:调用此接口,可获取热门话题
     */
  },
  getTopicDetail: parameter => { // 获取话题详情
    return request("topic/detail", parameter);
    /**
     * @param limit (选)取出评论数量,默认为20
     * @param offset (选)偏移数量,用于分页,如:(评论页数-1)*20,其中20为limit的值
     * 说明:调用此接口,可获取话题详情
     */
  },
  getTopicDetailEventHot: parameter => { // 获取话题详情热门动态
    return request("topic/detail/event/hot", parameter);
    /**
     * 说明:调用此接口,可获取话题详情热门动态
     */
  },
  getCommentHotwallList: parameter => { // 云村热评(官方下架,暂不能用)
    return request("comment/hotwall/list", parameter);
    /**
     * 说明:登录后调用此接口,可获取云村热评
     */
  },
  getPlaymodeIntelligenceList: parameter => { // 心动模式/智能播放
    return request("playmode/intelligence/list", parameter);
    /**
     * @param id 歌曲id
     * @param pid 歌单id
     * @param sid (选)要开始播放的歌曲的id
     * 说明:登录后调用此接口,可获取心动模式/智能播放列表
     */
  },
  getEvent: parameter => { // 获取动态消息
    return request("event", parameter);
    /**
     * @param pagesize 每页数据,默认20
     * @param lasttime 返回数据的lasttime,默认-1,传入上一次返回结果的lasttime,将会返回下一页的数据
     * 说明:调用此接口,可获取各种动态,对应网页版网易云，朋友界面里的各种动态消息，如分享的视频，音乐，照片等！
     */
  },
  getArtistList: parameter => { // 歌手分类列表
    return request("artist/list", parameter);
    /**
     * @param limit (选)返回数量,默认为30
     * @param offset (选)偏移数量，用于分页,如:如:(页数-1)*30,其中30为limit的值,默认为0initial:按首字母索引查找参数,如/artist/list?type=1&area=96&initial=b返回内容将以name字段开头为b或者拼音开头为b为顺序排列,热门传-1,#传0
     * @param type (选)取值: -1:全部 1:男歌手 2:女歌手 3:乐队
     * @param area (选)取值: -1:全部 7华语 96欧美 8:日本 16韩国 0:其他
     * 说明:调用此接口,可获取歌手分类列表
     */
  },
  getArtistSub: parameter => { // 收藏/取消收藏歌手
    return request("artist/sub", parameter);
    /**
     * @param id 歌手id
     * @param t 操作,1为收藏,其他为取消收藏
     * 说明:调用此接口,可收藏歌手
     */
  },
  getArtistTopSong: parameter => { // 歌手热门50首歌曲
    return request("artist/top/song", parameter);
    /**
     * @param id 歌手id
     * @param t 操作,1为收藏,其他为取消收藏
     * 说明:调用此接口,可获取歌手热门50首歌曲
     */
  },
  getArtistSongs: parameter => { // 歌手全部歌曲
    return request("artist/songs", parameter);
    /**
     * @param id 歌手id
     * @param order (选)hot,time按照热门或者时间排序
     * @param limit (选)取出歌单数量,默认为50
     * @param offset (选)偏移数量,用于分页,如:(评论页数-1)*50,其中50为limit的值
     * 说明:调用此接口,可获取歌手全部歌曲
     */
  },
  getArtistSublist: parameter => { // 收藏的歌手列表
    return request("artist/sublist", parameter);
    /**
     * 说明:调用此接口,可获取收藏的歌手列表
     */
  },
  getTopicSublist: parameter => { // 收藏的专栏
    return request("topic/sublist", parameter);
    /**
     * @param limit (选)取出歌单数量,默认为50
     * @param offset (选)偏移数量,用于分页,如:(评论页数-1)*50,其中50为limit的值
     * 说明:调用此接口,可获取收藏的专栏
     */
  },
  getVideoSub: parameter => { // 收藏视频
    return request("video/sub", parameter);
    /**
     * @param id 视频id
     * @param t 1为收藏,其他为取消收藏
     * 说明:调用此接口,可收藏视频
     */
  },
  getMvSub: parameter => { // 收藏/取消收藏MV
    return request("mv/sub", parameter);
    /**
     * @param mvid MVid
     * @param t 1为收藏,其他为取消收藏
     * 说明:调用此接口,可收藏/取消收藏MV
     */
  },
  getMvSublist: parameter => { // 收藏的MV列表
    return request("mv/subsublist", parameter);
    /**
     * 说明:调用此接口,可获取收藏的MV列表
     */
  },

  getPlaylistCatlist: parameter => { // 歌单分类
    return request("playlist/catlist", parameter);
    /**
     * 说明:调用此接口,可获取歌单分类,包含category信息
     */
  },
  getPlaylistHot: parameter => { // 热门歌单分类
    return request("playlist/hot", parameter);
    /**
     * 说明:调用此接口,可获取歌单分类,包含category信息
     */
  },
  getTopPlaylist: parameter => { // 歌单(网友精选碟)
    return request("top/playlist", parameter);
    /**
     * @param order(选)可选值为'new'和'hot',分别对应最新和最热,默认为'hot'
     * @param cat cat:tag,比如"华语"、"古风"、"欧美"、"流行",默认为"全部",可从歌单分类接口获取(/playlist/catlist)
     * @param limit 取出歌单数量,默认为50
     * @param offset 偏移数量,用于分页,如:(评论页数-1)*50,其中50为limit的值
     * 说明:调用此接口,可获取网友精选碟歌单
     */
  },
  getPlaylistHighqualityTags: parameter => { // 精品歌单标签列表
    return request("playlist/highquality/tags", parameter);
    /**
     * 说明:调用此接口,可获取精品歌单标签列表
     */
  },
  getTopPlaylistHighquality: parameter => { // 获取精品歌单
    return request("top/playlist/highquality", parameter);
    /**
     *  @param cat (选)比如"华语"、"古风"、"欧美"、"流行",默认为"全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags)
     *  @param limit  取出歌单数量,默认为20
     *  @param before 分页参数,取上一页最后一个歌单的updateTime获取下一页数据
     * 说明:调用此接口,可获取精品歌单
     */
  },
  getRelatedPlaylist: parameter => { // 相关歌单推荐
    return request("related/playlist", parameter);
    /**
     *  @param id 歌单id
     * 说明:调用此接口,传入歌单id可获取相关歌单(对应页面https://music.163.com/#/playlist?id=1)
     */
  },
  getPlaylistDetail: parameter => { // 获取歌单详情
    return request("playlist/detail", parameter);
    /**
     *  @param id 歌单id
     *  @param s (选)歌单最近的s个收藏者,默认为8
     * 说明:歌单能看到歌单名字,但看不到具体歌单内容,调用此接口,传入歌单id,可以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，但是返回的trackIds是完整的，tracks则是不完整的，可拿全部trackIds请求一次song/detail接口获取所有歌曲的详情(https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452)
     */
  },
  getPlaylistDetailDynamic: parameter => { // 歌单详情动态
    return request("playlist/detail/dynamic", parameter);
    /**
     *  @param id 歌单id
     * 说明:调用后可获取歌单详情动态部分,如评论数,是否收藏,播放数
     */
  },

  getSongUrl: parameter => { // 获取音乐地址
    return request("song/url", parameter);
    /**
     * @param id 音乐id
     * @param br (选)码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
     * 说明:使用歌单详情接口后,能得到的音乐的id,但不能得到的音乐url,调用此接口,传入的音乐id(可多个,用逗号隔开),可以获取对应的音乐的url,未登录状态返回试听片段(返回字段包含被截取的正常歌曲的开始时间和结束时间)
     * 注:部分用户反馈获取的url会403,hwaphon找到的解决方案是当获取到音乐的id后，将https://music.163.com/song/media/outer/url?id=id.mp3以src赋予Audio即可播放
     */
  },
  getCheckMusic: parameter => { // 音乐是否可用
    return request("check/music", parameter);
    /**
     * @param id 歌曲id
     * @param br (选)码率,默认设置了999000即最大码率,如果要320k则可设置为320000,其他类推
     * 说明:调用此接口,传入歌曲id,可获取音乐是否可用,返回{success:true,message:'ok'}或者{success:false,message:'亲爱的,暂无版权'}
     */
  },

  getSearch: parameter => { // 搜索
    return request("search", parameter);
    /**
     * @param keywords 关键词
     * @param limit (选)返回数量,默认为30offset:偏移数量，用于分页,如:如:(页数-1)*30,其中30为limit的值,默认为0
     * @param type (选)搜索类型；默认为1即单曲,取值意义:1:单曲,10:专辑,100:歌手,1000:歌单,1002:用户,1004:MV,1006:歌词,1009:电台,1014:视频,1018:综合
     * 说明:调用此接口,传入搜索关键词可以搜索该音乐/专辑/歌手/歌单/用户,关键词可以多个,以空格隔开,如"周杰伦搁浅"(不需要登录),搜索获取的mp3url不能直接用,可通过/song/url接口传入歌曲id获取具体的播放链接
     */
  },
  getCloudSearch: parameter => { // 搜索(更全)
    return request("cloudsearch", parameter);
    /**
     * @param keywords 关键词
     * @param limit (选)返回数量,默认为30offset:偏移数量，用于分页,如:如:(页数-1)*30,其中30为limit的值,默认为0
     * @param type (选)搜索类型；默认为1即单曲,取值意义:1:单曲,10:专辑,100:歌手,1000:歌单,1002:用户,1004:MV,1006:歌词,1009:电台,1014:视频,1018:综合
     * 说明:调用此接口,传入搜索关键词可以搜索该音乐/专辑/歌手/歌单/用户,关键词可以多个,以空格隔开,如"周杰伦搁浅"(不需要登录),搜索获取的mp3url不能直接用,可通过/song/url接口传入歌曲id获取具体的播放链接
     */
  },
  getSearchDefault: parameter => { // 默认搜索关键词
    return request("search/default", parameter);
    /**
     * 说明:调用此接口,可获取默认搜索关键词
     */
  },
  getSearchHot: parameter => { // 热搜列表(简略)
    return request("search/hot", parameter);
    /**
     * 说明:调用此接口,可获取热门搜索列表
     */
  },
  getSearchHotDetail: parameter => { // 热搜列表(详细)
    return request("search/hot/detail", parameter);
    /**
     * 说明:调用此接口,可获取热门搜索列表
     */
  },
  getSearchHotSuggest: parameter => { // 搜索建议
    return request("search/hot/suggest", parameter);
    /**
     * @param keywords 关键词
     * @param type (选)如果传'mobile'则返回移动端数据
     * 说明:调用此接口,传入搜索关键词可获得搜索建议,搜索结果同时包含单曲,歌手,歌单,mv信息
     */
  },
  getSearchHotMultimatch: parameter => { // 搜索多重匹配
    return request("search/hot/multimatch", parameter);
    /**
     * @param keywords 关键词
     * 说明:调用此接口,传入搜索关键词可获得搜索结果
     */
  },

  getPlaylistCreate: parameter => { // 新建歌单
    return request("playlist/create", parameter);
    /**
     * @param name 歌单名
     * @param privacy 是否设置为隐私歌单，默认否，传'10'则设置成隐私歌单
     * @param type 歌单类型,默认'NORMAL',传'VIDEO'则为视频歌单
     * 说明:调用此接口,传入歌单名字可新建歌单
     */
  },
  getPlaylistDelete: parameter => { // 删除歌单
    return request("playlist/delete", parameter);
    /**
     * @param id 歌单id,可多个,用逗号隔开
     * 说明:调用此接口,传入歌单id可删除歌单
     */
  },
  getPlaylistSubscribe: parameter => { // 收藏/取消收藏歌单
    return request("playlist/subscribe", parameter);
    /**
     * @param t 类型,1:收藏,2:取消收藏id:歌单id
     * 说明:调用此接口,传入类型和歌单id可收藏歌单或者取消收藏歌单
     */
  },
  getPlaylistSubscribers: parameter => { // 歌单收藏者
    return request("playlist/subscribers", parameter);
    /**
     * @param id 歌单id
     * @param limit 取出评论数量,默认为20
     * @param offset 偏移数量,用于分页,如:(评论页数-1)*20,其中20为limit的值
     * 说明:调用此接口,传入歌单id可获取歌单的所有收藏者
     */
  },
  getPlaylistTracks: parameter => { // 对歌单添加或删除歌曲
    return request("playlist/tracks", parameter);
    /**
     * @param op 从歌单增加单曲为add,删除为del
     * @param pid 歌单idtracks:歌曲id,可多个,用逗号隔开
     * 说明:调用此接口,可以添加歌曲到歌单或者从歌单删除某首歌曲(需要登录)
     * 调用例子:/playlist/tracks?op=add&pid=24381616&tracks=347231(对应把歌曲添加到'我'的歌单,测试的时候请把这里的pid换成你自己的,id和tracks不对可能会报502错误)
     */
  },
  getPlaylistTrackAdd: parameter => { // 收藏视频到视频歌单
    return request("playlist/track/add", parameter);
    /**
     * @param pid 歌单id
     * @param ids 视频id,支持多个,用,隔开
     * 说明:调用此接口,可收藏视频到视频歌单(需要登录)
     */
  },
  getPlaylistTrackDelete: parameter => { // 删除视频歌单里的视频
    return request("playlist/track/delete", parameter);
    /**
     * @param pid 歌单id
     * @param ids 视频id,支持多个,用,隔开
     * 说明:调用此接口,可删除视频歌单里的视频(需要登录)必选参数:
     */
  },
  getPlaylistVideoRecent: parameter => { // 最近播放的视频
    return request("playlist/video/recent", parameter);
    /**
     * @param pid 歌单id
     * @param ids 视频id,支持多个,用,隔开
     * 说明:调用此接口,可获取最近播放的视频(需要登录)
     */
  },

  getLyric: parameter => { // 获取歌词
    return request("lyric", parameter);
    /**
     * @param id 音乐id
     * 说明:调用此接口,传入音乐id可获得对应音乐的歌词(不需要登录)
     */
  },
  getTopSong: parameter => { // 新歌速递
    return request("top/song", parameter);
    /**
     * @param type 地区类型id,对应以下: 全部:0 华语:7 欧美:96 日本:8 韩国:16
     * 说明:调用此接口,可获取新歌速递
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
    return request("homepage/dragon/ball", parameter, false);
    /**
     * 说明:调用此接口,可获取APP首页圆形图标入口列表
     */
  },

  getCommentMusic: parameter => { // 歌曲评论
    return request("comment/music", parameter);
    /**
     *  @param id 音乐id
     *  @param limit (选)取出评论数量,默认为20
     *  @param offset (选)偏移数量,用于分页,如:(评论页数-1)*20,其中20为limit的值
     *  @param before (选)分页参数,取上一页最后一项的time获取下一页数据(获取超过5000条评论的时候需要用到)
     *  说明:调用此接口,传入音乐id和limit参数,可获得该音乐的所有评论(不需要登录)
     */
  },
  getCommentFloor: parameter => { // 楼层评论
    return request("comment/floor", parameter);
    /**
     *  @param parentCommentId 楼层评论id
     *  @param id 资源id
     *  @param type 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型 0:歌曲 1:mv 2:歌单 3:专辑 4:电台 5:视频
     *  @param limit (选)取出评论数量,默认为20
     *  @param time (选)分页参数,取上一页最后一项的time获取下一页数据
     *  说明:调用此接口,传入资源parentCommentId和资源类型type和资源id参数,可获得该资源的歌曲楼层评论
     */
  },
  getCommentAlbum: parameter => { // 专辑评论
    return request("comment/album", parameter);
    /**
     *  @param id 专辑id
     *  @param limit (选)取出评论数量,默认为20
     *  @param offset (选)偏移数量,用于分页,如:(评论页数-1)*20,其中20为limit的值
     *  @param before (选)分页参数,取上一页最后一项的time获取下一页数据(获取超过5000条评论的时候需要用到)
     *  说明:调用此接口,传入音乐id和limit参数,可获得该专辑的所有评论(不需要登录)
     */
  },
  getCommentPlaylist: parameter => { // 歌单评论
    return request("comment/playlist", parameter);
    /**
     *  @param id 歌单id
     *  @param limit (选)取出评论数量,默认为20
     *  @param offset (选)偏移数量,用于分页,如:(评论页数-1)*20,其中20为limit的值
     *  @param before (选)分页参数,取上一页最后一项的time获取下一页数据(获取超过5000条评论的时候需要用到)
     *  说明:调用此接口,传入音乐id和limit参数,可获得该歌单的所有评论(不需要登录)
     */
  },
  getCommentMv: parameter => { // mv评论
    return request("comment/mv", parameter);
    /**
     *  @param id mvid
     *  @param limit (选)取出评论数量,默认为20
     *  @param offset (选)偏移数量,用于分页,如:(评论页数-1)*20,其中20为limit的值
     *  @param before (选)分页参数,取上一页最后一项的time获取下一页数据(获取超过5000条评论的时候需要用到)
     *  说明:调用此接口,传入音乐id和limit参数,可获得该mv的所有评论(不需要登录)
     */
  },
  getCommentDj: parameter => { // 电台节目评论
    return request("comment/dj", parameter);
    /**
     *  @param id 电台节目的id
     *  @param limit (选)取出评论数量,默认为20
     *  @param offset (选)偏移数量,用于分页,如:(评论页数-1)*20,其中20为limit的值
     *  @param before (选)分页参数,取上一页最后一项的time获取下一页数据(获取超过5000条评论的时候需要用到)
     *  说明:调用此接口,传入音乐id和limit参数,可获得该电台节目的所有评论(不需要登录)
     */
  },
  getCommentVideo: parameter => { // 视频评论
    return request("comment/video", parameter);
    /**
     *  @param id 视频的id
     *  @param limit (选)取出评论数量,默认为20
     *  @param offset (选)偏移数量,用于分页,如:(评论页数-1)*20,其中20为limit的值
     *  @param before (选)分页参数,取上一页最后一项的time获取下一页数据(获取超过5000条评论的时候需要用到)
     *  说明:调用此接口,传入音乐id和limit参数,可获得该视频的所有评论(不需要登录)
     */
  },
  getCommentHot: parameter => { // 热门评论
    return request("comment/hot", parameter);
    /**
     *  @param id 资源id
     *  @param type 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型 0:歌曲 1:mv 2:歌单 3:专辑 4:电台 5:视频
     *  @param limit (选)取出评论数量,默认为20
     *  @param offset (选)偏移数量,用于分页,如:(评论页数-1)*20,其中20为limit的值
     *  @param before (选)分页参数,取上一页最后一项的time获取下一页数据(获取超过5000条评论的时候需要用到)
     *  说明:调用此接口,传入type,资源id可获得对应资源热门评论(不需要登录)
     */
  },
  getCommentNew: parameter => { // 新版评论接口
    return request("comment/new", parameter);
    /**
     *  @param id 资源id,如歌曲id,mvid
     *  @param type 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型 0:歌曲 1:mv 2:歌单 3:专辑 4:电台 5:视频 6:动态
     *  @param pageNo (选)分页参数,第N页,默认为1
     *  @param pageSize (选)分页参数,每页多少条数据,默认20
     *  @param sortType (选)1:按推荐排序,2:按热度排序,3:按时间排序
     *  @param cursor (选)当sortType为3时且页数不是第一页时需传入,值为上一条数据的time
     *  说明:调用此接口,传入资源类型和资源id,以及排序方式,可获取对应资源的评论
     */
  },
  getCommentLike: parameter => { // 给评论点赞
    return request("comment/like", parameter);
    /**
     *  @param id 资源id,如歌曲id,mvid
     *  @param cid 评论id
     *  @param t 是否点赞,1为点赞,0为取消点赞
     *  @param type 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型 0:歌曲 1:mv 2:歌单 3:专辑 4:电台 5:视频 6:动态
     *  说明:调用此接口,传入type,资源id,和评论idcid和是否点赞参数t即可给对应评论点赞(需要登录)
     *  调用例子:/comment/like?id=29178366&cid=12840183&t=1&type=0对应给https://music.163.com/#/song?id=29178366最热门的评论点赞
     *  注意：动态点赞不需要传入id参数，需要传入动态的threadId参数,如：/comment/like?type=6&cid=1419532712&threadId=A_EV_2_6559519868_32953014&t=0，threadId可通过/event，/user/event接口获取
     */
  },
  getHugComment: parameter => { // 抱一抱评论
    return request("hug/comment", parameter);
    /**
     *  @param uid 用户id
     *  @param cid 评论id
     *  @param sid 资源id
     *  说明:调用此接口,可抱一抱评论
     */
  },
  getCommentHugList: parameter => { // 评论抱一抱列表
    return request("comment/hug/list", parameter);
    /**
     *  @param uid 用户id
     *  @param cid 评论id
     *  @param sid 资源id 
     *  @param page (选)页数
     *  @param cursor (选)上一页返回的cursor,默认-1,第一页不需要传
     *  @param idCursor (选)上一页返回的idCursor,默认-1,第一页不需要传
     *  @param pageSize (选)每页页数,默认100
     *  说明:调用此接口,可获取评论抱一抱列表
     */
  },
  getComment: parameter => { // 发送/删除评论
    return request("comment", parameter);
    /**
     *  @param t 1发送,2回复
     *  @param type 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型 0:歌曲 1:mv 2:歌单 3:专辑 4:电台 5:视频 6:动态
     *  @param id 对应资源id 
     *  @param content 要发送的内容
     *  @param commentId 回复的评论id(回复评论时必填)
     *  说明:调用此接口,可发送评论或者删除评论
     *  调用例子:/comment?t=1&type=1&id=5436712&content=test(往广岛之恋mv发送评论:test)
     *  注意：如给动态发送评论，则不需要传id，需要传动态的threadId,如：/comment?t=1&type=6&threadId=A_EV_2_6559519868_32953014&content=test
     */
  },
  getComment: parameter => { // 删除评论
    return request("comment", parameter);
    /**
     *  @param t 0删除
     *  @param type 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型 0:歌曲 1:mv 2:歌单 3:专辑 4:电台 5:视频 6:动态
     *  @param id 对应资源idcontent:内容id,可通过/comment/mv等接口获取
     *  调用例子:/comment?t=0&type=1&id=5436712&commentId=1535550516319(在广岛之恋mv删除评论)
     *  注意：如给动态删除评论，则不需要传id，需要传动态的`threadId`,如：`/comment?t=0&type=6&threadId=A_EV_2_6559519868_32953014&commentId=1419516382`
     */
  },
  getBanner: parameter => { // banner
    return request("banner", parameter);
    /**
     * @param type (选)资源类型,0PC, 1android, 2iphone, 3ipad
     */
  },

  getResourceLike: parameter => { // 资源点赞(MV,电台,视频)
    return request("resource/like", parameter);
    /**
     * @param type 资源类型,对应以下类型 1:mv 4:电台 5:视频 6:动态
     * @param t 操作,1为点赞,其他未取消点赞
     * @param id 资源id
     * 说明:调用此接口,可对MV,电台,视频点赞
     * 注意：如给动态点赞，不需要传入id，需要传入threadId,可通过event,/user/event接口获取，如：/resource/like?t=1&type=6&threadId=A_EV_2_6559519868_32953014
     */
  },
  getPlaylistMylike: parameter => { // 获取点赞过的视频
    return request("playlist/mylike", parameter);
    /**
     * 说明:调用此接口,可获取获取点赞过的视频
     */
  },
  getSongDetail: parameter => { // 获取歌曲详情
    return request("song/detail", parameter);
    /**
     * @param ids 音乐id,如ids=347230
     * 说明:调用此接口,传入音乐id(支持多个id,用,隔开),可获得歌曲详情(注意:歌曲封面现在需要通过专辑内容接口获取)
     */
  },
  getAlbum: parameter => { // 获取专辑内容
    return request("album", parameter);
    /**
     * @param id 专辑id
     * 说明:调用此接口,传入专辑id,可获得专辑内容
     */
  },
  getAlbumDetailDynamic: parameter => { // 专辑动态信息
    return request("album/detail/dynamic", parameter);
    /**
     * @param id 专辑id
     * 说明:调用此接口,传入专辑id,可获得专辑动态信息,如是否收藏,收藏数,评论数,分享数
     */
  },
  getAlbumSub: parameter => { // 收藏/取消收藏专辑
    return request("album/sub", parameter);
    /**
     * @param id 专辑id
     * @param t 1为收藏,其他为取消收藏
     * 说明:调用此接口,可收藏/取消收藏专辑
     * 调用例子:/album/sub?t=1/album/sub?t=0
     */
  },




  //获取已收藏专辑列表
  //说明:调用此接口,可获得已收藏专辑列表

  //可选参数:
  //limit:取出数量,默认为25

  //offset:偏移数量,用于分页,如:(页数-1)*25,其中25为limit的值,默认为0

  //接口地址:/album/sublist

  //调用例子:/album/sublist(周杰伦)

  //获取歌手单曲
  //说明:调用此接口,传入歌手id,可获得歌手部分信息和热门歌曲

  //必选参数:id:歌手id,可由搜索接口获得

  //接口地址:/artists

  //调用例子:/artists?id=6452

  //返回数据如下图:获取歌手单曲

  //获取歌手mv
  //说明:调用此接口,传入歌手id,可获得歌手mv信息,具体mv播放地址可调用/mv传入此接口获得的mvid来拿到,如:/artist/mv?id=6452,/mv?mvid=5461064

  //必选参数:id:歌手id,可由搜索接口获得

  //接口地址:/artist/mv

  //调用例子:/artist/mv?id=6452

  //获取歌手专辑
  //说明:调用此接口,传入歌手id,可获得歌手专辑内容

  //必选参数:id:歌手id

  //可选参数:limit:取出数量,默认为50

  //offset:偏移数量,用于分页,如:(页数-1)*50,其中50为limit的值,默认为0

  //接口地址:/artist/album

  //调用例子:/artist/album?id=6452&limit=30(周杰伦)

  //返回数据如下图:获取专辑内容

  //获取歌手描述
  //说明:调用此接口,传入歌手id,可获得歌手描述

  //必选参数:id:歌手id

  //接口地址:/artist/desc

  //调用例子:/artist/desc?id=6452(周杰伦)

  //获取歌手详情
  //说明:调用此接口,传入歌手id,可获得获取歌手详情

  //必选参数:id:歌手id

  //接口地址:/artist/detail

  //调用例子:/artist/detail?id=11972054(BillieEilish)

  //获取相似歌手
  //说明:调用此接口,传入歌手id,可获得相似歌手

  //必选参数:id:歌手id

  //接口地址:/simi/artist

  //调用例子:/simi/artist?id=6452(对应和周杰伦相似歌手)

  //获取相似歌单
  //说明:调用此接口,传入歌曲id,可获得相似歌单

  //必选参数:id:歌曲id

  //接口地址:/simi/playlist

  //调用例子:/simi/playlist?id=347230(对应'光辉岁月'相似歌单)

  //相似mv
  //说明:调用此接口,传入mvid可获取相似mv

  //必选参数:mvid:mvid

  //接口地址:/simi/mv

  //调用例子:/simi/mv?mvid=5436712

  //获取相似音乐
  //说明:调用此接口,传入歌曲id,可获得相似歌曲

  //必选参数:id:歌曲id

  //接口地址:/simi/song

  //调用例子:/simi/song?id=347230(对应'光辉岁月'相似歌曲)

  //获取最近5个听了这首歌的用户
  //说明:调用此接口,传入歌曲id,最近5个听了这首歌的用户

  //必选参数:id:歌曲id

  //接口地址:/simi/user

  //调用例子:/simi/user?id=347230(对应'光辉岁月'相似歌曲)




























  getRecommendResource: parameter => { // 获取每日推荐歌单(需要登录)
    return request("recommend/resource", parameter, { isCookie: true });
    /**
     * 说明:调用此接口,可获得每日推荐歌单
     */
  },
  getRecommendSongs: parameter => { // 获取每日推荐歌曲(需要登录)
    return request("recommend/songs", parameter, { isCookie: true });
    /**
     * 说明:调用此接口,可获得每日推荐歌曲
     */
  },



  //   获取历史日推可用日期列表
  // 说明 : 调用此接口 , 可获得历史日推可用日期列表

  // 接口地址 : /history/recommend/songs

  // 调用例子 : /history/recommend/songs

  // 获取历史日推详情数据
  // 说明 : 调用此接口 ,传入当日日期, 可获得当日历史日推数据

  // 必选参数 : date: 日期,通过历史日推可用日期列表接口获取,不能任意日期

  // 接口地址 : /history/recommend/songs/detail

  // 调用例子 : /history/recommend/songs/detail?date=2020-06-21

  // 私人 FM
  // 说明 : 私人 FM( 需要登录 )

  // 接口地址 : /personal_fm

  // 调用例子 : /personal_fm

  // 返回数据如下图 :

  // 私人 FM

  // 签到
  // 说明 : 调用此接口 , 传入签到类型 ( 可不传 , 默认安卓端签到 ), 可签到 ( 需要登录 ), 其中安卓端签到可获得 3 点经验 , web/PC 端签到可获得 2 点经验

  // 可选参数 : type: 签到类型 , 默认 0, 其中 0 为安卓端签到 ,1 为 web/PC 签到

  // 接口地址 : /daily_signin

  // 调用例子 : /daily_signin

  // 返回数据如下图 :

  // 签到成功

  // 签到失败

  // 喜欢音乐
  // 说明 : 调用此接口 , 传入音乐 id, 可喜欢该音乐

  // 必选参数 : id: 歌曲 id

  // 可选参数 : like: 布尔值 , 默认为 true 即喜欢 , 若传 false, 则取消喜欢

  // 接口地址 : /like

  // 调用例子 : /like?id=347230

  // 返回数据如下图 :

  // 喜欢成功

  // 喜欢成功则返回数据的 code 为 200, 其余为失败

  // 喜欢成功截图

  // 喜欢音乐列表
  // 说明 : 调用此接口 , 传入用户 id, 可获取已喜欢音乐id列表(id数组)

  // 必选参数 : uid: 用户 id

  // 接口地址 : /likelist

  // 调用例子 : /likelist?uid=32953014

  // 垃圾桶
  // 说明 : 调用此接口 , 传入音乐 id, 可把该音乐从私人 FM 中移除至垃圾桶

  // 必选参数 : id: 歌曲 id

  // 接口地址 : /fm_trash

  // 调用例子 : /fm_trash?id=347230

  // 返回数据如下图 :

  // 移除成功

  // 新碟上架
  // 说明 : 调用此接口 , 可获取新碟上架列表 , 如需具体音乐信息需要调用获取专辑列表接 口 /album , 然后传入 id, 如 /album?id=32311&limit=30

  // 可选参数 :

  // limit: 取出数量 , 默认为 50

  // offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0

  // area: ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本

  // type : new:全部 hot:热门,默认为 new

  // year : 年,默认本年

  // month : 月,默认本月

  // 接口地址 : /top/album

  // 调用例子 : /top/album?offset=0&limit=30&year=2019&month=6

  // 全部新碟
  // 说明 : 登录后调用此接口 ,可获取全部新碟

  // 可选参数 :

  // limit : 返回数量 , 默认为 30

  // offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0

  // area : ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本

  // 接口地址 : /album/new

  // 调用例子 : /album/new?area=KR&limit=10

  // 最新专辑
  // 说明 : 调用此接口 ，获取云音乐首页新碟上架数据

  // 接口地址 : /album/newest

  // 调用例子 : /album/newest

  // 听歌打卡
  // 说明 : 调用此接口 , 传入音乐 id, 来源 id，歌曲时间 time，更新听歌排行数据

  // 必选参数 : id: 歌曲 id, sourceid: 歌单或专辑 id

  // 可选参数 : time: 歌曲播放时间,单位为秒

  // 接口地址 : /scrobble

  // 调用例子 : /scrobble?id=518066366&sourceid=36780169&time=291

  // 热门歌手
  // 说明 : 调用此接口 , 可获取热门歌手数据

  // 可选参数 : limit: 取出数量 , 默认为 50

  // offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0

  // 接口地址 : /top/artists

  // 调用例子 : /top/artists?offset=0&limit=30

  // 返回数据如下图 :


  // 全部 mv
  // 说明 : 调用此接口 , 可获取全部 mv

  // 可选参数 :
  // area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部 type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部

  // order: 排序,可选值为上升最快,最热,最新,不填则为上升最快

  // limit: 取出数量 , 默认为 30

  // offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0

  // 接口地址 : /mv/all

  // 调用例子 : /mv/all?area=港台

  // 最新 mv
  // 说明 : 调用此接口 , 可获取最新 mv

  // 可选参数 : area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部

  // 可选参数 : limit: 取出数量 , 默认为 30

  // 接口地址 : /mv/first

  // 调用例子 : /mv/first?limit=10

  // 网易出品mv
  // 说明 : 调用此接口 , 可获取网易出品 mv

  // 可选参数 : limit: 取出数量 , 默认为 30

  // offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0

  // 接口地址 : /mv/exclusive/rcmd

  // 调用例子 : /mv/exclusive/rcmd?limit=10

  // 推荐 mv
  // 说明 : 调用此接口 , 可获取推荐 mv

  // 接口地址 : /personalized/mv

  // 调用例子 : /personalized/mv

  // 推荐歌单
  // 说明 : 调用此接口 , 可获取推荐歌单

  // 可选参数 : limit: 取出数量 , 默认为 30 (不支持 offset)

  // 接口地址 : /personalized

  // 调用例子 : /personalized?limit=1

  // 推荐新音乐
  // 说明 : 调用此接口 , 可获取推荐新音乐

  // 可选参数 : limit: 取出数量 , 默认为 10 (不支持 offset)

  // 接口地址 : /personalized/newsong

  // 调用例子 : /personalized/newsong

  // 推荐电台
  // 说明 : 调用此接口 , 可获取推荐电台

  // 接口地址 : /personalized/djprogram

  // 调用例子 : /personalized/djprogram

  // 推荐节目
  // 说明 : 调用此接口 , 可获取推荐电台

  // 接口地址 : /program/recommend

  // 调用例子 : /program/recommend

  // 独家放送(入口列表)
  // 说明 : 调用此接口 , 可获取独家放送

  // 接口地址 : /personalized/privatecontent

  // 调用例子 : /personalized/privatecontent

  // 独家放送列表
  // 说明 : 调用此接口 , 可获取独家放送列表

  // 可选参数 :

  // limit : 返回数量 , 默认为 60

  // offset : 偏移数量，用于分页 , 如 :( 页数 -1)*60, 其中 60 为 limit 的值 , 默认为 0

  // 接口地址 : /personalized/privatecontent/list

  // 调用例子 : /personalized/privatecontent/list?limit=1&offset=2

  getTopMv: parameter => { // mv排行
    return request("top/mv", parameter);
    /**
     *  @param limit (选)取出数量,默认为30
     *  @param area (选)地区,可选值为内地,港台,欧美,日本,韩国,不填则为全部
     *  @param offset (选)偏移数量,用于分页,如:(页数-1)*30,其中30为limit的值,默认为0
     * 说明:调用此接口,可获取mv排行
     */
  },

  // 获取 mv 数据
  // 说明 : 调用此接口 , 传入 mvid ( 在搜索音乐的时候传 type=1004 获得 ) , 可获取对应 MV 数据 , 数据包含 mv 名字 , 歌手 , 发布时间 , mv 视频地址等数据 , 其中 mv 视频 网易做了防盗链处理 , 可能不能直接播放 , 需要播放的话需要调用 ' mv 地址' 接口

  // 必选参数 : mvid: mv 的 id

  // 接口地址 : /mv/detail

  // 调用例子 : /mv/detail?mvid=5436712

  // 返回数据如下图 :

  // mv 数据

  // 获取 mv 点赞转发评论数数据
  // 说明 : 调用此接口 , 传入 mvid ( 在搜索音乐的时候传 type=1004 获得 ) , 可获取对应 MV 点赞转发评论数数据

  // 必选参数 : mvid: mv 的 id

  // 接口地址 : /mv/detail/info

  // 调用例子 : /mv/detail/info?mvid=5436712

  // mv 地址
  // 说明 : 调用此接口 , 传入 mv id,可获取 mv 播放地址

  // 必选参数 : id: mv id

  // 可选参数 : r: 分辨率,默认1080,可从 /mv/detail 接口获取分辨率列表

  // 接口地址 : /mv/url

  // 调用例子 :

  // /mv/url?id=5436712 /mv/url?id=10896407&r=1080

  // 获取视频标签列表
  // 说明 : 调用此接口 , 可获取视频标签列表

  // 接口地址 : /video/group/list

  // 调用例子 : /video/group/list

  // 获取视频分类列表
  // 说明 : 调用此接口 , 可获取视频分类列表

  // 接口地址 : /video/category/list

  // 调用例子 : /video/category/list

  // 获取视频标签/分类下的视频
  // 说明 : 调用此接口 , 传入标签/分类id,可获取到相关的视频,分页参数只能传入offset

  // 必选参数 : id: videoGroup 的 id

  // 可选参数 : offset: 默认0

  // 接口地址 : /video/group

  // 调用例子 : /video/group?id=9104

  // 获取全部视频列表
  // 说明 : 调用此接口,可获取视频分类列表,分页参数只能传入offset

  // 可选参数 : offset: 默认0

  // 接口地址 : /video/timeline/all

  // 调用例子 : /video/timeline/all

  // 获取推荐视频
  // 说明 : 调用此接口, 可获取推荐视频,分页参数只能传入offset

  // 可选参数 : offset: 默认0

  // 接口地址 : /video/timeline/recommend

  // 调用例子 : /video/timeline/recommend?offset=10

  // 相关视频
  // 说明 : 调用此接口 , 可获取相关视频

  // 必选参数 : id: 视频 的 id

  // 接口地址 : /related/allvideo

  // 调用例子 : /related/allvideo?id=89ADDE33C0AAE8EC14B99F6750DB954D

  // 视频详情
  // 说明 : 调用此接口 , 可获取视频详情

  // 必选参数 : id: 视频 的 id

  // 接口地址 : /video/detail

  // 调用例子 : /video/detail?id=89ADDE33C0AAE8EC14B99F6750DB954D

  // 获取视频点赞转发评论数数据
  // 说明 : 调用此接口 , 传入 vid ( 视频id ) , 可获取对应视频点赞转发评论数数据 必选参数 : vid: 视频id

  // 接口地址 : /video/detail/info

  // 调用例子 : /video/detail/info?vid=89ADDE33C0AAE8EC14B99F6750DB954D

  // 获取视频播放地址
  // 说明 : 调用此接口 , 传入视频 id,可获取视频播放地址

  // 必选参数 : id: 视频 的 id

  // 接口地址 : /video/url

  // 调用例子 : /video/url?id=89ADDE33C0AAE8EC14B99F6750DB954D

  // 所有榜单
  // 说明 : 调用此接口,可获取所有榜单 接口地址 : /toplist

  // 调用例子 : /toplist

  // 排行榜详情
  // 说明: 请使用歌单详情接口,传入排行榜id获取排行榜详情数据(排行榜也是歌单的一种)

  // 说明 : 调用此接口 , 传入榜单 id, 可获取不同排行榜数据(v3.34.0之后不再支持idx参数)

  // 必选参数 : id: 榜单id,通过所有榜单接口获取

  // 接口地址 : /top/list

  // 调用例子 : /top/list?id=2809577409

  // 所有榜单内容摘要
  // 说明 : 调用此接口,可获取所有榜单内容摘要

  // 接口地址 : /toplist/detail

  // 调用例子 : /toplist/detail

  // 歌手榜
  // 说明 : 调用此接口 , 可获取排行榜中的歌手榜

  // 可选参数 :

  // type : 地区
  // 1: 华语
  // 2: 欧美
  // 3: 韩国
  // 4: 日本
  // 接口地址 : /toplist/artist

  // 调用例子 : /toplist/artist

  // 云盘
  // 说明 : 登录后调用此接口 , 可获取云盘数据 , 获取的数据没有对应 url, 需要再调用一 次 /song/url 获取 url

  // 可选参数 :

  // limit : 返回数量 , 默认为 200

  // offset : 偏移数量，用于分页 , 如 :( 页数 -1)*200, 其中 200 为 limit 的值 , 默认为 0

  // 接口地址 : /user/cloud

  // 调用例子 : /user/cloud

  // 云盘数据详情
  // 说明 : 登录后调用此接口 , 传入云盘歌曲 id，可获取云盘数据详情

  // 必选参数 : id: 歌曲id,可多个,用逗号隔开

  // 接口地址 : /user/cloud/detail

  // 调用例子 : /user/cloud/detail?id=5374627

  // 云盘歌曲删除
  // 说明 : 登录后调用此接口 , 可删除云盘歌曲

  // 必选参数 : id: 歌曲id,可多个,用逗号隔开

  // 接口地址 : /user/cloud/del

  // 调用例子 : /user/cloud/del

  // 云盘上传
  // 说明 : 登录后调用此接口,使用'Content-Type': 'multipart/form-data'上传mp3 formData(name为'songFile'),可上传歌曲到云盘

  // 参考: https://github.com/Binaryify/NeteaseCloudMusicApi/blob/master/public/cloud.html

  // 访问地址: http://localhost:3000/cloud.html)

  // 支持命令行调用,参考module_example目录下song_upload.js

  // 接口地址 : /cloud

  // 调用例子 : /cloud













  getMvDetail: parameter => { // 获取mv数据
    return request("mv/detail", parameter);
    /**
     *  @param mvid MVid
     * 说明:调用此接口,传入mvid(在搜索音乐的时候传type=1004获得),可获取对应MV数据,数据包含mv名字,歌手,发布时间,mv视频地址等数据,其中mv视频网易做了防盗链处理,可能不能直接播放,需要播放的话需要调用'mv地址'接口
     */
  },
  getMvDetailInfo: parameter => { // 获取mv点赞转发评论数数据
    return request("mv/detail/info", parameter);
    /**
     *  @param mvid MVid
     *  说明:调用此接口,传入mvid(在搜索音乐的时候传type=1004获得),可获取对应MV点赞转发评论数数据
     */
  },
  getMvUrl: parameter => { // mv地址
    return request("mv/url", parameter);
    /**
     *  @param id mvid
     *  @param r (选)分辨率,默认1080,可从/mv/detail接口获取分辨率列表
     *  说明:调用此接口,传入mvid,可获取mv播放地址
     */
  },

  getToplist: parameter => { // 所有榜单
    return request("toplist", parameter);
    /**
     * 说明:调用此接口,可获取所有榜单接口地址:/toplist
     */
  },
  getTopList: parameter => { // 排行榜详情
    return request("top/list", parameter);
    /**
     * @param id 榜单id,通过所有榜单接口获取
     * 说明:请使用歌单详情接口,传入排行榜id获取排行榜详情数据(排行榜也是歌单的一种)
     * 说明:调用此接口,传入榜单id,可获取不同排行榜数据(v3.34.0之后不再支持idx参数)
     */
  },
  getToplistDetail: parameter => { // 所有榜单内容摘要
    return request("toplist/detail", parameter);
    /**
     * 说明:调用此接口,可获取所有榜单内容摘要
     */
  },
  getToplistArtist: parameter => { // 歌手榜
    return request("toplist/artist", parameter);
    /**
     * @param type (选)地区 1:华语 2:欧美 3:韩国 4:日本
     * 说明:调用此接口,可获取排行榜中的歌手榜
     */
  },


  getArtistMv: parameter => { // 获取歌手mv
    return request("artist/mv", parameter);
    /**
     * @param id 歌手id,可由搜索接口获得
     * 说明:调用此接口,传入歌手id,可获得歌手mv信息,具体mv播放地址可调用/mv传入此接口获得的mvid来拿到,如:/artist/mv?id=6452,/mv?mvid=5461064
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

















  //   电台banner
  // 说明 : 调用此接口,可获取电台banner

  // 接口地址 : /dj/banner

  // 调用例子 : /dj/banner

  // 电台个性推荐
  // 说明 : 调用此接口,可获取电台个性推荐列表 可选参数 :

  // limit : 返回数量,默认为 6,总条数最多6条

  // 接口地址 : /dj/personalize/recommend

  // 调用例子 : /dj/personalize/recommend?limit=5

  // 电台订阅者列表
  // 说明 : 调用此接口,可获取电台订阅者列表 必选参数 : id: 电台id

  // 可选参数 : time : 分页参数,默认-1,传入上一次返回结果的 time,将会返回下一页的数据

  // limit : 返回数量,默认为 20

  // 接口地址 : /dj/subscriber

  // 调用例子 : /dj/subscriber?id=335425050 , /dj/subscriber?id=335425050&time=1602761825390

  // 用户电台
  // 说明 : 调用此接口, 传入用户id可获取用户创建的电台

  // 必选参数 : uid: 用户id

  // 接口地址 : /user/audio

  // 调用例子 : /user/audio?uid=32953014

  // 热门电台
  // 说明 : 调用此接口,可获取热门电台

  // 可选参数 :

  // limit : 返回数量 , 默认为 30

  // offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 接口地址 : /dj/hot

  // 调用例子 : /dj/hot

  // 电台 - 节目榜
  // 说明 : 登录后调用此接口 , 可获得电台节目榜

  // 可选参数 :

  // limit : 返回数量 , 默认为 100

  // offset : 偏移数量，用于分页 , 如 :( 页数 -1)*100, 其中 100 为 limit 的值 , 默认为 0

  // 接口地址 : /dj/program/toplist

  // 调用例子 : /dj/program/toplist?limit=1

  // 电台 - 付费精品
  // 说明 : 调用此接口,可获取付费精品电台

  // 可选参数 :

  // limit : 返回数量 , 默认为 100 (不支持 offset)

  // 接口地址 : /dj/toplist/pay

  // 调用例子 : /dj/toplist/pay?limit=30

  // 电台 - 24小时节目榜
  // 说明 : 调用此接口,可获取24小时节目榜

  // 可选参数 :

  // limit : 返回数量 , 默认为 100 (不支持 offset)

  // 接口地址 : /dj/program/toplist/hours

  // 调用例子 : /dj/program/toplist/hours?limit=1

  // 电台 - 24小时主播榜
  // 说明 : 调用此接口,可获取24小时主播榜

  // 可选参数 :

  // limit : 返回数量 , 默认为 100 (不支持 offset)

  // 接口地址 : /dj/toplist/hours

  // 调用例子 : /dj/toplist/hours?limit=30

  // 电台 - 主播新人榜
  // 说明 : 调用此接口,可获取主播新人榜

  // 可选参数 :

  // limit : 返回数量 , 默认为 100 (不支持 offset)

  // 接口地址 : /dj/toplist/newcomer

  // 调用例子 : /dj/toplist/newcomer?limit=30

  // 电台 - 最热主播榜
  // 说明 : 调用此接口,可获取最热主播榜

  // 可选参数 :

  // limit : 返回数量 , 默认为 100 (不支持 offset)

  // 接口地址 : /dj/toplist/popular

  // 调用例子 : /dj/toplist/popular?limit=30

  // 电台 - 新晋电台榜/热门电台榜
  // 说明 : 登录后调用此接口 , 可获得新晋电台榜/热门电台榜

  // 可选参数 :

  // limit : 返回数量 , 默认为 100

  // offset : 偏移数量，用于分页 , 如 :( 页数 -1)*100, 其中 100 为 limit 的值 , 默认为 0

  // type: 榜单类型, new 为新晋电台榜,hot为热门电台榜

  // 接口地址 : /dj/toplist

  // 调用例子 : /dj/toplist?type=hot /dj/toplist?type=new&limit=1

  // 电台 - 类别热门电台
  // 可选参数 :

  // limit : 返回数量 , 默认为 30

  // offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0

  // cateId: 类别 id,可通过 /dj/category/recommend 接口获取

  // 接口地址 : /dj/radio/hot

  // 调用例子 : /dj/radio/hot?cateId=2001(创作|翻唱) /dj/radio/hot?cateId=10002 (3D|电子)

  // 电台 - 推荐
  // 说明 : 登录后调用此接口 , 可获得推荐电台

  // 接口地址 : /dj/recommend

  // 调用例子 : /dj/recommend

  // 电台 - 分类
  // 说明 : 登录后调用此接口 , 可获得电台类型

  // 接口地址 : /dj/catelist

  // 调用例子 : /dj/catelist

  // 电台 - 分类推荐
  // 说明 : 登录后调用此接口 , 传入分类,可获得对应类型电台列表

  // 必选参数 : type: 电台类型 , 数字 , 可通过/dj/catelist获取 , 对应关系为 id 对应 此接口的 type, name 对应类型

  // 接口地址 : /dj/recommend/type

  // 调用例子 : /dj/recommend/type?type=1(明星做主播) /dj/recommend/type?type=2001 (创作|翻唱)

  // 电台 - 订阅
  // 说明 : 登录后调用此接口 , 传入rid, 可订阅 dj,dj 的 rid 可通过搜索指定 type='1009' 获取其 id, 如/search?keywords= 代码时间 &type=1009

  // 必选参数 : rid: 电台 的 id

  // 接口地址 : /dj/sub

  // 调用例子 : /dj/sub?rid=336355127&t=1 ( 对应关注 ' 代码时间 ') /dj/sub?rid=336355127&t=0 ( 对应取消关注 ' 代码时间 ')

  // 电台的订阅列表
  // 说明 : 登录后调用此接口 , 可获取订阅的电台列表

  // 接口地址 : /dj/sublist

  // 调用例子 : /dj/sublist

  // 电台 - 付费精选
  // 说明 : 可以获取付费精选的电台列表 , 传入 limit 和 offset 可以进行分页

  // 可选参数 :

  // limit : 返回数量 , 默认为 30

  // offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0

  // 接口地址 : /dj/paygift

  // 调用例子 : /dj/paygift?limit=10&offset=20

  // 电台 - 非热门类型
  // 说明 : 登录后调用此接口, 可获得电台非热门类型

  // 接口地址 : /dj/category/excludehot

  // 调用例子 : /dj/category/excludehot

  // 电台 - 推荐类型
  // 说明 : 登录后调用此接口, 可获得电台推荐类型

  // 接口地址 : /dj/category/recommend

  // 调用例子 : /dj/category/recommend

  // 电台 - 今日优选
  // 说明 : 登录后调用此接口, 可获得电台今日优选

  // 接口地址 : /dj/today/perfered

  // 调用例子 : /dj/today/perfered

  // 电台 - 详情
  // 说明 : 登录后调用此接口 , 传入rid, 可获得对应电台的详情介绍

  // 必选参数 : rid: 电台 的 id

  // 接口地址 : /dj/detail

  // 调用例子 : /dj/detail?rid=336355127 ( 对应 ' 代码时间 ' 的详情介绍 )

  // 电台 - 节目
  // 说明 : 登录后调用此接口 , 传入rid, 可查看对应电台的电台节目以及对应的 id, 需要 注意的是这个接口返回的 mp3Url 已经无效 , 都为 null, 但是通过调用 /song/url 这 个接口 , 传入节目 id 仍然能获取到节目音频 , 如 /song/url?id=478446370 获取代 码时间的一个节目的音频

  // 必选参数 : rid: 电台 的 id

  // 可选参数 :

  // limit : 返回数量 , 默认为 30

  // offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0

  // asc : 排序方式,默认为 false (新 => 老 ) 设置 true 可改为 老 => 新

  // 接口地址 : /dj/program

  // 调用例子 : /dj/program?rid=336355127&limit=40 ( 对应 ' 代码时间 ' 的节目列表 )

  // 电台 - 节目详情
  // 说明 : 调用此接口传入电台节目id,可获得电台节目详情

  // 必选参数 : id: 电台节目 的 id

  // 接口地址 : /dj/program/detail

  // 调用例子 : /dj/program/detail?id=1367665101

  // 通知 - 私信
  // 说明 : 登录后调用此接口 ,可获取私信

  // 可选参数 :

  // limit : 返回数量 , 默认为 30

  // offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0

  // 接口地址 : /msg/private

  // 调用例子 : /msg/private?limit=3

  // 发送私信
  // 说明 : 登录后调用此接口 , 传入用户 id 和要发送的信息, 可以发送私信,返回内容为历史私信,包含带歌单的私信信息(注:不能发送私信给自己)

  // 必选参数 :

  // user_ids : 用户 id,多个需用逗号隔开

  // msg : 要发送的信息

  // 接口地址 : /send/text

  // 调用例子 : /send/text?user_ids=32953014&msg=test,/send/text?user_ids=32953014,475625142&msg=test

  // 发送私信音乐
  // 说明 : 登录后调用此接口 , 传入用户 id 和要发送的信息,音乐id, 可以发送音乐私信,返回内容为历史私信

  // 必选参数 :

  // user_ids : 用户 id,多个需用逗号隔开

  // msg : 要发送的信息

  // 接口地址 : /send/song

  // 调用例子 : /send/song?user_ids=1&id=351318&msg=测试

  // 发送私信(带歌单)
  // 说明 : 登录后调用此接口 , 传入用户 id 和要发送的信息和歌单 id, 可以发送带歌单的私信(注:不能发送重复的歌单)

  // 必选参数 :

  // user_ids : 用户 id,多个需用逗号隔开

  // msg : 要发送的信息

  // 接口地址 : /send/playlist

  // 调用例子 : /send/playlist?msg=test&user_ids=475625142&playlist=705123491,/send/playlist?msg=test2&user_ids=475625142,32953014&playlist=705123493

  // 最近联系人
  // 说明 : 登录后调用此接口 ,可获取最接近联系人

  // 接口地址 : /msg/recentcontact

  // 调用例子 : /msg/recentcontact

  // 私信内容
  // 说明 : 登录后调用此接口 , 可获取私信内容

  // 必选参数 : uid : 用户 id

  // 可选参数 : limit : 返回数量 , 默认为 30

  // before : 分页参数,取上一页最后一项的 time 获取下一页数据

  // 接口地址 : /msg/private/history

  // 调用例子 : /msg/private/history?uid=9003 (云音乐小秘书)

  // 通知 - 评论
  // 说明 : 登录后调用此接口 ,可获取评论

  // 必选参数 : uid: 用户 的 id，只能和登录账号的 id 一致

  // 可选参数 :

  // limit : 返回数量 , 默认为 30

  // before : 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据

  // 接口地址 : /msg/comments

  // 调用例子 : /msg/comments?uid=32953014

  // 通知 - @我
  // 说明 : 登录后调用此接口 ,可获取@我数据

  // 可选参数 :

  // limit : 返回数量 , 默认为 30

  // offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0

  // 接口地址 : /msg/forwards

  // 调用例子 : /msg/forwards?limit=3

  // 通知 - 通知
  // 说明 : 登录后调用此接口 ,可获取通知

  // 可选参数 :

  // limit : 返回数量 , 默认为 30

  // lasttime : 返回数据的 time ,默认-1,传入上一次返回结果的 time,将会返回下一页的数据

  // 接口地址 : /msg/notices

  // 调用例子 : /msg/notices?limit=3

  // 设置
  // 说明 : 登录后调用此接口 ,可获取用户设置

  // 接口地址 : /setting

  // 调用例子 : /setting

  // 数字专辑-新碟上架
  // 说明 : 调用此接口 ,可获取数字专辑-新碟上架

  // 可选参数 :

  // limit : 返回数量 , 默认为 30

  // offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
  // 接口地址 : /album/list

  // 调用例子 : /album/list?limit=10

  // 数字专辑&数字单曲-榜单
  // 说明 : 调用此接口 ,可获取数字专辑&数字单曲-榜单

  // 可选参数 :

  // limit : 返回数量 , 默认为 30

  // offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0

  // albumType : 为数字专辑,1为数字单曲

  // type : daily:日榜,week:周榜,year:年榜,total:总榜

  // 接口地址 : /album_songsaleboard

  // 调用例子 : /album/songsaleboard?type=year&year=2020&albumType=0

  // 数字专辑-语种风格馆
  // 说明 : 调用此接口 ,可获取语种风格馆数字专辑列表

  // 可选参数 :

  // limit : 返回数量 , 默认为 30

  // offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0

  // area 地区 Z_H:华语,E_A:欧美,KR:韩国,JP:日本

  // 接口地址 : /album/list/style

  // 调用例子 : /album/list/style?area=Z_H&offset=2

  // 数字专辑详情
  // 说明 : 调用此接口 ,传入数字专辑id可获取数字专辑详情(和歌单详情有差异)

  // 接口地址 : /album/detail

  // 调用例子 : /album/detail?id=84547195

  // 我的数字专辑
  // 说明 : 登录后调用此接口 ,可获取我的数字专辑

  // 接口地址 : /digitalAlbum/purchased

  // 调用例子 : /digitalAlbum/purchased?limit=10

  // 购买数字专辑
  // 说明 : 登录后调用此接口 ,可获取购买数字专辑的地址,把地址生成二维码后,可扫描购买专辑

  // 必选参数 :

  // id : 专辑的 id

  // payment : 支付方式， 0 为支付宝 3 为微信

  // quantity : 购买的数量

  // 接口地址 : /digitalAlbum/ordering

  // 调用例子 : /digitalAlbum/ordering?id=86286082&payment=3&quantity=1

  getCalendar: parameter => { // 音乐日历(需要登录)
    return request("calendar", parameter);
    /**
     * @param startTime
     * @param endTime
     * 说明: 登录后调用此接口, 传入开始和结束时间, 可获取音乐日历
     * 调用例子: /calendar?startTime=1606752000000&endTime=1609430399999
     */
  },

  // 云贝
  // 说明 : 登录后调用此接口可获取云贝签到信息(连续签到天数,第二天全部可获得的云贝)

  // 接口地址 : /yunbei

  // 调用例子 : /yunbei

  // 云贝今日签到信息
  // 说明 : 登录后调用此接口可获取云贝今日签到信息(今日签到获取的云贝数)

  // 接口地址 : /yunbei/today

  // 调用例子 : /yunbei/today

  // 云贝签到
  // 说明 : 登录后调用此接口可进行云贝签到

  // 接口地址 : /yunbei/sign

  // 调用例子 : /yunbei/sign

  // 云贝账户信息
  // 说明 :登录后调用此接口可获取云贝账户信息(账户云贝数)

  // 接口地址 : /yunbei/info

  // 调用例子 : /yunbei/info

  // 云贝所有任务
  // 说明 :登录后调用此接口可获取云贝所有任务

  // 接口地址 : /yunbei/tasks

  // 调用例子 : /yunbei/tasks

  // 云贝todo任务
  // 说明 :登录后调用此接口可获取云贝todo任务

  // 接口地址 : /yunbei/tasks/todo

  // 调用例子 : /yunbei/tasks/todo

  // 云贝完成任务
  // 必选参数 :

  // userTaskId : 任务id

  // 可选参数 :

  // depositCode: 任务depositCode

  // 接口地址 : /yunbei/task/finish

  // 调用例子 : /yunbei/task/finish?userTaskId=5146243240&depositCode=0

  // 云贝收入
  // 说明 :登录后调用此接口可获取云贝收入

  // 可选参数 : limit: 取出评论数量 , 默认为 10

  // offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*10, 其中 10 为 limit 的值

  // 接口地址 : /yunbei/tasks/receipt

  // 调用例子 : /yunbei/tasks/receipt?limit=1

  // 云贝支出
  // 说明 :登录后调用此接口可获取云贝支出

  // 可选参数 : limit: 取出评论数量 , 默认为 10

  // offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*10, 其中 10 为 limit 的值
  // 接口地址 : /yunbei/tasks/expense

  // 调用例子 : /yunbei/tasks/expense?limit=1

  // 关注歌手新歌
  // 说明 :登录后调用此接口可获取关注歌手新歌

  // 可选参数 : limit: 取出评论数量 , 默认为 20

  // before: 上一页数据返回的publishTime的数据

  // 接口地址 : /artist/new/song

  // 调用例子 : /artist/new/song?limit=1 /artist/new/song?limit=1&before=1602777625000

  // 关注歌手新MV
  // 说明 :登录后调用此接口可获取关注歌手新MV

  // 可选参数 : limit: 取出评论数量 , 默认为 20

  // before: 上一页数据返回的publishTime的数据

  // 接口地址 : /artist/new/mv

  // 调用例子 : /artist/new/mv?limit=1 /artist/new/mv?limit=1&before=1602777625000

  // batch批量请求接口
  // 说明 : 登录后调用此接口 ,传入接口和对应原始参数(原始参数非文档里写的参数,需参考源码),可批量请求接口

  // 接口地址 : /batch

  // 调用例子 : 使用GET方式:/batch?/api/v2/banner/get={"clientType":"pc"} 使用POST方式传入参数:{ "/api/v2/banner/get": {"clientType":"pc"} }



}









