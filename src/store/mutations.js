import types from "./mutation-types.js"
export default {

  [types.SET_PLAY_STATE](state, val) {
    state.playState = val;
  },
  [types.SET_PLAY_URL](state, val) {
    state.playUrl = val;
  },

  [types.SET_PLAY_INDEX](state, val) {
    state.playIndex = val;
  },
  [types.SET_PLAY_ID](state, val) {
    state.playId = val;
  },

  [types.SET_PLAY_LIST](state, val) {
    state.playlist = val;
  },
  [types.SET_PLAY_SEQUENCE](state, val) {
    state.playSequence = val;
  },
  [types.SET_PLAYER_SHOW](state, val) {
    state.playerShow = val;
  },




  [types.SET_PLAY_DRAG](state, val) {
    state.playDrag = val;
  },
  [types.SET_PLAY_LIST_TOAST](state, val) {
    state.playlistToast = val;
  },
  [types.SET_PLAY_VOLUME](state, val) {
    state.playVolume = val;
  },






  [types.SET_CURRENTSONG](state, val) {
    state.currentSong = val;
  },
  [types.SET_CURRENTTIME](state, val) {
    state.currentTime = val;
  },
  [types.SET_DURATION](state, val) {
    state.duration = val;
  },

  [types.SET_MV_ID](state, val) {
    state.mvId = val;
  },
  [types.SET_MV_SHOW](state, val) {
    state.mvShow = val;
  },

}