var baseUrl = require("../../utils/api.js");
var util = require("../../utils/util.js");

Page({

  /**
   * 获取详情页
   */
  getDetailPage: function(options) {
    var that = this;
    wx.request({
      url: baseUrl + 'playlist/detail?id=' + options.id,
      success: function (res) {
        if (res.statusCode === 200) {
          // console.log(res);
          var playCount = res.data.playlist.playCount;
          res.data.playlist.playCount = util.dealPlayCount(playCount);
          that.setData({
            playlist: res.data.playlist
          });
        }
      }
    });
  },



  // 跳转公共方法
  toPages: function (event) {
    let to = event.currentTarget.dataset.to;
    let id = event.currentTarget.dataset.id;
    switch (to) {
      case 'songListSquare': // 歌单广场页
        util.navigateTo('../songListSquare/songListSquare');
        break;
      case 'songListDetail': // 歌单详情页
        util.navigateTo('../songListDetail/songListDetail?id=' + id);
        break;
      case 'player': // 音乐播放页
        util.navigateTo('../player/player?id=' + id);
        break;
    };
  },


  /**
   * 页面的初始数据
   */
  data: {

    playlist: {}, //  
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {





    // 详情页
    this.getDetailPage(options);
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