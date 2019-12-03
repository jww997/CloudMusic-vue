var util = require("../../utils/util.js");

Page({


  // 跳转公共方法
  toPages: function (event) {
    let to = event.currentTarget.dataset.to;
    let id = event.currentTarget.dataset.id; console.log(id);
    switch (to) {
      case 'songListSquare': // 歌单广场页
        util.navigateTo('../songListSquare/songListSquare');
        break;
      case 'songListDetail': // 歌单详情页
        util.navigateTo('../songListDetail/songListDetail?id=' + id);
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