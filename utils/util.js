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
    return newCountArr;

  } else {
    let count = countArr;
    if (count > 300000000) {
      count = `${(count / 100000000).toFixed(0)}亿`;
    } else if (count >= 100000000) {
      count = `${(count / 100000000).toFixed(1)}亿`;
    } else if (count >= 100000) {
      count = `${(count / 10000).toFixed(0)}万`;
    } else {
      count = count;
    };
    return count;
  };

}

// 歌单歌单列表
function playList(playUrl, playImgUrl, playTitle, playAuthor, playId) {
  let isPlayState = app.globalData.isPlayState; 
  init();
  
  // console.log(' app.globalData.curPlayId=' + app.globalData.curPlayId + ',playId=' + playId);

  if (app.globalData.curPlayId != playId) {

    play(playUrl, playImgUrl, playTitle, playAuthor, playId);

  } else { // 点第二下会暂停，改成跳转页面

    // pause(playUrl, playImgUrl, playTitle, playAuthor, playId);
    console.log('跳转');

  };
  

}

// 控制歌曲的播放暂停
function toggle(playUrl, playImgUrl, playTitle, playAuthor, playId) {
  let isPlayState = app.globalData.isPlayState;
  init();

  if (!isPlayState) {
    play(playUrl, playImgUrl, playTitle, playAuthor, playId);
  } else {
    pause();
  };
}
function init() { 
  wx.onBackgroundAudioPlay(function () {
    app.globalData.isPlayState = true;
  });
  wx.onBackgroundAudioPause(function () {
    app.globalData.isPlayState = false;
  });
  wx.onBackgroundAudioStop(function () {
    app.globalData.isPlayState = false;
  });
}
function play(playUrl, playImgUrl, playTitle, playAuthor, playId) {
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
}
function pause() {
  wx.pauseBackgroundAudio();
  app.globalData.isPlayState = false;
}

// 跳转公共方法
function toPages(event) {
  return function(event) {
    // console.log(event);
    let to = event.currentTarget.dataset.to;
    let id = event.currentTarget.dataset.id;
    switch (to) {
      case 'songListSquare': // 歌单广场页
        util.navigateTo('/pages/songListSquare/songListSquare');
        break;
      case 'songListDetail': // 歌单详情页
        util.navigateTo('/pages/songListDetail/songListDetail?id=' + id);
        break;
      case 'player': // 音乐播放页
        util.navigateTo('/pages/player/player');
        break;
    };
  }
}

module.exports = {
  getdata: getdata,
  toPages: toPages,
  navigateTo: navigateTo,
  dealPlayCount: dealPlayCount,
  playList: playList,

  toggle: toggle,
  pause: pause,
  play: play,
  init: init,
}