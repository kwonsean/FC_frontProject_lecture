import { useDispatch, useSelector } from "react-redux";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPrevious from "@mui/icons-material/SkipPrevious";
import PlayArrow from "@mui/icons-material/PlayArrow";
import SkipNext from "@mui/icons-material/SkipNext";
import QueueMusic from "@mui/icons-material/QueueMusic";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import "./Controls.scss";
import {
  nextMusic,
  prevMusic,
  setRepeat,
} from "../../store/musicPlayerReducer";

const RepeatButton = ({ repeat, ...props }) => {
  switch (repeat) {
    case "ONE":
      return (
        <RepeatOneIcon sx={{ fontSize: 30, cursor: "pointer" }} {...props} />
      );
    case "ALL":
      return <RepeatIcon sx={{ fontSize: 30, cursor: "pointer" }} {...props} />;
    case "SHUFFLE":
      return (
        <ShuffleIcon sx={{ fontSize: 30, cursor: "pointer" }} {...props} />
      );
    default:
      return null;
  }
};

const Controls = ({
  showMusicList,
  setShowMusicList,
  resetDuration,
  play,
  pause,
  changeVolume,
}) => {
  const playing = useSelector((state) => state.playing);
  const repeat = useSelector((state) => state.repeat);
  const dispatch = useDispatch();

  const onClickPlay = () => {
    play();
  };

  const onClickPause = () => {
    pause();
  };

  const onChangeVolume = (event) => {
    changeVolume(event.target.value);
  };

  const onClickPrev = () => {
    dispatch(prevMusic());
  };

  const onClickNext = () => {
    dispatch(nextMusic());
  };

  const onClickRepeatBtn = () => {
    dispatch(setRepeat());
  };

  return (
    <div className="control-area">
      <QueueMusic sx={{ fontSize: 30, cursor: "pointer" }} />
      <RepeatButton repeat={repeat} onClick={onClickRepeatBtn} />

      <SkipPrevious
        sx={{ fontSize: 30, cursor: "pointer" }}
        onClick={onClickPrev}
      />
      {playing ? (
        <PauseIcon
          sx={{ fontSize: 30, cursor: "pointer" }}
          onClick={onClickPause}
        />
      ) : (
        <PlayArrow
          className="play"
          sx={{ fontSize: 30, cursor: "pointer" }}
          onClick={onClickPlay}
        />
      )}
      <SkipNext
        sx={{ fontSize: 30, cursor: "pointer" }}
        onClick={onClickNext}
      />
      <div className="volume-container">
        <VolumeUpIcon sx={{ fontSize: 20 }} />
        <input
          type="range"
          style={{ cursor: "pointer" }}
          defaultValue={1}
          min="0"
          max="1"
          step="0.1"
          onChange={onChangeVolume}
        />
      </div>
    </div>
  );
};

export default Controls;
