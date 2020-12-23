"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatCount = formatCount;

function formatCount(num) {
  if (!num) {
    num = "0";
  } else if (num > 10e8 * 3) {
    num = "".concat((num / 10e8).toFixed(0), "\u4EBF");
  } else if (num >= 10e8) {
    num = "".concat((num / 10e8).toFixed(1), "\u4EBF");
  } else if (num >= 10e5) {
    num = "".concat((num / 10e5).toFixed(0), "\u4E07");
  }

  ;
  return num;
}