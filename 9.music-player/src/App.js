import { useCallback, useRef, useState } from "react";
import "./App.scss";
import Controls from "./components/Controls/Controls";
import PlayList from "./components/PlayList/PlayList";
import ProgressArea from "./components/ProgrssArea/ProgressArea";
import SongDetail from "./components/SongDetail/SongDetail";

function App() {
  const audioRef = useRef(null);
  const [showPlayList, setShowPlayList] = useState(false);

  const onPlay = useCallback(() => {
    audioRef.current.play();
  }, []);

  const onPause = useCallback(() => {
    audioRef.current.pause();
  }, []);

  const changeVolume = useCallback((volume) => {
    audioRef.current.changeVolume(volume);
  }, []);

  const resetDuration = useCallback(() => {
    audioRef.current.resetDuration();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <SongDetail />
        <ProgressArea ref={audioRef} />
        <Controls
          play={onPlay}
          pause={onPause}
          changeVolume={changeVolume}
          resetDuration={resetDuration}
          showPlayList={() => setShowPlayList(true)}
        />
        <PlayList
          showPlayList={showPlayList}
          closePlayList={() => setShowPlayList(false)}
        />
      </div>
    </div>
  );
}

export default App;
