import { shallowEqual, useSelector } from "react-redux";
import "./SongDetail.scss";

function SongDetail() {
  const { playing, playList, currentIndex } = useSelector(
    (state) => state,
    shallowEqual,
  );

  return (
    <>
      <div className="header">
        <span>{playing ? "Now Playing" : "Not Playing"}</span>
      </div>
      <div className="img-area">
        <img
          src={playList[currentIndex].img}
          alt={playList[currentIndex].name}
        />
      </div>
      <div className="music-info">
        <p className="song">{playList[currentIndex].name}</p>
        <p className="artist">{playList[currentIndex].artist}</p>
      </div>
    </>
  );
}

export default SongDetail;
