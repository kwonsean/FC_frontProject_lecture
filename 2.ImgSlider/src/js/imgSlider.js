export default class ImgSlider {
  #sliderWrapper;

  #slider;

  #nextBtn;

  #prevBtn;

  #slidNum = 0;

  #slidwidth = 0;

  #currentPosition = 0;

  constructor() {
    this.#assignElement();
    this.initSlidNumber();
    this.initSlidWidth();
    this.initSlidersWidth();
    this.#addEvent();
  }

  // html을 보고 동적으로 이미지의 갯수, 너비값 초기화하여 사용
  initSlidNumber() {
    this.#slidNum = this.#slider.querySelectorAll('li').length;
  }

  initSlidWidth() {
    this.#slidwidth = this.#sliderWrapper.clientWidth;
  }

  initSlidersWidth() {
    this.#slider.style.width = `${this.#slidNum * this.#slidwidth}px`;
  }

  #assignElement() {
    this.#sliderWrapper = document.querySelector('#slider-wrap');
    this.#slider = this.#sliderWrapper.querySelector('#slider');
    this.#nextBtn = this.#sliderWrapper.querySelector('#next');
    this.#prevBtn = this.#sliderWrapper.querySelector('#previous');
  }

  #addEvent() {
    this.#nextBtn.addEventListener('click', this.moveToRight);

    this.#prevBtn.addEventListener('click', this.moveToLeft);
  }

  moveToRight = () => {
    this.#currentPosition += 1;
    if (this.#currentPosition === this.#slidNum) this.#currentPosition = 0;
    this.#slider.style.left = `${this.#currentPosition * -1000}px`;
  };

  moveToLeft = () => {
    this.#currentPosition -= 1;
    if (this.#currentPosition < 0) this.#currentPosition = this.#slidNum - 1;
    this.#slider.style.left = `${this.#currentPosition * -1000}px`;
  };
}
