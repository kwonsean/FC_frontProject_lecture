export default class ImgSlider {
  #sliderWrapper;

  #slider;

  #nextBtn;

  #prevBtn;

  #counter = 0;

  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#sliderWrapper = document.querySelector('#slider-wrap');
    this.#slider = this.#sliderWrapper.querySelector('#slider');
    this.#nextBtn = this.#sliderWrapper.querySelector('#next');
    this.#prevBtn = this.#sliderWrapper.querySelector('#previous');
  }

  #addEvent() {
    this.#nextBtn.addEventListener('click', () => {
      this.#counter += 1;
      if (this.#counter > 6) this.#counter = 0;
      this.#slider.style.left = `${this.#counter * -1000}px`;
    });

    this.#prevBtn.addEventListener('click', () => {
      this.#counter -= 1;
      if (this.#counter < 0) this.#counter = 6;
      this.#slider.style.left = `${this.#counter * -1000}px`;
    });
  }
}
