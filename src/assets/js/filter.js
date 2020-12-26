function formatCount(num) {

  if (typeof num == 'number') {
    if (!num) {
      num = 0;
    } else if (num > 10e8 * 3) {
      num = `${(num / 10e8).toFixed(0)}亿`;
    } else if (num >= 10e8) {
      num = `${(num / 10e8).toFixed(1)}亿`;
    } else if (num >= 10e5) {
      num = `${(num / 10e5).toFixed(0)}万`;
    };
  }
  return num;

}

function formatTime(num) {

  if (isNaN(num)) return '00:00';
  let date = new Date(num * 1000);
  return `${_addZero(date.getMinutes())}:${_addZero(date.getSeconds())}`;

}

// 带下划线用于内部调用
function _addZero(num) { // 个位数处理给时间补零 0 => 00

  if (isNaN(num)) return '00';
  num = num.toString(); // 转为字符串获取长度
  if (num.length == 1) num = `0${num}`;
  return num;
}

export {
  formatCount,
  formatTime,
}