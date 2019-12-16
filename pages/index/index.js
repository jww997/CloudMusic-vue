var util = require("../../utils/util.js");
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    curPlayId: null, // 歌曲ID
    curPlayUrl: null, // 歌曲URL
    curPlayPicUrl: null, // 图片URL
    curPlaySong: null, // 歌名
    curPlayAuthor: null, // 歌手

    isPlayState: false, // 播放状态
    isShowPlayBar: false, // 播放栏显示
    isNewDiscs: true, // 新碟新歌切换
    curHomeIndex: 1, // 顶部导航下标

    banners: [], // 轮播图
    recommends: [], // 推荐歌单
    newDiscs: [], // 新碟
    newSongs: [], // 新歌
  },

  // 跳转公共方法
  toPages: function(event) {
    // console.log(event);
    let to = event.currentTarget.dataset.to;
    console.log('to=' + to);
    let id = event.currentTarget.dataset.id;
    console.log('id=' + id);
    let type = event.currentTarget.dataset.type || 'recommends';
    switch (to) {
      case 'songListSquare': // 歌单广场页
        util.navigateTo('/pages/songListSquare/songListSquare');
        break;
      case 'songListDetail': // 歌单详情页
        util.navigateTo('/pages/songListDetail/songListDetail?type=' + type + '&id=' + id);
        break;
      case 'search': // 搜索页
        util.navigateTo('/pages/search/search');
        break;
      case 'rankingList': // 排行榜
        util.navigateTo('/pages/rankingList/rankingList');
        break;
      case 'player': // 音乐播放页
        util.getdata("check/music?id=" + id, res => {
          if (res.data.success) {
            let that = this;
            util.getdata("song/url?id=" + id, res => {
              let curPlayId = id; // 歌曲ID,保存方便跳转
              let curPlayUrl = res.data.data[0].url; // 音乐URL
              util.getdata('song/detail?ids=' + id, res => {
                // console.log(res.data);
                let curPlaySong = res.data.songs[0].name;
                let curPlayPicUrl = res.data.songs[0].al.picUrl;
                let curPlayAuthor = res.data.songs[0].ar[0].name;
                // 传递给全局
                app.globalData.isShowPlayBar = true;
                app.globalData.isPlayState = true; // 播放状态
                app.globalData.curPlayId = curPlayId; // 歌曲ID,保存方便跳转
                app.globalData.curPlayUrl = curPlayUrl; // 音乐URL
                app.globalData.curPlayPicUrl = curPlayPicUrl; // 图片URL
                app.globalData.curPlaySong = curPlaySong; // 歌名
                app.globalData.curPlayAuthor = curPlayAuthor; // 歌手
                that.setData({
                  isPlayState: true,
                  curPlayId: curPlayId,
                  curPlayUrl: curPlayUrl,
                  curPlayPicUrl: curPlayPicUrl,
                  curPlaySong: curPlaySong,
                  curPlayAuthor: curPlayAuthor,
                });
                util.play(curPlayUrl, curPlayPicUrl, curPlaySong, curPlayAuthor, curPlayId);
                util.navigateTo('/pages/player/player');
              });

            });
          };
        }, res => {
          wx.showToast({
            title: '暂无版权',
            icon: 'none',
          });
        });
        break;
    };
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // --------------获取数据---------------
    var that = this;
    // 轮播图
    util.getdata('banner', function(res) {
      that.setData({
        banners: res.data.banners
      });
    });
    // 推荐歌单
    util.getdata('personalized?limit=' + 6, function(res) {
      that.setData({
        recommends: res.data.result
      });
      let recommends = that.data.recommends,
        playCounts = new Array();
      recommends.forEach(value => {
        playCounts.push(value.playCount);
      });
      playCounts = util.dealPlayCount(playCounts);
      recommends.forEach(value => {
        value.playCount = playCounts.shift();
      });
      that.setData({
        recommends: recommends
      });
    });
    // 新碟
    util.getdata('album/newest', function(res) {
      // console.log(res.data.albums);
      that.setData({
        newDiscs: res.data.albums
      });
    });
    // 新歌
    util.getdata('top/song?type=0', function(res) {
      // console.log(res);
      that.setData({
        newSongs: res.data.data
      });
    });

    // 监听后台音乐状态
    wx.onBackgroundAudioPlay(function(event) {
      // console.log('onBackgroundAudioPlay');
      that.setData({
        isPlayState: true
      });
    });
    wx.onBackgroundAudioPause(function(event) {
      // console.log('onBackgroundAudioPause');
      that.setData({
        isPlayState: false
      });
    });
    wx.onBackgroundAudioStop(function(event) {
      // console.log('onBackgroundAudioStop');
      that.setData({
        isPlayState: false
      });
    });

  },

  // 监听事件
  onTogglePlayState: function() { // 播放状态切换
    let that = this;
    let isPlayState = app.globalData.isPlayState;
    let curPlayId = app.globalData.curPlayId;
    let curPlayUrl = app.globalData.curPlayUrl;
    let curPlayPicUrl = app.globalData.curPlayPicUrl;
    let curPlaySong = app.globalData.curPlaySong;
    let curPlayAuthor = app.globalData.curPlayAuthor;

    util.toggle(curPlayUrl, curPlayPicUrl, curPlaySong, curPlayAuthor, curPlayId);

    that.setData({
      isPlayState: !isPlayState,
    });
  },
  onToggleNewList: function(event) { // 新碟新歌切换
    // console.log(event);
    let isnewdiscs = Boolean(event.currentTarget.dataset.isnewdiscs) || false;
    let curIsnewdiscs = this.data.isNewDiscs;
    if (curIsnewdiscs !== isnewdiscs) {
      this.setData({
        isNewDiscs: isnewdiscs
      });
    };
  },
  onToggleHomeIndex: function(event) { // 首页导航切换
    // console.log(event);
    let that = this;
    if (typeof event.detail.current === 'number') { // 拖拽
      let current = event.detail.current;
      that.setData({
        curHomeIndex: current
      });
    } else { // 点击
      let curIndex = event.currentTarget.dataset.index;
      let curHomeIndex = that.data.curHomeIndex;
      if (curIndex != curHomeIndex) {
        that.setData({
          curHomeIndex: curIndex
        });
      };
    };
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
    wx.onBackgroundAudioPlay(function(event) {
      // console.log('onBackgroundAudioPlay');
      that.setData({
        isPlayState: true
      });
    });
    wx.onBackgroundAudioPause(function(event) {
      // console.log('onBackgroundAudioPause');
      that.setData({
        isPlayState: false
      });
    });
    wx.onBackgroundAudioStop(function(event) {
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