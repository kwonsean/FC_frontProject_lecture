export class Keyboard {
  #swichEl;
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  #inputGroupEl;
  #inputEl;
  #keyPress = false;
  #mouseDown = false;

  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#containerEl = document.querySelector("#container");
    // 비용 절감 (document부터 찾지 않게됨)
    this.#swichEl = this.#containerEl.querySelector("#switch");
    this.#fontSelectEl = this.#containerEl.querySelector("#font");
    this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
    this.#inputGroupEl = this.#containerEl.querySelector("#input-group");
    this.#inputEl = this.#inputGroupEl.querySelector("#input");
  }

  #addEvent() {
    this.#swichEl.addEventListener("change", this.#onChangeTheme);
    this.#fontSelectEl.addEventListener("change", this.#onChangeFont);
    this.#inputEl.addEventListener("input", this.#onInput);
    document.addEventListener("keydown", this.#onKeyDown.bind(this)); // this(클래스)를 바인딩 해줌
    document.addEventListener("keyup", this.#onKeyUp); // 화살표 함수를 사용해도 해결 가능
    this.#keyboardEl.addEventListener("mousedown", this.#onMouseDown);
    document.addEventListener("mouseup", this.#onMouseUp);
  }

  #onChangeTheme(e) {
    document.documentElement.setAttribute(
      "theme",
      e.target.checked ? "dark-mode" : ""
    );
  }

  #onChangeFont(e) {
    document.body.style.fontFamily = e.target.value;
  }

  #onInput = (e) => {
    this.#inputEl.value = e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, "");
  };

  #onKeyDown(e) {
    if (this.#mouseDown) return;
    this.#keyPress = true;
    // console.log(e.key, /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(e.key));
    this.#inputGroupEl.classList.toggle("error", e.key === "Process");
    this.#keyboardEl
      .querySelector(`[data-code=${e.code}]`)
      ?.classList.add("active");
  }

  #onKeyUp = (e) => {
    if (this.#mouseDown) return;
    this.#keyboardEl
      .querySelector(`[data-code=${e.code}]`)
      ?.classList.remove("active");
    this.#keyPress = false;
  };

  #onMouseDown = (e) => {
    if (this.#keyPress) return;
    this.#mouseDown = true;
    console.log(e.target.closest("div.key")); // !! 자기 자신을 포함해서 넣어준 조건에 맞는 가장 가까운 요소를 찾음
    e.target.closest("div.key")?.classList.add("active");
  };

  #onMouseUp = (e) => {
    if (this.#keyPress) return;
    const keyEl = e.target.closest("div.key");
    const isActive = !!keyEl?.classList.contains("active");
    const val = keyEl?.dataset.val;

    if (isActive && !!val && val !== "Space" && val !== "Backspace") {
      this.#inputEl.value += val;
    }

    if (isActive && val === "Space") this.#inputEl.value += " ";
    else if (isActive && val === "Backspace")
      this.#inputEl.value = this.#inputEl.value.slice(0, -1);

    this.#keyboardEl.querySelector(".active")?.classList.remove("active");
    this.#mouseDown = false;
  };
}
