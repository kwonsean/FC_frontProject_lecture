import { useRef } from 'react';

function SortableListItem({
  index,
  draggable,
  children,
  onDragStart,
  onDropItem,
  onClickItem
}) {
  const itemRef = useRef(null);

  const onDragStartItem = () => {
    itemRef.current.classList.add('dragstart');
    onDragStart(index);
  };

  const onDragEndItem = () => {
    itemRef.current.classList.remove('dragstart');
  };

  const onDragEnterItem = () => {
    itemRef.current.classList.add('dragover');
  };

  const onDragLeaveItem = () => {
    itemRef.current.classList.remove('dragover');
  };

  const onDragOverItem = e => {
    e.preventDefault();
  };

  const onDrop = () => {
    itemRef.current.classList.remove('dragover');
    onDropItem(index);
  };

  const onCLick = () => {
    onClickItem(index);
  };

  return /*#__PURE__*/React.createElement("li", {
    ref: itemRef,
    className: "item",
    draggable: draggable ? draggable : false,
    onDragStart: onDragStartItem,
    onDragEnd: onDragEndItem,
    onDragEnter: onDragEnterItem,
    onDragLeave: onDragLeaveItem,
    onDragOver: onDragOverItem,
    onDrop: onDrop,
    onClick: onCLick
  }, children);
}

export default SortableListItem;