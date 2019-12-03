import "api.js";

var baseUrl = require("./api.js");
var app = getApp();


// 调用API接口，获取数据
function getdata(parameter, fn) {
  wx.request({
    url: baseUrl + parameter,
    header: {
      'Content-Type': 'application/json'
    },
    success: function(res) {
      if (res.statusCode === 200) {
        fn(res);
      };
    }
  });
}

// 保留当前页面，跳转到应用内的某个页面
function navigateTo(url) {
  wx.navigateTo({
    url: url,
  });
}

// 处理歌单被播放所有次数单位
function dealPlayCount(countArr) {
  let newCountArr = new Array();
  if (countArr instanceof Array) {
    countArr.forEach(count => {
      if (count > 300000000) {
        newCountArr.push(`${(count / 100000000).toFixed(0)}亿`);
      } else if (count >= 100000000) {
        newCountArr.push(`${(count / 100000000).toFixed(1)}亿`);
      } else if (count >= 100000) {
        newCountArr.push(`${(count / 10000).toFixed(0)}万`);
      } else {
        newCountArr.push(count);
      };
    });

  } else {
    newCountArr.push(countArr);
  };
  return newCountArr;
}

// 播放音乐
function playMusic(playUrl, playImgUrl, playTitle, playAuthor, playId) {
  let isPlayState = app.globalData.isPlayState;

  if (!isPlayState) {
    wx.playBackgroundAudio({
      dataUrl: playUrl,
      title: playTitle + "-" + playAuthor,
      coverImgUrl: playImgUrl
    });
    wx.setNavigationBarTitle({
      title: playTitle + "-" + playAuthor
    });
    app.globalData.isPlayState = true;
    app.globalData.curPlayId = playId;
    app.globalData.curPlayUrl = playUrl;
    app.globalData.curPlaySong = playTitle;
    app.globalData.curPlayPicUrl = playImgUrl;
    app.globalData.curPlayAuthor = playAuthor;
  } else {
    wx.pauseBackgroundAudio();
    app.globalData.isPlayState = false;
  };
  // 全局变量
  wx.onBackgroundAudioPlay(function() {
    app.globalData.isPlayState = true;
  });
  wx.onBackgroundAudioPause(function() {
    app.globalData.isPlayState = false;
  });
  wx.onBackgroundAudioStop(function() {
    app.globalData.isPlayState = false;
  });

};

module.exports = {
  getdata: getdata,
  navigateTo: navigateTo,
  dealPlayCount: dealPlayCount,
  playMusic: playMusic,
}