var util = require("../../utils/util.js");
var app = getApp();

const BackgroundAudioManager = app.globalData.BackgroundAudioManager;

Page({

  /**
   * 页面的初始数据
   */
  data: {

    playing: {
      id: null, // 歌曲ID
      url: null, // 音乐地址
      image: null, // 图片地址
      title: null, // 歌名
      singer: null, // 歌手
    }, // 当前播放的歌曲
    playlist: [], // 播放列表
    playIndex: 0, // 当前歌曲在播放列表中的index

    isPlayState: false, // 播放&暂停
    isShowPlayBar: false, // 显示&隐藏 底部栏
    isShowPlaylist: false, // 显示&隐藏 播放列表

    currentTime: '00:00', // 进度时长
    duration: '00:00', // 总时长
    sliderValue: 0, // 当前滑块值
    sliderMax: 0, // 滑块最大值

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // let that = this;
    // let {
    //   playing, // 当前播放的歌曲
    //   playlist, // 播放列表
    //   playIndex, // 当前歌曲在播放列表中的index
    //   isPlayState, // 播放&暂停
    //   isShowPlayBar, // 显示&隐藏 底部栏
    //   isShowPlaylist, // 显示&隐藏 播放列表
    // } = app.globalData;

    // that.setData({
    //   playing: playing, // 当前播放的歌曲
    //   playIndex: playIndex, // 当前歌曲在播放列表中的index
    // });

    // 时刻更新
    // BackgroundAudioManager.onTimeUpdate(function() {

    //   that.setData({

    //     currentTime: util.formatTime(BackgroundAudioManager.currentTime * 1000), // 进度时长
    //     duration: util.formatTime(BackgroundAudioManager.duration * 1000), // 总时长
    //     sliderValue: BackgroundAudioManager.currentTime, // 当前滑块值
    //     sliderMax: BackgroundAudioManager.duration, // 滑块最大值

    //     playlist: playlist, // 播放列表
    //     isPlayState: isPlayState, // 播放状态

    //   });
    // });

    // // 监听后台音乐状态
    // BackgroundAudioManager.onPlay(() => {
    //   that.setData({
    //     isPlayState: true
    //   });
    //   app.globalData.isPlayState = true;
    // });
    // BackgroundAudioManager.onPause(() => {
    //   that.setData({
    //     isPlayState: false
    //   });
    //   app.globalData.isPlayState = false;
    // });
    // BackgroundAudioManager.onEnded(() => {
    //   // this.onChangePlaying();

    //   let that = this;
    //   let {
    //     playIndex,
    //     playlist,
    //     playing,
    //     isPlayState
    //   } = app.globalData;

    //   playIndex++;
    //   playing = playlist[playIndex];
    //   console.log(playing);
    //   BackgroundAudioManager.src = playing.url;
    //   BackgroundAudioManager.title = playing.title;
    //   BackgroundAudioManager.coverImgUrl = playing.image;
    //   BackgroundAudioManager.singer = playing.singer;
    //   that.setData({
    //     isPlayState: true,
    //     playing: playing
    //   });
    //   app.globalData.isPlayState = true;
    //   app.globalData.playIndex = playIndex;
    // });
    // // 设置标题
    // wx.setNavigationBarTitle({
    //   title: `${playing.title}-${playing.singer}`
    // });
  },

  // 监听事件
  onChangeProgress: function(event) { // 拖动进度条
    // console.log('当前位置' + event.detail.value);
    const position = event.detail.value;
    BackgroundAudioManager.seek(position);
    this.setData({
      currentTime: util.formatTime(position * 1000), // 进度时长
      sliderValue: position, // 当前滑块值
    });
  },
  onChangePlaying: function(event) { // 上一首&下一首

    // let id = Number(event.currentTarget.dataset.id) || 1;
    // let type = event.currentTarget.dataset.type;

    let that = this;

    console.log(event);

    let {
      id,
      type
    } = event.currentTarget.dataset;

    let {
      playIndex,
      playlist,
      playing,
    } = app.globalData;

    if (type) {
      playIndex = playIndex + Number(id); // 上下一首
      console.log(playIndex);
    } else {
      playIndex = Number(id); // 列表切歌
    };

    if (playIndex < 0 || playIndex >= playlist.length) return;

    playing = playlist[playIndex];
    console.log(playing);

    if (playing.url) {

      BackgroundAudioManager.src = playing.url;
      BackgroundAudioManager.title = playing.title;
      BackgroundAudioManager.coverImgUrl = playing.image;
      BackgroundAudioManager.singer = playing.singer;

      that.setData({
        playing: playing, // 当前播放的歌曲
        playIndex: playIndex, // 当前歌曲在播放列表中的index
      });

      app.globalData.playing = playing;
      app.globalData.playIndex = playIndex;
  

      // 设置标题
      wx.setNavigationBarTitle({
        title: `${playing.title}-${playing.singer}`
      });

    } else {
      wx.showToast({
        title: '你该充钱了',
        icon: 'none',
        duration: 1500
      });
      // this.onChangePlaying(event);
    };

  },
  onChangeOrder: function(event) { // 顺序&随机&单曲

  },
  onTogglePlayState: function (event) { // 播放&暂停

    let that = this;
    let {
      isPlayState
    } = that.data;

    console.log('-------------------that.data------------------------');
    console.log('isPlayState=' + isPlayState);

    if (!isPlayState) {
      BackgroundAudioManager.play();
    } else {
      BackgroundAudioManager.pause();
    };
    isPlayState = !isPlayState;
    // 更新局部
    that.setData({
      isPlayState
    });
    // 更新全局
    app.globalData.isPlayState = isPlayState;

  },
  onShowPlaylist: function(event) { // 列表显示
    this.setData({
      isShowPlaylist: true
    });
  },
  onHidePlaylist: function(event) { // 列表隐藏
    this.setData({
      isShowPlaylist: false
    });
  },
  onFullPic: function(event) { // 长按查看原图
    let current = event.currentTarget.dataset.imgurl;
    wx.previewImage({
      current: current,
      urls: [current]
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
    let {
      playing, // 当前播放的歌曲
      playlist, // 播放列表
      playIndex, // 当前歌曲在播放列表中的index
      isPlayState, // 播放&暂停
      isShowPlayBar, // 显示&隐藏 底部栏
      isShowPlaylist, // 显示&隐藏 播放列表
    } = app.globalData;

    console.log(playing);
    console.log(isPlayState);
    console.log(playIndex);

    // 更新局部
    that.setData({
      playing: playing, // 当前播放的歌曲
      // playIndex: playIndex, // 当前歌曲在播放列表中的index
      isPlayState: isPlayState, // 播放状态

    });
    // 更新全局
    app.globalData.isShowPlayBar = true;

    if (playing.url) {
      BackgroundAudioManager.src = playing.url;
      BackgroundAudioManager.title = playing.title;
      BackgroundAudioManager.coverImgUrl = playing.image;
      BackgroundAudioManager.singer = playing.singer;
    };

    // 时刻更新
    BackgroundAudioManager.onTimeUpdate(function() {
      // console.log(app.globalData);
      that.setData({

        currentTime: util.formatTime(BackgroundAudioManager.currentTime * 1000), // 进度时长
        duration: util.formatTime(BackgroundAudioManager.duration * 1000), // 总时长
        sliderValue: BackgroundAudioManager.currentTime, // 当前滑块值
        sliderMax: BackgroundAudioManager.duration, // 滑块最大值

        playlist: playlist, // 播放列表
        // isPlayState: isPlayState, // 播放状态

        // playing: playing, // 当前播放的歌曲
        playIndex: playIndex, // 当前歌曲在播放列表中的index

      });

      

    });

    

    // 监听后台音乐状态
    BackgroundAudioManager.onPlay(() => {
      that.setData({
        isPlayState: true
      });
      app.globalData.isPlayState = true;
    });
    BackgroundAudioManager.onPause(() => {
      that.setData({
        isPlayState: false
      });
      app.globalData.isPlayState = false;
    });
    BackgroundAudioManager.onEnded(() => {
      // this.onChangePlaying();

      let that = this;
      let {
        playIndex,
        playlist,
        playing,
        isPlayState
      } = app.globalData;

      playIndex++;
      playing = playlist[playIndex];
      console.log(playing);
      if (playing.url) {
        BackgroundAudioManager.src = playing.url;
        BackgroundAudioManager.title = playing.title;
        BackgroundAudioManager.coverImgUrl = playing.image;
        BackgroundAudioManager.singer = playing.singer;
      };
      that.setData({
        isPlayState: true,
        playing: playing
      });
      app.globalData.isPlayState = true;
      app.globalData.isShowPlayBar = true;
      app.globalData.playIndex = playIndex;
    });
    // 设置标题
    wx.setNavigationBarTitle({
      title: `${playing.title}-${playing.singer}`
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