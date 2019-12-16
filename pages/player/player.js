var util = require("../../utils/util.js");
var app = getApp();

const BackgroundAudioManager = wx.getBackgroundAudioManager();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayState: false, // 播放状态
    isShowPlaylist: false, // 播放列表显示

    // curPlayId: null, // 歌曲ID,保存方便跳转
    // curPlayUrl: null, // 音乐URL
    // curPlayPicUrl: null, // 图片URL
    // curPlaySong: null, // 歌名
    // curPlayAuthor: null, // 歌手

    currentTime: '00:00', // 进度时长
    duration: '00:00', // 总时长
    sliderValue: 0, // 当前滑块值
    sliderMax: 0, // 滑块最大值
    playlist: [], // 播放列表
    playing: {}, // 当前播放的歌曲

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options.id);
    let that = this;
    // let id = options.id;
    let isPlayState = app.globalData.isPlayState; // 播放状态

    let curPlayId = app.globalData.curPlayId; // 歌曲ID,保存方便跳转
    let curPlayUrl = app.globalData.curPlayUrl; // 音乐URL
    let curPlayPicUrl = app.globalData.curPlayPicUrl; // 图片URL
    let curPlaySong = app.globalData.curPlaySong; // 歌名
    let curPlayAuthor = app.globalData.curPlayAuthor; // 歌手


    let playing = app.globalData.playing; // 当前播放的歌曲

    // 包装播放列表数组
    let playlist = [];
    let playlistArr = app.globalData.playlist; // 播放列表
    // console.log(app.globalData.playlist);
    playlistArr.forEach(value => {
      util.getdata("song/url?id=" + value.id, res => {
        playlist.push({
          curPlayId: value.id, // 歌曲ID,保存方便跳转
          curPlayUrl: res.data.data[0].url, // 音乐URL
          curPlayPicUrl: value.al.picUrl, // 图片URL
          curPlaySong: value.name, // 歌名
          curPlayAuthor: value.ar[0].name, // 歌手
        });
      });
    });


    // 时刻更新
    BackgroundAudioManager.onTimeUpdate(function() {
      that.setData({

        currentTime: util.formatTime(BackgroundAudioManager.currentTime * 1000), // 进度时长
        sliderValue: BackgroundAudioManager.currentTime, // 当前滑块值
        
        playlist: playlist, // 播放列表
      });
    });
    // 一次性加载
    that.setData({

      duration: util.formatTime(BackgroundAudioManager.duration * 1000), // 总时长
      sliderMax: BackgroundAudioManager.duration, // 滑块最大值

      isPlayState: isPlayState,



      
      playing: playing, // 当前播放的歌曲


    });





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
    // 设置标题
    wx.setNavigationBarTitle({
      title: `${curPlaySong}-${curPlayAuthor}`
    });
  },

  // 监听事件
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
      util.play(curPlayUrl, curPlayPicUrl, curPlaySong, curPlayAuthor, curPlayId);
    } else {
      util.pause();
    };

    this.setData({
      isPlayState: !isPlayState
    });
    app.globalData.isPlayState = !isPlayState;




  },
  onFullPic: function(event) { // 长按查看原图
    let current = event.currentTarget.dataset.imgurl;
    wx.previewImage({
      current: current,
      urls: [current]
    });
  },
  onChangeProgress: function(event) { // 拖动进度条
    // console.log('当前位置' + event.detail.value);
    const position = event.detail.value;
    BackgroundAudioManager.seek(position);
    this.setData({
      currentTime: util.formatTime(position * 1000), // 进度时长
      sliderValue: position, // 当前滑块值
    });
  },
  onTogglePlaylist: function() {
    let isShowPlaylist = this.data.isShowPlaylist;

    this.setData({
      isShowPlaylist: !isShowPlaylist
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