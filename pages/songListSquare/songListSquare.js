var util = require("../../utils/util.js");
var app = getApp();

Page({

  // 跳转公共方法
  toPages: function (event) {
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
        util.navigateTo('/pages/player/player');
        break;
    };
  },

  /**
   * 页面的初始数据
   */
  data: {

    playlists: [], // 歌单列表

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // --------------获取数据---------------
      var that = this;
      // 歌单列表
      util.getdata('top/playlist', function (res) {
        that.setData({
          playlists: res.data.playlists
        });
        let playlists = that.data.playlists,
          playCounts = new Array();
        playlists.forEach(value => {
          playCounts.push(value.playCount);
        });
        playCounts = util.dealPlayCount(playCounts);
        playlists.forEach(value => {
          value.playCount = playCounts.shift();
        });
        that.setData({
          playlists: playlists
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