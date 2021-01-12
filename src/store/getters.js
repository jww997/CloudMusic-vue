// import { formatTime, formatLyric } from "@/assets/js/filter.js";

// export const playUrl = state => state.playUrl;
// export const playState = state => state.playState;

export default {

    playState: state => { return state.playState },
    playUrl: state => { return state.playUrl },
    playIndex: state => { return state.playIndex },
    playlist: state => { return state.playlist },
    playlistShow: state => { return state.playlistShow },
    playSequence: state => { return state.playSequence },
    playMode: state => { return state.playMode },

    currentSong: state => { return state.currentSong },
    currentTime: state => { return state.currentTime },
    duration: state => { return state.duration },

}