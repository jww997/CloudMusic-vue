/**
 * @Author: Gavin
 * @Begin: 2020-12-30 10:49:29
 * @Update: 2020-12-30 10:49:29
 * @Update log: 接口整合
 */
import axios from 'axios'

// axios.defaults.timeout = 5000; // 默认5s超时
// axios.defaults.baseURL = 'http://49.234.76.196:3000/';
// axios.defaults.baseURL = 'http://localhost:3000/';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const limit = 20;
const api = "http://www.mikonchen.top:3000/";
// let api = "http://49.234.76.196:3000/";
// let api = "http://localhost:3000/";


function request(port, parameter = {}, isNeedCookie = true) {
  const that = this;
  port += `?timestamp=${Date.parse(new Date()) / 1000}`;
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
  getUserPlaylist: parameter => { // 获取用户歌单
    return request("user/playlist", parameter);
    /**
     * @param uid 用户id
     * @param limit (选)返回数量,默认为30
     * @param offset (选)偏移数量，用于分页,如:(页数-1)*30,其中30为limit的值,默认为0
     * 说明:登录后调用此接口,传入用户id,可以获取用户歌单
     */
  },





  getRecommendResource: parameter => { // 获取每日推荐歌单(需要登录)
    return request("recommend/resource", parameter);
    /**
     * 说明:调用此接口,可获得每日推荐歌单
     */
  },
  getRecommendSongs: parameter => { // 获取每日推荐歌曲(需要登录)
    return request("recommend/songs", parameter);
    /**
     * 说明:调用此接口,可获得每日推荐歌曲
     */
  },








  getLyric: parameter => { // 获取歌词
    return request("lyric", parameter);
    /**
     * @param id 音乐id
     * 说明:调用此接口,传入音乐id可获得对应音乐的歌词(不需要登录)
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















  getMvSub: parameter => { // 收藏/取消收藏MV
    return request("mv/sub", parameter);
    /**
     *  @param mvid MVid
     *  @param t (选)1为收藏,其他为取消收藏
     * 说明:调用此接口,可收藏/取消收藏MV
     */
  },
  getMvSublist: parameter => { // 收藏的MV列表
    return request("mv/sublist", parameter);
    /**
     * 说明:调用此接口,可获取收藏的MV列表
     */
  },





  getTopMv: parameter => { // mv排行
    return request("top/mv", parameter);
    /**
     *  @param limit (选)取出数量,默认为30
     *  @param area (选)地区,可选值为内地,港台,欧美,日本,韩国,不填则为全部
     *  @param offset (选)偏移数量,用于分页,如:(页数-1)*30,其中30为limit的值,默认为0
     * 说明:调用此接口,可获取mv排行
     */
  },
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








  getUserEvent: parameter => { // 获取用户动态
    return request("user/event", parameter);
    /**
     *  @param uid 用户id
     *  @param limit (选)返回数量,默认为30
     *  @param lasttime (选)返回数据的lasttime,默认-1,传入上一次返回结果的lasttime,将会返回下一页的数据
     *  说明:登录后调用此接口,传入用户id,可以获取用户动态
     *  返回结果的type参数对应:
     *  18分享单曲
     *  19分享专辑
     *  17、28分享电台节目
     *  22转发
     *  39发布视频
     *  35、13分享歌单
     *  24分享专栏文章
     *  41、21分享视频
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



























  getArtistMv: parameter => { // 获取歌手mv
    return request("artist/mv", parameter);
    /**
     * @param id 歌手id,可由搜索接口获得
     * 说明:调用此接口,传入歌手id,可获得歌手mv信息,具体mv播放地址可调用/mv传入此接口获得的mvid来拿到,如:/artist/mv?id=6452,/mv?mvid=5461064
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









