import React from "react";

function ImgBox({ src }: { src: string }) {
  return (
    <div className="img-box">
      <img src={src} alt="img" />
    </div>
  );
}

export default ImgBox;
