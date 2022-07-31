import React from "react";
import { useDispatch, useSelector } from "react-redux";
import QueueMusic from "@mui/icons-material/QueueMusic";
import Close from "@mui/icons-material/Close";
import classNames from "classnames";
import "./PlayList.scss";
import PlayListItem from "./PlayListItem";
import SortableList from "@ksh96/sortable-list";
import { setCurrentIdx, updatePlayList } from "../../store/musicPlayerReducer";
import MusicList from "../../store/data";

const PlayList = ({ showPlayList, closePlayList }) => {
  const { playList } = useSelector((state) => state);
  const dispatch = useDispatch();

  const renderItem = (item, index) => {
    <PlayListItem item={item} index={index} />;
  };

  const onDropItem = (newPlayList) => {
    dispatch(updatePlayList(newPlayList));
  };

  const onClickItem = (index) => {
    dispatch(setCurrentIdx(index));
  };

  return (
    <div className={classNames("play-list", { show: showPlayList })}>
      <div className="header">
        <div className="row">
          <QueueMusic className="list" />
          <span>Play list</span>
        </div>
        <Close
          sx={{ fontSize: 22, cursor: "pointer" }}
          onClick={() => closePlayList()}
        />
      </div>
      <ul>
        {MusicList.map((item, index) => (
          <li key={index} onClick={() => onClickItem(index)}>
            <PlayListItem item={item} index={index} />
          </li>
        ))}
      </ul>
      {/* <SortableList
        data={playList}
        onDropItem={onDropItem}
        renderItem={renderItem}
        onClickItem={onClickItem}
      /> */}
    </div>
  );
};

export default PlayList;
