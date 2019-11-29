var baseUrl = require("../../utils/api.js");
var util = require("../../utils/util.js");

Page({

  // 跳转歌单详情页
  openSongDetailPage: util.openSongDetailPage,

  // 跳转歌单广场
  openSonglistMore: function(event) {
    wx.navigateTo({
      url: '../songlist-more/songlist-more',
    });
  },

  

  /**
   * 获取轮播图
   */
  getBanner: function() {
    var that = this;
    wx.request({
      url: baseUrl + 'banner',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        // console.log(res);
        if (res.statusCode === 200) {
          that.setData({
            banners: res.data.banners
          });
        }
      }
    });
  },

  // 获取推荐歌单
  getRecommendSong: function(num) {
    var that = this;
    wx.request({
      url: baseUrl + 'personalized?limit=' + num,
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        // console.log(res);
        if (res.statusCode === 200) {
          var playCounts = res.data.result;
          playCounts.forEach((item) => {
            item.playCount = util.dealPlayCount(item.playCount);
          });
          that.setData({
            recommends: res.data.result
          });
        };
      }
    });
  },
  
  /**
   * 获取新碟
   */
  getNewDiscs: function(num) {
    var that = this;
    wx.request({
      url: baseUrl + 'top/album?offset=0&limit=' + num,
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        // console.log(res.data.albums);
        if (res.statusCode === 200) {
          that.setData({
            newDiscs: res.data.albums
          });
        }
      }
    });
  },

  /**
   * 获取新歌
   */
  getNewSongs: function () {
    var that = this;
    wx.request({
      url: baseUrl + 'personalized/newsong',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data.result);
        if (res.statusCode === 200) {
          that.setData({
            newSongs: res.data.result
          });
        }
      }
    });
  },


  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图
    banners: [],
    // 推荐歌单
    recommends: [],
    // 新碟
    newDiscs: [],
    // 新歌
    newSongs: [],

    // 菜单按钮列表
    menuBtnList: [{
      menuBtnIcon: 'icon-sirenfm',
      menuBtnText: '私人FM'
    },
    {
      menuBtnIcon: 'icon-diantai',
      menuBtnText: '电台'
    },
    {
      menuBtnIcon: 'icon-paihangbang',
      menuBtnText: '排行榜'
    },
    {
      menuBtnIcon: 'icon-gedan',
      menuBtnText: '歌单'
    },
    {
      menuBtnIcon: 'icon-meirituijian',
      menuBtnText: '每日推荐'
    }],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 轮播图
    this.getBanner();
    // 推荐歌单
    this.getRecommendSong(6);
    // 新碟
    this.getNewDiscs(6);
    // 新歌
    this.getNewSongs();
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