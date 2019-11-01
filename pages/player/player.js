var baseUrl = require("../../utils/api.js");
var app = getApp();
Page({

  /**
   * 获取歌曲详情信息
   */
  getSongMessage: function(options) {
    var that = this;
    wx.request({
      url: baseUrl + "song/url?id=" + options.songid,
      success: function(res) {
        if (res.statusCode === 200) {
          // console.log(res);
          that.setData({
            dataUrl: res.data.data[0].url
          });

          wx.request({
            url: baseUrl + 'song/detail?ids=' + options.songid,
            success: function(res) {
              if (res.statusCode === 200) {
                // console.log(res);
                that.setData({
                  coverImgUrl: res.data.songs[0].al.picUrl,
                  title: res.data.songs[0].al.name + ' - ' + res.data.songs[0].ar[0].name
                });
                that.onplayTab();

                wx.setNavigationBarTitle({
                  title: that.data.title
                });
              };
            }
          });
        };
      }
    });
  },

  // 监听播放暂停事件
  onplayTab: function() {
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      });
    } else {
      wx.playBackgroundAudio({
        dataUrl: this.data.dataUrl,
        title: this.data.title,
        coverImgUrl: this.data.coverImgUrl
      });
      this.setData({
        isPlayingMusic: true
      });
    };
  },

  // 监听长按，全屏图片
  onFullScreen: function(event) {
    // console.log(event);
    var src = event.currentTarget.dataset.imgurl;
    wx.previewImage({
      current: src,
      urls: [src]
    });
  },

  // 监听页面变化
  setSongMonitor: function() {
    var that = this;
    wx.onBackgroundAudioPlay(function() {
      that.setData({
        isPlayingMusic: true
      });
    });
    wx.onBackgroundAudioPause(function() {
      that.setData({
        isPlayingMusic: false
      });
    });
    wx.onBackgroundAudioStop(function() {
      that.setData({
        isPlayingMusic: false
      });
    });
  },

  

  /**
   * 页面的初始数据
   */
  data: {
    // curPlayingImg: "", // 歌曲图片
    // curPlayingName: "", // 歌曲名字
    // curPlayingAuthor: "", // 歌手名字
    isPlayingMusic: false, // 是否正在播放
    dataUrl: null, // 音乐URL地址
    coverImgUrl: null, // 图片URL地址
    title: "", // 歌名-歌手
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取歌曲信息
    this.getSongMessage(options);
    // 页面变化
    this.setSongMonitor();




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