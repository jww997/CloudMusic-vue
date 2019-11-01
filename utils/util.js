import "api.js";

// 处理被播放总次数
function dealPlayCount(count) {
  if (count >= 200000000) {
    count = `${(count / 100000000).toFixed(0)}亿`;
  } else if (count >= 100000000) {
    count = `${(count / 100000000).toFixed(1)}亿`;
  } else if (count >= 100000) {
    count = `${(count / 10000).toFixed(0)}万`;
  };
  console.log(count);
  return count;
}

module.exports = {
  dealPlayCount: dealPlayCount,
}
