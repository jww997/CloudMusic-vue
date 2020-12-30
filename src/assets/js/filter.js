/**
 * @Author: Gavin
 * @Begin: 2020-12-30 10:49:29
 * @Update: 2020-12-30 10:49:29
 * @Update log: 格式化操作
 */
export {
  // formatCount, 
  formatUnit,
  formatLyric,
  formatTime,
}

function formatUnit(num) { // 处理单位

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

function formatLyric(str) { // 处理歌词

  if (typeof str != 'string') return str;
  let arr = new Array();
  str.split("\n").forEach(item => {

    if (!item) return false;
    if (item.indexOf("]") == "-1") {
      arr.push({
        text: item,
      });
    } else {
      let time = item.split("]").shift().substr(1, 8);
      if (item.split("]").pop()) {
        arr.push({
          text: item.split("]").pop(),
          sec: parseInt(
            time.split(":")[0] * 60 + time.split(":")[1] * 1
          ),
        });
      };
    }

  });
  return arr;
}

function formatTime(num) { // 处理时间

  if (isNaN(num)) return '00:00';
  let date = new Date(num * 1000);
  return `${_addZero(date.getMinutes())}:${_addZero(date.getSeconds())}`;

}

// 以下带下划线的，用于内部调用，不对外开放
function _addZero(num) { // 个位数处理给时间补零 0 => 00

  if (isNaN(num)) return '00';
  num = num.toString(); // 转为字符串获取长度
  if (num.length == 1) num = `0${num}`;
  return num;
}

