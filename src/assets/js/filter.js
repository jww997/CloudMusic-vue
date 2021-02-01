/**
 * @Author: Gavin
 * @Begin: 2020-12-30 10:49:29
 * @Update: 2021-1-13 16:44:47
 * @Update log: 格式化操作
 */
export {
  formatUnit,    // 处理单位
  formatLyric,   // 处理歌词
  formatArtists, // 处理艺术家
  formatDate,    // 处理日期
  formatTime,    // 处理时间
}

function formatUnit(num) {

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

function formatLyric(str) {

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

function formatArtists(list = []) {
  const that = this;
  let r = "";
  list.forEach((item, index) => {
    let separator = index == 0 ? '' : '/';
    let name = !item.name ? item : item.name;
    r += (separator + name);
  });
  return r;
}

function formatDate(num = new Date(), type = 1) {

  if (isNaN(num)) return num;
  let date = new Date(num), r;
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  switch (type) { // 连接器类型
    case 1:
      r = `${y}年${m}月${d}日`;
      break;
    case 2:
      r = `${y}-${m}-${d}`;
      break;
    case 3:
      r = { y, m, d };
      break;
    case 4:
      r = { y: _addZero(y), m: _addZero(m), d: _addZero(d) };
      break;
  }
  return r;
}

function formatTime(num = new Date(), type = 1) {

  if (isNaN(num)) return "00:00";
  // if (isNaN(num)) return num;
  let time = new Date(num), r;
  let h = _addZero(time.getHours());
  let m = _addZero(time.getMinutes());
  let s = _addZero(time.getSeconds());
  switch (type) { // 连接器类型
    case 1:
      r = `${h}:${m}:${s}`;
      break;
    case 2:
      r = `${m}:${s}`;
      break;
  }
  return r;

}

// 以下带下划线的，用于内部调用，不对外开放
function _addZero(num) { // 个位数处理给时间补零 0 => 00

  if (isNaN(num)) return '00';
  num = num.toString(); // 转为字符串获取长度
  if (num.length == 1) num = `0${num}`;
  return num;

}

