import {
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import "./ProgressArea.scss";
import {
  nextMusic,
  playMusic,
  stopMusic,
} from "../../store/musicPlayerReducer";

function ProgressArea(props, ref) {
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");
  const audio = useRef(null);
  const progressBarRef = useRef(null);
  const dispatch = useDispatch();
  const { playList, currentIndex, repeat } = useSelector(
    (state) => state,
    shallowEqual,
  );

  useImperativeHandle(ref, () => ({
    play: () => {
      audio.current.play();
    },
    pause: () => {
      audio.current.pause();
    },
    changeVolume: (volume) => {
      audio.current.volume = volume;
    },
    resetDuration: () => {
      audio.current.currentTime = 0;
    },
  }));

  const changeTimeFormat = (second) => {
    const min = String(parseInt(second / 60)).padStart(2, "0");
    const sec = String(parseInt(second % 60)).padStart(2, "0");

    return `${min}:${sec}`;
  };

  // TODO 파악 필요
  const onClickProgress = (event) => {
    const progressBarWidth = event.currentTarget.clientWidth;
    const offsetX = event.nativeEvent.offsetX;
    const totalTime = audio.current.duration;
    // 현재 시간이 조절되니 onTimeUpdate가 실행됨
    audio.current.currentTime = (offsetX / progressBarWidth) * totalTime;
  };

  const onPlay = () => {
    dispatch(playMusic());
  };

  const onPause = () => {
    dispatch(stopMusic());
  };

  const onTimeUpdate = (event) => {
    // 재생 준비가 되지 않은 경우 리턴
    if (event.target.readyState === 0) return;

    const { currentTime: CT, duration: DT } = event.target;
    const progressBarWidth = (CT / DT) * 100;
    progressBarRef.current.style.width = `${progressBarWidth}%`;

    setCurrentTime(changeTimeFormat(CT));
    setDuration(changeTimeFormat(DT));
  };

  // useSelect, state등의 값을 사용할 경우 최신의 값을 보장하기 위해 useCallback을 사용한다.
  // dispatch는 안넣어도 상관 없지만 (어차피 변하지 않는다) 경고가 떠서 그냥 넣어준다(공식 홈페이지에서도 그냥 넣어도 상관없다고 함)
  const onEnded = useCallback(() => {
    if (repeat === "ONE") {
      audio.current.currentTime = 0;
      audio.current.play();
    } else dispatch(nextMusic());
  }, [dispatch, repeat]);

  return (
    <div className="progress-area" onMouseDown={onClickProgress}>
      <div className="progress-bar" ref={progressBarRef}>
        <audio
          autoPlay
          ref={audio}
          src={playList[currentIndex].src}
          onPlay={onPlay}
          onPause={onPause}
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
        ></audio>
      </div>
      <div className="music-timer">
        <span>{currentTime}</span>
        <span>{duration}</span>
      </div>
    </div>
  );
}

export default forwardRef(ProgressArea);
