var util = require("../../utils/util.js");
var app = getApp();

Page({

  // 跳转公共方法
  toPages: function(event) {
    // console.log(event);
    let to = event.currentTarget.dataset.to;
    let id = event.currentTarget.dataset.id;
    let type = event.currentTarget.dataset.type || 'recommends';
    switch (to) {
      case 'songListSquare': // 歌单广场页
        util.navigateTo('/pages/songListSquare/songListSquare');
        break;
      case 'songListDetail': // 歌单详情页
        util.navigateTo('/pages/songListDetail/songListDetail?type=' + type + '&id=' + id);
        break;
      case 'player': // 音乐播放页
        util.navigateTo('/pages/player/player?id='+id);
        break;
    };
  },

  /**
   * 页面的初始数据
   */
  data: {

    banners: [], // 轮播图
    recommends: [], // 推荐歌单
    newDiscs: [], // 新碟
    newSongs: [], // 新歌

    curBigSwiperItem: 1, // 默认大容器选中下标
    isNewDiscs: true, // 控制显示新碟&新歌


    isPlayState: false, // 播放状态
    isShowPlayBar: false, // 播放栏显示隐藏

    curPlayUrl: null, // 音乐URL
    curPlayPicUrl: null, // 图片URL
    curPlaySong: null, // 歌名
    curPlayAuthor: null // 歌手

  },

  // 切换新碟&新歌
  toggleNewList: function(event) {
    // console.log(event);
    let i = Boolean(event.currentTarget.dataset.isnewdiscs) || false;
    let curIsnewdiscs = this.data.isNewDiscs;
    if (curIsnewdiscs !== i) {
      this.setData({
        isNewDiscs: i
      });
    };
  },
  // 切换大容器
  toggleCurBigSwiperItem: function(event) {
    // console.log(event);
    let that = this;

    let curBigSwiperItem = that.data.curBigSwiperItem;

    if (typeof event.detail.current === 'number') { // 拖拽

      let current = event.detail.current;
      that.setData({
        curBigSwiperItem: current
      });

    } else { // 点击

      let curIndex = event.currentTarget.dataset.index;
      if (curIndex != curBigSwiperItem) {
        that.setData({
          curBigSwiperItem: curIndex
        });
      };

    };


    // console.log(curIndex);
    // if (0 <= curIndex <= 3) {
    //   curIndex = event.currentTarget.dataset.index;
    //   that.setData({
    //     curBigSwiperItem: curIndex
    //   });
    // } else {
    //   let index = event.currentTarget.dataset.index;
    //   curIndex = that.data.curBigSwiperItem;
    //   if (curIndex != index) {
    //     that.setData({
    //       curBigSwiperItem: index
    //     });
    //   };
    // };
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


    // --------------获取数据---------------
    var that = this;
    // 轮播图
    util.getdata('banner', function(res) {
      that.setData({
        banners: res.data.banners
      });
    });
    // 推荐歌单
    util.getdata('personalized?limit=' + 6, function(res) {
      that.setData({
        recommends: res.data.result
      });
      let recommends = that.data.recommends,
        playCounts = new Array();
      recommends.forEach(value => {
        playCounts.push(value.playCount);
      });
      playCounts = util.dealPlayCount(playCounts);
      recommends.forEach(value => {
        value.playCount = playCounts.shift();
      });
      that.setData({
        recommends: recommends
      });
    });
    // 新碟
    util.getdata('album/newest', function(res) {
      // console.log(res.data.albums);

      that.setData({
        newDiscs: res.data.albums
      });
    });
    // 新歌
    util.getdata('top/song?type=0', function(res) {
      that.setData({
        newSongs: res.data.data
      });
    });


    // var id = options.id || app.globalData.curPlayId;
    // 播放数据
    // util.getdata("song/url?id=" + id, function(res) {
    //   // console.log(res.data);
    //   let curPlayUrl = res.data.data[0].url;

    //   util.getdata('song/detail?ids=' + id, function(res) {
    //     // console.log(res.data);

    //     let curPlaySong = res.data.songs[0].al.name;
    //     let curPlayPicUrl = res.data.songs[0].al.picUrl;
    //     let curPlayAuthor = res.data.songs[0].ar[0].name;

    //     // 传递给局部
    //     that.setData({
    //       isPlayState: true,

    //       curPlayUrl: curPlayUrl,
    //       curPlaySong: curPlaySong,
    //       curPlayPicUrl: curPlayPicUrl,
    //       curPlayAuthor: curPlayAuthor
    //     });

    //     // 调用小程序API,播放音乐
    //     util.playMusic(curPlayUrl, curPlayPicUrl, curPlaySong, curPlayAuthor, id);

    //     // 监听后台音乐状态
    //     wx.onBackgroundAudioPlay(function() {
    //       that.setData({
    //         isPlayState: true
    //       });
    //     });
    //     wx.onBackgroundAudioPause(function() {
    //       that.setData({
    //         isPlayState: false
    //       });
    //     });
    //     wx.onBackgroundAudioStop(function() {
    //       that.setData({
    //         isPlayState: false
    //       });
    //     });

    //   });
    // });



  },

  // 监听事件
  onTogglePlayState: function() {
    let that = this;
    let isPlayState = that.data.isPlayState;
    let curPlayId = that.data.curPlayId;
    let curPlayUrl = that.data.curPlayUrl;
    let curPlayPicUrl = that.data.curPlayPicUrl;
    let curPlaySong = that.data.curPlaySong;
    let curPlayAuthor = that.data.curPlayAuthor;

    util.toggle(curPlayUrl, curPlayPicUrl, curPlaySong, curPlayAuthor, curPlayId);

    that.setData({
      isPlayState: !isPlayState
    });

    // 同步局部变量
    wx.onBackgroundAudioPlay(function() {
      that.setData({
        isPlayState: true
      });
    });
    wx.onBackgroundAudioPause(function() {
      that.setData({
        isPlayState: false
      });
    });
    wx.onBackgroundAudioStop(function() {
      that.setData({
        isPlayState: false
      });
    });
  },
  onFullPic: function(event) {

    let current = event.currentTarget.dataset.imgurl;
    wx.previewImage({
      current: current,
      urls: [current]
    });

  },
  onToggleState: function() {

    let isPlayState = this.data.isPlayState;
    let curPlayUrl = this.data.curPlayUrl;
    let curPlayPicUrl = this.data.curPlayPicUrl;
    let curPlaySong = this.data.curPlaySong;
    let curPlayAuthor = this.data.curPlayAuthor;

    if (!isPlayState) {
      util.playMusic(curPlayUrl, curPlayPicUrl, curPlaySong, curPlayAuthor);
    } else {
      util.playMusic();
    };

    this.setData({
      isPlayState: !isPlayState
    });

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    // --------------全局数据更新局部---------------
    let that = this;
    let isPlayState = app.globalData.isPlayState;
    let isShowPlayBar = app.globalData.isShowPlayBar;
    let curPlayUrl = app.globalData.curPlayUrl;
    let curPlayPicUrl = app.globalData.curPlayPicUrl;
    let curPlaySong = app.globalData.curPlaySong;
    let curPlayAuthor = app.globalData.curPlayAuthor;

    that.setData({
      isPlayState: isPlayState,
      isShowPlayBar: isShowPlayBar,

      curPlayUrl: curPlayUrl,
      curPlayPicUrl: curPlayPicUrl,
      curPlaySong: curPlaySong,
      curPlayAuthor: curPlayAuthor

    });



  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})