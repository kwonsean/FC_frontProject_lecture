import SortableList from './lib/SortableList';
import { data } from './TestItem/TestData';
import TestItem from './TestItem/TestItem';

function App() {
  const onDropItem = newList => console.log(newList);

  const clickItem = index => {
    alert(index);
  };

  return (
    <>
      <SortableList
        data={data}
        renderItem={(item, index) => <TestItem data={item} index={index} />}
        onDropItem={onDropItem}
        onClickItem={clickItem}
      />
    </>
  );
}

export default App;
