export default class ImgSlider {
  #sliderWrapper;

  #slider;

  #nextBtn;

  #prevBtn;

  #indicatorWrapper;

  #indicatorList;

  #slidNum = 0;

  #slidwidth = 0;

  #currentPosition = 0;

  constructor() {
    this.#assignElement();
    this.initSlidNumber();
    this.initSlidWidth();
    this.initSlidersWidth();
    this.initIndicator();
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

  initIndicator() {
    const ulEl = document.createElement('ul');
    for (let i = 0; i < this.#slidNum; i += 1) {
      const indicator = document.createElement('li');
      if (i === this.#currentPosition) indicator.classList.add('active');
      indicator.dataset.num = i;
      ulEl.appendChild(indicator);
    }
    this.#indicatorWrapper.appendChild(ulEl);
    this.#indicatorList = ulEl.childNodes;
  }

  #assignElement() {
    this.#sliderWrapper = document.querySelector('#slider-wrap');
    this.#slider = this.#sliderWrapper.querySelector('#slider');
    this.#nextBtn = this.#sliderWrapper.querySelector('#next');
    this.#prevBtn = this.#sliderWrapper.querySelector('#previous');
    this.#indicatorWrapper = document.querySelector('#indicator-wrap');
  }

  #addEvent() {
    this.#nextBtn.addEventListener('click', this.moveToRight);
    this.#prevBtn.addEventListener('click', this.moveToLeft);
    this.#indicatorWrapper.addEventListener('click', this.moveToIndicator);
  }

  moveToIndicator = event => {
    const { target } = event;
    if (target.nodeName !== 'LI') return;
    this.#indicatorList[this.#currentPosition].classList.remove('active');
    this.#currentPosition = Number(target.dataset.num);
    target.classList.add('active');
    this.#slider.style.left = `${this.#currentPosition * -1000}px`;
  };

  moveToRight = () => {
    this.#indicatorList[this.#currentPosition].classList.remove('active');
    this.#currentPosition += 1;
    if (this.#currentPosition === this.#slidNum) this.#currentPosition = 0;
    this.#slider.style.left = `${this.#currentPosition * -1000}px`;
    this.#indicatorList[this.#currentPosition].classList.add('active');
  };

  moveToLeft = () => {
    this.#indicatorList[this.#currentPosition].classList.remove('active');
    this.#currentPosition -= 1;
    if (this.#currentPosition < 0) this.#currentPosition = this.#slidNum - 1;
    this.#slider.style.left = `${this.#currentPosition * -1000}px`;
    this.#indicatorList[this.#currentPosition].classList.add('active');
  };
}
