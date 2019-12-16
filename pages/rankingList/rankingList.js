var util = require("../../utils/util.js");
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    list: null, // 排行榜列表

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // --------------获取数据---------------
    var that = this;
    util.getdata('toplist', res => {
      console.log(res.data);
      that.setData({
        list: res.data.list // 排行榜列表
      });

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

    let that = this;
    let isPlayState = app.globalData.isPlayState;
    let isShowPlayBar = app.globalData.isShowPlayBar;
    let curPlayUrl = app.globalData.curPlayUrl;
    let curPlayPicUrl = app.globalData.curPlayPicUrl;
    let curPlaySong = app.globalData.curPlaySong;
    let curPlayAuthor = app.globalData.curPlayAuthor;
    let curPlayId = app.globalData.curPlayId;

    that.setData({
      isPlayState: isPlayState,
      isShowPlayBar: isShowPlayBar,

      curPlayUrl: curPlayUrl,
      curPlayPicUrl: curPlayPicUrl,
      curPlaySong: curPlaySong,
      curPlayAuthor: curPlayAuthor,
      curPlayId: curPlayId

    });

    // 监听后台音乐状态
    wx.onBackgroundAudioPlay(function (event) {
      // console.log('onBackgroundAudioPlay');
      that.setData({
        isPlayState: true
      });
    });
    wx.onBackgroundAudioPause(function (event) {
      // console.log('onBackgroundAudioPause');
      that.setData({
        isPlayState: false
      });
    });
    wx.onBackgroundAudioStop(function (event) {
      // console.log('onBackgroundAudioStop');
      that.setData({
        isPlayState: false
      });
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