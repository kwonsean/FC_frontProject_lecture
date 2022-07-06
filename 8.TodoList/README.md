# 처음 보거나 중요 하거나

### rollup

- `npm i -D rollup`
- `npm i -D rollup-plugin-scss sass` sass를 사용하기 위한 플러그인
- `npm i -D rollup-plugin-generate-html-template` index.html을 연결하기 위한 플러그인
- `npm i -D rollup-plugin-serve rollup-plugin-livereload` dev 서버를 돌리고 watch 옵션을 사용하기 위한 플러그인
- `rollup-plugin-terser` 코드를 난독화 하는 플러그인

### transitionend

- 이벤트 리스너 중 하나로 트랜지션이 끝날때 작성한 콜백 함수가 실행된다.
- TODO 요소가 삭제될때 기존 코드는 트랜지션 시간이 1초인 것을 알고 있어서 `setTimeOut`을 이용하여 요소를 DOM에서 지워주었다.  
  이때 심지어 요소를 지울때 `remove()`를 사용하는 것이 아닌 TODO LIST 요소의 delete 클래스를 가지는 요소를 파악하여 `removeChild()`하는 방식으로 구현함. (remove를 몰랐음)
- `transitionend`를 이용하면 보다 정확하고 (no hard coding) 간편하게 사용 가능
- [MDN 공식문서](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/transitionend_event)
