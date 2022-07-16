# @ksh96/sortable-list

한번 공부해 보고 있어요.

## publish

- gitignore 설정에서 무시되지 않은 파일들이 배포가 된다.
- 현재는 dist폴더만 배포가 되도록 수정하였고 dist 폴더는 `npm run publish`를 실행하면 생성된다.
- 코드를 수정하고 다시 배포하는 경우에는 package.json 파일에서 버전을 수정한 뒤 터미널에 `npm publish` 를 입력한다. (첫번째로 하는 경우는 `npm publish --access public` 으로 해줘야 하고 package.json에서도 private 옵션을 삭제해야 한다. private은 유료...)
