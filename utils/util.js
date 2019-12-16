import "api.js";

var baseUrl = require("./api.js");
var app = getApp();


// 调用API接口，获取数据
function getdata(parameter, fn, fn2) {
  wx.request({
    url: baseUrl + parameter,
    header: {
      'Content-Type': 'application/json'
    },
    success: function(res) {
      // console.log(res);
      if (res.statusCode === 200) {
        fn(res);
      } else {
        fn2 ? fn2(res) : '';
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

// 监听后台音乐状态
function listenbackgroundState(that) {
  // console.log(that);
  wx.onBackgroundAudioPlay(that => {
    that.setData({
      isPlayState: true,
      isShowPlayBar: true
    });
  });
  wx.onBackgroundAudioPause(that => {
    that.setData({
      isPlayState: false,
      isShowPlayBar: false
    });
  });
  wx.onBackgroundAudioStop(that => {
    that.setData({
      isPlayState: false,
      isShowPlayBar: false
    });
  });
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
  wx.onBackgroundAudioPlay(function() {
    app.globalData.isPlayState = true;
  });
  wx.onBackgroundAudioPause(function() {
    app.globalData.isPlayState = false;
  });
  wx.onBackgroundAudioStop(function() {
    app.globalData.isPlayState = false;
  });
}

function play(playUrl, playImgUrl, playTitle, playAuthor, playId) {
  getdata("check/music?id=" + playId, res => {
    // console.log(res);
    // console.log('res.data.success=' + res.data.success);

    if (res.data.success) {
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
    };

  }, res => {
    wx.showToast({
      title: '暂无版权',
      icon: 'none',
    });
  });
}

function pause() {
  wx.pauseBackgroundAudio();
  app.globalData.isPlayState = false;
}

// 格式化时间
function formatTime(time) {
  time = new Date(time);
  return `${formatNumber(time.getMinutes())}:${formatNumber(time.getSeconds())}`;
}
function formatNumber(number) {
  // 方法一：数值处理
  return number / 10 < 1 ? "0" + number : number;
  // 方法二：字符串处理
  // number = number.toString();
  // return number[1] ? number : '0' + number;
}

// 跳转公共方法
function toPages(event) {
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
      util.getdata("check/music?id=" + id, res => {
        // console.log('查询版权');
        // console.log(res.data.success);

        util.navigateTo('/pages/player/player?id=' + id);

      }, res => {
        // console.log(res);
        wx.showToast({
          title: '亲,暂无版权',
          image: '/images/cm2_discover_icn_3@2x.png',
          duration: 1000,
          mask: true //是否有透明蒙层，默认为false 
          //如果有透明蒙层，弹窗的期间不能点击文档内容 
        });
      });
      break;
    case 'search': // 搜索页
      util.navigateTo('/pages/search/search');
      break;
  };
}

module.exports = {
  getdata: getdata,
  toPages: toPages,
  navigateTo: navigateTo,
  dealPlayCount: dealPlayCount,
  listenbackgroundState: listenbackgroundState,
  playList: playList,

  formatTime: formatTime, // 格式化时间

  toggle: toggle,
  pause: pause,
  play: play,
  init: init,
}