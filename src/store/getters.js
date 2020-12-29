// import { formatTime, formatLyric } from "@/assets/js/filter.js";
import LyricParser from "lyric-parser"; // 歌词解析
export default {
    // currentTime: function (state) {
    //     return formatTime(state.audio.example.currentTime);
    // },
    // duration: function (state) {
    //     console.log(state.audio.example.duration);
    //     return formatTime(state.audio.example.duration);
    // },



    // lyric: function (state, lyric) {
    //     console.log(state);
    //     console.log(lyric);
    //     if (!lyric) return;
    //     // if (!lyric) lyric = state.lyric;
    //     return new LyricParser(lyric, function ({ lineNum, txt }) {
    //         console.log(`lineNum = ${lineNum}, txt = ${txt}`);
    //         state.audio.lyric.curLine = lineNum; // 歌词实时下标
    //     })
    // },




    // audio: {
        audio: function (state) {
            console.log("getters 生成实例");
            console.log(state);


        }
    // }
}