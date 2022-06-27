import { ChangeEvent, useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./App.css";
import ImgBox from "./components/ImgBox";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [imgList, setImgList] = useState<string[]>([]);

  const onDrop = useCallback((files: any[]) => {
    if (!!files) {
      // !! 이 라이브러리는 여러개의 이미지를 한번에 받을 수 있기 때문에 for문 사용
      for (let file of files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = (e) => {
          setImgList((cur) => [...cur, e.target?.result as string]);
        };
      }
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // reac-dropzone으로 대체
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
        <div className="add-btn" {...getRootProps()}>
          <input type="file" ref={inputRef} {...getInputProps()} />+
        </div>
      </div>
    </div>
  );
}

export default App;
