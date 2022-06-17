# 처음 보거나 중요 하거나

### snowpack

- `npm i -D snowpack`
- sass 사용을 위해 `npm i -D @snowpack/plugin-sass`
- 설정 `snowpack.config.js`에 작성
- [공식](https://www.snowpack.dev/)

### 월 날짜 구하기

- `new Date(년, 월, 0).getDate()`
- ex. 2022년 6월 마지막 일자구하기 : `new Date(2022, 6, 0).getDate()` => 30
- 이때 월 값은 getMonth로 나오는 인덱스가 아닌 + 1을 한 실제 사용하는 월이라고 생각하면 편함 (3월 마지막 날짜 구하려면 3을 넣어줌)

### 월 처음 요일 구하기

- `new Date(년, 월(인덱스), 1).getDay() + 1`
- ex. 2022년 6월 1일 요일구하기 : `new Date(2022, 5, 1).getDay() + 1`
- 이때 월은 인덱스 값으로 넣어줌 (즉, 3월을 구하려면 2를 넣어줌)
- 마지막에 + 1을 하는 이유는 요일값이 인덱스로 나오기 때문에 (0 => 월)
