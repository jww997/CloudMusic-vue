var baseUrl = require("../../utils/api.js");
var util = require("../../utils/util.js");
var app = getApp();

Page({

  // 跳转公共方法
  toPages: function(event) {
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
    curPlayId: null, // 歌曲ID
    curPlayUrl: null, // 歌曲URL
    curPlayPicUrl: null, // 图片URL
    curPlaySong: null, // 歌名
    curPlayAuthor: null, // 歌手

    isPlayState: false, // 播放状态
    isShowPlayBar: false, // 播放栏显示

    playlistBgUrl: '', // 背景图URL
    playlistPicUrl: '', // 歌单照片URL
    playlistName: '', // 歌单名
    playlistAvatarPicUrl: '', // 歌手照片
    playlistAvatarName: '', // 歌手名
    playlistDescription: '', // 歌单描述
    playlistCount: '', // 歌单播放次数
    playlistCommentCount: '', // 歌单评论次数
    playlistShareCount: '', // 歌单评论次数
    playlistSubscribedCount: '', // 歌单收藏次数
    
    playlist: [], // 播放列表
    playing: {}, // 当前播放的歌曲
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options);
    var that = this;
    var id = options.id;
    var type = options.type;


    // ----------获取数据--------------
    switch (type) {
      case 'recommends':
        util.getdata('playlist/detail?id=' + id, function(res) {
          let playlist = res.data.playlist;
          console.log(playlist.tracks);
          that.setData({

            playlistBgUrl: playlist.backgroundCoverUrl, // 背景图URL
            playlistPicUrl: playlist.coverImgUrl, // 歌单照片URL
            playlistName: playlist.name, // 歌单名
            playlistAvatarPicUrl: playlist.creator.avatarUrl, // 歌手照片
            playlistAvatarName: playlist.creator.nickname, // 歌手名
            playlistDescription: playlist.description, // 歌单描述
            playlistCount: util.dealPlayCount(playlist.playCount), // 歌单播放次数
            playlistCommentCount: playlist.commentCount, // 歌单评论次数
            playlistShareCount: playlist.shareCount, // 歌单评论次数
            playlistSubscribedCount: util.dealPlayCount(playlist.subscribedCount), // 歌单收藏次数
            playlistList: playlist.tracks, // 歌单列表

          });
          app.globalData.playlist = that.data.playlistList;
        });
        break;
      case 'newDiscs':
        util.getdata('album?id=' + id, function(res) {
          // console.log(res);

          let album = res.data.album;
          let songs = res.data.songs;
          that.setData({

            playlistBgUrl: album.blurPicUrl, // 背景图URL
            playlistPicUrl: album.picUrl, // 歌单照片URL
            playlistName: album.name, // 歌单名
            playlistAvatarPicUrl: album.artist.picUrl, // 歌手照片
            playlistAvatarName: album.artist.name, // 歌手名
            playlistDescription: album.description, // 歌单描述
            playlistCommentCount: album.info.commentCount, // 歌单评论次数
            playlistShareCount: album.info.shareCount, // 歌单评论次数
            playlistSubscribedCount: util.dealPlayCount(album.info.likedCount), // 歌单收藏次数
            playlistList: songs, // 歌单列表

          });
        });
        break;
    };
    

  },

  // 监听事件
  onPlayList: function(event) {
    let that = this;
    let id = event.currentTarget.dataset.id;

    console.log();

    // console.log(event);
    if (id) {

      // 播放数据
      util.getdata("song/url?id=" + id, function(res) {
        // console.log(res.data);
        let curPlayUrl = res.data.data[0].url;

        util.getdata('song/detail?ids=' + id, function(res) {
          // console.log(res.data);

          let isPlayState = app.globalData.isPlayState;
          let curPlayId = app.globalData.curPlayId;

          let curPlaySong = res.data.songs[0].name;
          let curPlayPicUrl = res.data.songs[0].al.picUrl;
          let curPlayAuthor = res.data.songs[0].ar[0].name;

          if (curPlayUrl) {
            // 传递给局部
            that.setData({
              isPlayState: true,
              isShowPlayBar: true,

              curPlayId: id,
              curPlayUrl: curPlayUrl,
              curPlaySong: curPlaySong,
              curPlayPicUrl: curPlayPicUrl,
              curPlayAuthor: curPlayAuthor
            });
            // 传递给全局
            app.globalData.isShowPlayBar = true;
            app.globalData.playing = {
              curPlayId: id,
              curPlayUrl: curPlayUrl,
              curPlaySong: curPlaySong,
              curPlayPicUrl: curPlayPicUrl,
              curPlayAuthor: curPlayAuthor
            };
          };

          if (curPlayId != id) {

            util.play(curPlayUrl, curPlayPicUrl, curPlaySong, curPlayAuthor, id);

          } else { // 点第二下跳转页面

            // console.log('跳转页面');

            util.navigateTo('../player/player');

          };


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
    };

  },
  onTogglePlayState: function() {
    let that = this;
    let isPlayState = that.data.isPlayState;
    let curPlayId = that.data.curPlayId;
    let curPlayUrl = that.data.curPlayUrl;
    let curPlayPicUrl = that.data.curPlayPicUrl;
    let curPlaySong = that.data.curPlaySong;
    let curPlayAuthor = that.data.curPlayAuthor;

    util.toggle(curPlayUrl, curPlayPicUrl, curPlaySong, curPlayAuthor, curPlayId);

    that.setData({
      isPlayState: !isPlayState
    });

    // 同步局部变量
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