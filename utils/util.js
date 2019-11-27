import "api.js";

// 跳转歌单详情页
function openSongDetailPage(event) {
  var id = event.currentTarget.dataset.id;
  wx.navigateTo({
    url: '../songlist-detail/songlist-detail?id=' + id,
  });
};

// 处理被播放总次数
function dealPlayCount(count) {
  if (count >= 200000000) {
    count = `${(count / 100000000).toFixed(0)}亿`;
  } else if (count >= 100000000) {
    count = `${(count / 100000000).toFixed(1)}亿`;
  } else if (count >= 100000) {
    count = `${(count / 10000).toFixed(0)}万`;
  };
  // console.log(count);
  return count;
}

module.exports = {
  openSongDetailPage: openSongDetailPage,
  dealPlayCount: dealPlayCount,
  
}
