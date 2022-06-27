# 처음 보거나 중요 하거나

## react-dropzone

- `yarn add react-dropzone`
- 타입스크립트 : `yarn add @types/react-dropzone`
- [공식 문서](https://react-dropzone.js.org/)

- getRootProps는 input 요소를 감싸고 있는 root 요소에 props로 넣어준다. 이때 실행시켜주는 형식으로 props를 넣어주어야 한다. `{...getRootPorps()}`
- getInputProps는 파일을 받는 역할을 하는 input 요소에 props로 넣어주며 마찬가지로 실행시켜주는 형식으로 넣어줘야 한다.
- isDragActive를 통해 드래그 기능을 지원하는지 안하는지에 대한 값을 불린값으로 받을 수 있다.
- props들을 선언하게 되면 기존 props는 무시되거나 정상적으로 작동이 되지 않는다. 만약 따로 props를 넣어주고 싶다면

  ```
  {...getRootProps({
      onClick: event => console.log(event),
      role: 'button',
      'aria-label': 'drag and drop area'
    })}
  ```

  형태로 안에다 선언해서 사용한다.
