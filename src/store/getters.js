export default {

    playState: state => { return state.playState },
    playUrl: state => { return state.playUrl },
    playIndex: state => { return state.playIndex },
    // playId: state => { return state.playId },
    playlist: state => { return state.playlist },
    playSequence: state => { return state.playSequence },
    playMode: state => { return state.playMode },
    playVolume: state => { return state.playVolume },
    playerShow: state => { return state.playerShow },


    playDrag: state => { return state.playDrag },
    playlistToast: state => { return state.playlistToast },


    currentSong: state => { return state.currentSong },
    currentTime: state => { return state.currentTime },
    duration: state => { return state.duration },





    music: state => { return state.music },
    mv: state => { return state.mv },
    login: state => { return state.login },

    transition: state => { return state.transition },
}