// TODO JS 단에서 입력값을 확인할 필요가 있다. (HTML 타입을 임의로 수정해서 예상치 못한 값이 들어올 수 있기 때문에)
function handleSubmit(event) {
  event.preventDefault();
  const weight = Number(event.target[0].value);
  const height = Number(event.target[1].value);

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    alert("숫자를 입력하세요");
    return;
  }
}
