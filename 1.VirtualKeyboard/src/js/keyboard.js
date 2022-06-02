export class Keyboard {
  #swichEl;
  #fontSelectEl;
  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#swichEl = document.querySelector("#switch");
    this.#fontSelectEl = document.querySelector("#font");
  }

  #addEvent() {
    this.#swichEl.addEventListener("change", (e) => {
      document.documentElement.setAttribute(
        "theme",
        e.target.checked ? "dark-mode" : ""
      );
    });

    this.#fontSelectEl.addEventListener("change", (e) => {
      document.body.style.fontFamily = e.target.value;
    });
  }
}
