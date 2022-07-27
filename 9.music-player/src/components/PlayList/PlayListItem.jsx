import React from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

function PlayListItem({ item, index }) {
  const { currentIndex } = useSelector((state) => state);
  return (
    <>
      <div className={classNames("row", { playing: currentIndex === index })}>
        <span>{item.name}</span>
        <p>{item.artist}</p>
      </div>
      <span
        className={
          (classNames("music-duration"), { playing: currentIndex === index })
        }
      >
        00:00
      </span>
    </>
  );
}

export default PlayListItem;
