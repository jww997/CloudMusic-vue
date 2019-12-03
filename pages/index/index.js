var util = require("../../utils/util.js");
var app = getApp();

Page({

  // 跳转公共方法
  // openSonglistMore: function(event) {
  //   wx.navigateTo({
  //     url: '../songlist-more/songlist-more',
  //   });
  // },





  // 跳转公共方法
  toPages: function(event) {
    let to = event.currentTarget.dataset.to;
    let id = event.currentTarget.dataset.id;console.log(id);
    switch (to) {
      case 'songListSquare': // 歌单广场页
        util.navigateTo('../songListSquare/songListSquare');
        break;
      case 'songListDetail': // 歌单详情页
        util.navigateTo('../songListDetail/songListDetail?id=' + id);
        break;
      case 'player': // 歌曲播放页
        util.navigateTo('../player/player');
        break;
    };
  },

  /**
   * 页面的初始数据
   */
  data: {

    banners: [], // 轮播图
    recommends: [], // 推荐歌单
    newDiscs: [], // 新碟
    newSongs: [], // 新歌

    isNewDiscs: true, // 控制显示新碟&新歌
    curBigSwiperItem: 1, // 默认大容器选中下标


    isPlayState: false, // 播放状态

    curPlayUrl: null, // 音乐URL
    curPlayPicUrl: null, // 图片URL
    curPlaySong: null, // 歌名
    curPlayAuthor: null // 歌手

  },

  // 切换新碟&新歌
  toggleNewList: function(event) {
    // console.log(event);
    let i = Boolean(event.currentTarget.dataset.isnewdiscs) || false;
    let curIsnewdiscs = this.data.isNewDiscs;
    if (curIsnewdiscs !== i) {
      this.setData({
        isNewDiscs: i
      });
    };
  },
  // 切换大容器
  toggleCurBigSwiperItem: function(event) {
    // console.log(event);
    let that = this;
    let curIndex = event.detail.current;
    console.log(curIndex);
    if (0 <= curIndex <= 3) {
      that.setData({
        curBigSwiperItem: curIndex
      });
    } else {
      let index = event.currentTarget.dataset.index;
      curIndex = that.data.curBigSwiperItem;
      if (curIndex != index) {
        that.setData({
          curBigSwiperItem: index
        });
      };
    };
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


    // --------------获取数据---------------
      var that = this;
      // 轮播图
      util.getdata('banner', function (res) {
        that.setData({ 
          banners: res.data.banners
        });
      });
      // 推荐歌单
      util.getdata('personalized?limit=' + 6, function (res) {
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
      util.getdata('album/newest', function (res) {
        that.setData({
          newDiscs: res.data.albums
        });
      });
      // 新歌
      util.getdata('top/song?type=0', function (res) {
        that.setData({
          newSongs: res.data.data
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
    let curPlayUrl = app.globalData.curPlayUrl;
    let curPlayPicUrl = app.globalData.curPlayPicUrl;
    let curPlaySong = app.globalData.curPlaySong;
    let curPlayAuthor = app.globalData.curPlayAuthor;

    that.setData({
      isPlayState: isPlayState,

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