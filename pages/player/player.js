var util = require("../../utils/util.js");
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayState: false, // 播放状态

    curPlayId: null, // 歌曲ID,保存方便跳转
    curPlayUrl: null, // 音乐URL
    curPlayPicUrl: null, // 图片URL
    curPlaySong: null, // 歌名
    curPlayAuthor: null // 歌手
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id);

    let that = this;
    let id = options.id;
    let isPlayState = app.globalData.isPlayState; // 播放状态

    let curPlayId = app.globalData.curPlayId || options.id; // 歌曲ID,保存方便跳转
    let curPlayUrl = app.globalData.curPlayUrl; // 音乐URL
    let curPlayPicUrl = app.globalData.curPlayPicUrl; // 图片URL
    let curPlaySong = app.globalData.curPlaySong; // 歌名
    let curPlayAuthor = app.globalData.curPlayAuthor; // 歌手

    if (id) {

      util.getdata("song/url?id=" + id, res => {

        curPlayId = id; // 歌曲ID,保存方便跳转
        curPlayUrl = res.data.data[0].url; // 音乐URL

        util.getdata('song/detail?ids=' + id, res => {
          // console.log(res.data);

          curPlayPicUrl = res.data.songs[0].al.picUrl;
          curPlaySong = res.data.songs[0].al.name;
          curPlayAuthor = res.data.songs[0].ar[0].name;

          // 传递给全局
          app.globalData.isShowPlayBar = true;
          util.play(curPlayUrl, curPlayPicUrl, curPlaySong, curPlayAuthor, curPlayId);

          that.setData({
            isPlayState: isPlayState,
            curPlayId: curPlayId,
            curPlayUrl: curPlayUrl,
            curPlayPicUrl: curPlayPicUrl,
            curPlaySong: curPlaySong,
            curPlayAuthor: curPlayAuthor,
          });

          
        });
      });


      
    };


    that.setData({
      isPlayState: isPlayState,
      curPlayId: curPlayId,
      curPlayUrl: curPlayUrl,
      curPlayPicUrl: curPlayPicUrl,
      curPlaySong: curPlaySong,
      curPlayAuthor: curPlayAuthor,
    });

    // 监听后台音乐状态
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayState: true
      });
    });
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayState: false
      });
    });
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayState: false
      });
    });
    wx.setNavigationBarTitle({
      title: curPlaySong + "-" + curPlayAuthor
    });



  },

  // 监听事件
  onFullPic: function(event) {
    let current = event.currentTarget.dataset.imgurl;
    wx.previewImage({
      current: current,
      urls: [current]
    });
  },
  onToggleState: function() {
    let that = this;

    let isPlayState = app.globalData.isPlayState // 播放状态
    let curPlayId = app.globalData.curPlayId // 歌曲ID,保存方便跳转
    let curPlayUrl = app.globalData.curPlayUrl // 音乐URL
    let curPlayPicUrl = app.globalData.curPlayPicUrl // 图片URL
    let curPlaySong = app.globalData.curPlaySong // 歌名
    let curPlayAuthor = app.globalData.curPlayAuthor // 歌手

    util.init();

    if (!isPlayState) {
      util.play(curPlayUrl, curPlayPicUrl, curPlaySong, curPlayAuthor);
    } else {
      util.pause();
    };

    this.setData({
      isPlayState: !isPlayState
    });
    app.globalData.isPlayState = !isPlayState;


    

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