const formEl = document.getElementById("bmi-form");
const resultEl = formEl.querySelector("#result");
const meterEl = resultEl.querySelector("#meter");
const bmiEl = resultEl.querySelector("#bmi");
const stateEl = resultEl.querySelector("#state");

formEl.addEventListener("submit", handleSubmit);
formEl.addEventListener("reset", handleRest);

// TODO JS 단에서 입력값을 확인할 필요가 있다. (HTML 타입을 임의로 수정해서 예상치 못한 값이 들어올 수 있기 때문에)
function handleSubmit(event) {
  event.preventDefault();
  const weight = Number(event.target[0].value);
  const height = Number(event.target[1].value);

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    alert("숫자를 입력하세요");
    return;
  }
  const mHeight = Number(height) * 0.01;
  const bmi = (weight / (mHeight * mHeight)).toFixed(2);

  let state = "정상";
  if (bmi < 18.5) state = "저체중";
  if (bmi >= 25) state = "과체중";

  bmiEl.textContent = bmi;
  stateEl.style.color = state === "정상" ? "none" : "red";
  stateEl.textContent = state;
  meterEl.value = bmi;

  resultEl.style.display = "flex";
}

function handleRest(event) {
  resultEl.style.display = "none";
}
