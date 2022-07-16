import { useState, useCallback } from 'react';
import SortableListItem from './SortableListItem';
import './SortableList.css';

function SortableList({
  data,
  onDropItem,
  onClickItem,
  renderItem
}) {
  const [startIndex, setStartIndex] = useState(0);
  const [listData, setListData] = useState(data);

  const onDragStart = index => setStartIndex(index);

  const onDrop = useCallback(dropIdx => {
    const dragItem = listData[startIndex];
    const list = [...listData];
    list.splice(startIndex, 1);
    const newListData = startIndex < dropIdx ? [...list.slice(0, dropIdx - 1), dragItem, ...list.slice(dropIdx - 1, list.length)] : [...list.slice(0, dropIdx), dragItem, ...list.slice(dropIdx, list.length)];
    setListData(newListData);
    onDropItem(newListData);
  }, [startIndex, onDropItem, listData]);
  return /*#__PURE__*/React.createElement("ul", {
    className: "sortable-list"
  }, listData.map((item, index) => /*#__PURE__*/React.createElement(SortableListItem, {
    key: index,
    index: index,
    draggable: true,
    onDragStart: onDragStart,
    onDropItem: onDrop,
    onClickItem: onClickItem
  }, renderItem(item, index))), /*#__PURE__*/React.createElement(SortableListItem, {
    key: listData.length,
    index: listData.length,
    draggable: false,
    onDropItem: onDrop
  }));
}

export default SortableList;