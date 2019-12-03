var baseUrl = require("../../utils/api.js");
var util = require("../../utils/util.js");

Page({

  // 跳转播放页
  openPlayerPage: function(event) {
    var songid = event.currentTarget.dataset.songid;
    wx.navigateTo({
      url: '../player/player?songid=' + songid,
    })
  },

  /**
   * 获取详情页
   */
  getDetailPage: function(options) {
    var that = this;
    wx.request({
      url: baseUrl + 'playlist/detail?id=' + options.id,
      success: function(res) {
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


  /**
   * 页面的初始数据
   * 
   */
  data: {
    playlist: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // --------------获取数据---------------
      var that = this;
      // 歌单详情页
      util.getdata('playlist/detail?id=' + options.id, function(res) {

        

        var playCount = res.data.playlist.playCount;
        res.data.playlist.playCount = util.dealPlayCount(playCount);
        that.setData({
          playlist: res.data.playlist
        });
      });

    // 详情页
    // this.getDetailPage(options);

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