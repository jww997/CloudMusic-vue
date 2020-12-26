import { formatTime } from "@/assets/js/filter.js";
export default {
    currentTime: function (state) {
        return formatTime(state.audio.example.currentTime);
    },
    duration: function (state) {
        console.log(state.audio.example.duration);
        return formatTime(state.audio.example.duration);
    },
    // src: function () {
    //     return status.audio.current.src && '';
    // }
}