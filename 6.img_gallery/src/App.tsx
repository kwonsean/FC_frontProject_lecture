import { read } from "fs";
import { ChangeEvent, useRef, useState } from "react";
import "./App.css";
import ImgBox from "./components/ImgBox";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [imgList, setImgList] = useState<string[]>([]);

  const handleChangeFile = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    if (!!target.files) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = (e) => {
        setImgList((cur) => [...cur, e.target?.result as string]);
      };
    }
  };
  return (
    <div className="container">
      <div className="imgWrapper">
        {imgList.map((img, idx) => {
          return <ImgBox src={img} key={img + idx} />;
        })}
      </div>
      <div className="addWrapper">
        {imgList.length === 0 && (
          <div className="imgAddText">
            이미지가 없습니다. <br /> 이미지를 추가해주세요.
          </div>
        )}
        <input type="file" ref={inputRef} onChange={(e) => handleChangeFile(e)} />
        <div className="add-btn" onClick={() => inputRef.current?.click()}>
          +
        </div>
      </div>
    </div>
  );
}

export default App;
