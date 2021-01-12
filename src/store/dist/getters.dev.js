"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// import { formatTime, formatLyric } from "@/assets/js/filter.js";
// export const playUrl = state => state.playUrl;
// export const playState = state => state.playState;
var _default = {
  playState: function playState(state) {
    return state.playState;
  },
  playUrl: function playUrl(state) {
    return state.playUrl;
  },
  playIndex: function playIndex(state) {
    return state.playIndex;
  },
  playlist: function playlist(state) {
    return state.playlist;
  },
  playlistShow: function playlistShow(state) {
    return state.playlistShow;
  },
  playSequence: function playSequence(state) {
    return state.playSequence;
  },
  playMode: function playMode(state) {
    return state.playMode;
  },
  currentSong: function currentSong(state) {
    return state.currentSong;
  },
  currentTime: function currentTime(state) {
    return state.currentTime;
  },
  duration: function duration(state) {
    return state.duration;
  }
};
exports["default"] = _default;