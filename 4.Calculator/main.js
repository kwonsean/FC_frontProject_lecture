let left = null,
  right = null,
  oper = null,
  res = false,
  resValue = null;

const $calculator = document.getElementById("calculator");

function save() {
  const inp = document.querySelector("#top-inp");
  let value = "";

  if (left === null) return;
  value += left + " ";
  inp.value = value;

  if (oper === null) return;
  value += oper + " ";
  inp.value = value;

  if (right === null) return;
  value += right + " ";
  inp.value = value;

  if (res) {
    switch (oper) {
      case "+":
        resValue = parseInt(left) + parseInt(right);
        break;
      case "-":
        resValue = parseInt(left) - parseInt(right);
        break;
      case "*":
        resValue = parseInt(left) * parseInt(right);
        break;
      case "/":
        resValue = parseInt(left) / parseInt(right);
        break;
    }

    value += "= " + resValue;
    inp.value = value;
  }
}

$calculator.addEventListener("click", (e) => handleClickCalculator(e));

function handleClickCalculator(e) {
  if (e.target === undefined) return;

  if (e.target.dataset.num) inputNum(e.target.dataset.num);

  if (e.target.dataset.oper) inputOper(e.target.dataset.oper);

  if (e.target.dataset.equ) inputEqu();
}

function inputNum(num) {
  if (oper === null) {
    if (left === null) {
      left = `${num}`;
    } else {
      if (num === 0 && parseInt(left) === 0) return;
      left += `${num}`;
    }
  } else {
    if (right === null) {
      right = `${num}`;
    } else {
      if (num === 0 && parseInt(right) === 0) return;
      right += `${num}`;
    }
  }
  save();
}

function inputOper(op) {
  if (left === null && op === "-") {
    left = "-";
    save();
    return;
  }
  if (left === "-" && op === "-") {
    return;
  }
  if (op === "-" && oper !== null && right === null) {
    right = "-";
    save();
    return;
  }
  oper = op;
  save();
}

function inputEqu() {
  if (left === null || right === null || !oper) return;

  if (res) {
    left = resValue;
    right = null;
    resValue = null;
    oper = null;
    res = false;
  } else {
    res = true;
  }
  save();
}
