var baseUrl = require("../../utils/api.js");
var util = require("../../utils/util.js");

Page({

  // 跳转歌单详情页
  openSongDetailPage: util.openSongDetailPage,

  // 获取歌单广场信息
  getSonglistMessage: function() {
    var that = this;
    wx.request({
      url: baseUrl + 'top/playlist',
      // url: baseUrl + 'playlist/catlist',
      // url: baseUrl + 'playlist/hot',
      success: function(res) {
        if (res.statusCode === 200) {
          console.log(res.data.playlists);
          var playlists = res.data.playlists;
          playlists.forEach((value) => {
            value.playCount = util.dealPlayCount(value.playCount);
          });
          that.setData({
            playlists: res.data.playlists
          });
        }
      }
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    playlists: [] // 歌单列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getSonglistMessage();
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