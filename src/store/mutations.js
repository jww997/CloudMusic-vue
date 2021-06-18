import types from "./mutation-types.js";

export default {

  [types.SET_MUSIC](state, val) {
    state.music = val;
  },
  [types.SET_MV](state, val) {
    state.mv = val;
  },
  [types.SET_LOGIN](state, val) {
    state.login = val;
  },
  
  
  
  
  [types.SET_TRANSITION](state, val) {
    state.transition = val;
  },
  
  
  [types.SET_LOADING](state, val) {
    state.loading = val;
  },
}