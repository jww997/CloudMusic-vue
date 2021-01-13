"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatUnit = formatUnit;
exports.formatLyric = formatLyric;
exports.formatArtists = formatArtists;
exports.formatDate = formatDate;
exports.formatTime = formatTime;

/**
 * @Author: Gavin
 * @Begin: 2020-12-30 10:49:29
 * @Update: 2021-1-13 16:44:47
 * @Update log: 格式化操作
 */
function formatUnit(num) {
  if (typeof num == 'number') {
    if (!num) {
      num = 0;
    } else if (num > 10e8 * 3) {
      num = "".concat((num / 10e8).toFixed(0), "\u4EBF");
    } else if (num >= 10e8) {
      num = "".concat((num / 10e8).toFixed(1), "\u4EBF");
    } else if (num >= 10e5) {
      num = "".concat((num / 10e5).toFixed(0), "\u4E07");
    }

    ;
  }

  return num;
}

function formatLyric(str) {
  if (typeof str != 'string') return str;
  var arr = new Array();
  str.split("\n").forEach(function (item) {
    if (!item) return false;

    if (item.indexOf("]") == "-1") {
      arr.push({
        text: item
      });
    } else {
      var time = item.split("]").shift().substr(1, 8);

      if (item.split("]").pop()) {
        arr.push({
          text: item.split("]").pop(),
          sec: parseInt(time.split(":")[0] * 60 + time.split(":")[1] * 1)
        });
      }

      ;
    }
  });
  return arr;
}

function formatArtists() {
  var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var that = this;
  var r = "";
  list.forEach(function (item, index) {
    var separator = index == 0 ? '' : '/';
    r += separator + item.name;
  });
  return r;
}

function formatDate() {
  var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  if (isNaN(num)) return num;
  var date = new Date(num),
      r;
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate();

  switch (type) {
    // 连接器类型
    case 1:
      r = "".concat(y, "\u5E74").concat(m, "\u6708").concat(d, "\u65E5");
      break;

    case 2:
      r = "".concat(y, "-").concat(m, "-").concat(d);
      break;
  }

  return r;
}

function formatTime() {
  var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  if (isNaN(num)) return "00:00"; // if (isNaN(num)) return num;

  var time = new Date(num),
      r;

  var h = _addZero(time.getHours());

  var m = _addZero(time.getMinutes());

  var s = _addZero(time.getSeconds());

  switch (type) {
    // 连接器类型
    case 1:
      r = "".concat(h, ":").concat(m, ":").concat(s);
      break;

    case 2:
      r = "".concat(m, ":").concat(s);
      break;
  }

  return r;
} // 以下带下划线的，用于内部调用，不对外开放


function _addZero(num) {
  // 个位数处理给时间补零 0 => 00
  if (isNaN(num)) return '00';
  num = num.toString(); // 转为字符串获取长度

  if (num.length == 1) num = "0".concat(num);
  return num;
}