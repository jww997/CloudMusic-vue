var util = require("../../utils/util.js");
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayState: false, // 播放状态

    
    curPlayId: null,     // 歌曲ID,保存方便跳转
    curPlayUrl: null,    // 音乐URL
    curPlayPicUrl: null, // 图片URL
    curPlaySong: null,   // 歌名
    curPlayAuthor: null  // 歌手
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // --------------获取数据---------------
    var that = this;
    console.log(that);
    var id = options.id || app.globalData.curPlayId;
    // 播放数据
    util.getdata("song/url?id=" + id, function(res) {
      // console.log(res.data);
      let curPlayUrl = res.data.data[0].url;

      util.getdata('song/detail?ids=' + id, function(res) {
        // console.log(res.data);

        let curPlaySong = res.data.songs[0].al.name;
        let curPlayPicUrl = res.data.songs[0].al.picUrl;
        let curPlayAuthor = res.data.songs[0].ar[0].name;

        // 传递给局部
        that.setData({
          isPlayState: true,

          curPlayUrl: curPlayUrl,
          curPlaySong: curPlaySong,
          curPlayPicUrl: curPlayPicUrl,
          curPlayAuthor: curPlayAuthor
        });

        // 调用小程序API,播放音乐
        util.playMusic(curPlayUrl, curPlayPicUrl, curPlaySong, curPlayAuthor, id);

        // 监听后台音乐状态
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

      });
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