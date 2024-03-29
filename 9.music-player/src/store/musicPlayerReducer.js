import img1 from "../images/music-1.jpg";
import img2 from "../images/music-2.jpg";
import img3 from "../images/music-3.jpg";
import img4 from "../images/music-4.jpg";
import img5 from "../images/music-5.jpg";
import music1 from "../music/music-1.mp3";
import music2 from "../music/music-2.mp3";
import music3 from "../music/music-3.mp3";
import music4 from "../music/music-4.mp3";
import music5 from "../music/music-5.mp3";

const playList = [
  {
    name: "Relax And Sleep",
    artist: "Anton Vlasov",
    img: img1,
    src: music1,
    id: 1,
  },
  {
    name: "Don't You Think Lose",
    artist: "Anton Vlasov",
    img: img2,
    src: music2,
    id: 2,
  },
  {
    name: "The Cradle of Your Soul",
    artist: "lemonmusicstudio",
    img: img3,
    src: music3,
    id: 3,
  },
  {
    name: "Spirit Blossom",
    artist: "RomanBelov",
    img: img4,
    src: music4,
    id: 4,
  },
  {
    name: "Everything Feels New",
    artist: "EvgenyBardyuzha",
    img: img5,
    src: music5,
    id: 5,
  },
];

const initalState = {
  playList,
  currentMusicId: playList[0].id,
  currentIndex: 0,
  playing: false,
  repeat: "ALL", // (ALL, ONE, SHUFFLE)
};

const repeatMode = ["ONE", "ALL", "SHUFFLE"];
const PLAY_MUSIC = "musicPlayer/PLAY_MUSIC";
const STOP_MUSIC = "musicPlayer/STOP_MUSIC";
const NEXT_MUSIC = "musicPlayer/NEXT_MUSIC";
const PREV_MUSIC = "musicPlayer/PREV_MUSIC";
const SET_REPEAT = "musicPlayer/SET_REPEAT";
const SET_CURRENT_IDX = "musicPlayer/SET_CURRENT_IDX";
const UPDATE_PLAY_LIST = "musicPlayer/UPDATE_PLAY_LIST";

export const playMusic = () => ({ type: PLAY_MUSIC });
export const stopMusic = () => ({ type: STOP_MUSIC });
export const nextMusic = () => ({ type: NEXT_MUSIC });
export const prevMusic = () => ({ type: PREV_MUSIC });
export const setRepeat = () => ({ type: SET_REPEAT });
export const setCurrentIdx = (index) => ({ type: SET_CURRENT_IDX, index });
export const updatePlayList = (newPlayList) => ({
  type: UPDATE_PLAY_LIST,
  newPlayList,
});

const getRandomNum = (arr, excludeNum) => {
  const randomNum = Math.floor(Math.random() * arr.length);
  return arr[randomNum] === excludeNum
    ? getRandomNum(arr, excludeNum)
    : arr[randomNum];
};

export default function musicPlayerReducer(state = initalState, action) {
  switch (action.type) {
    case PLAY_MUSIC:
      console.log("PLAY MUSIC!");
      return {
        ...state,
        playing: true,
      };
    case STOP_MUSIC:
      return {
        ...state,
        playing: false,
      };
    // 밑에 IDX값 구하는 로직 새롭다. (난 if만 생각해봄..)
    case NEXT_MUSIC:
      const nextIdx =
        state.repeat === "SHUFFLE"
          ? getRandomNum(
              Array.from(Array(playList.length).keys()),
              state.currentIndex,
            )
          : (state.currentIndex + 1) % state.playList.length;
      return {
        ...state,
        currentIndex: nextIdx,
        currentMusicId: state.playList[nextIdx].id,
      };
    case PREV_MUSIC:
      const prevIdx =
        state.repeat === "SHUFFLE"
          ? getRandomNum(
              Array.from(Array(playList.length).keys()),
              state.currentIndex,
            )
          : (state.currentIndex - 1 + state.playList.length) %
            state.playList.length;
      return {
        ...state,
        currentIndex: prevIdx,
        currentMusicId: state.playList[prevIdx].id,
      };
    case SET_REPEAT:
      return {
        ...state,
        repeat:
          repeatMode[
            (repeatMode.indexOf(state.repeat) + 1) % repeatMode.length
          ],
      };
    case SET_CURRENT_IDX:
      return {
        ...state,
        currentIndex: action.index,
        currentMusicId: state.playList[action.index].id,
      };
    case UPDATE_PLAY_LIST:
      const { newPlayList } = action;
      return {
        ...state,
        playList: newPlayList,
        currentIndex: newPlayList.findIndex(
          (music) => music.id === state.currentMusicId,
        ),
      };
    default:
      return state;
  }
}
