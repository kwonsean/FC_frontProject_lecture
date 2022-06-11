export default class ImgSlider {
  #sliderWrapper;

  #slider;

  #nextBtn;

  #prevBtn;

  #indicatorWrapper;

  #indicatorList;

  #controlWrapper;

  #autoPlayIntervalID;

  #isPlay = true;

  #isEnter = false;

  #slidNum = 0;

  #slidwidth = 0;

  #currentPosition = 0;

  constructor() {
    this.#assignElement();
    this.initSlidNumber();
    this.initSlidWidth();
    this.initSlidersWidth();
    this.initIndicator();
    this.initAutoPlay();
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

  initAutoPlay() {
    this.#autoPlayIntervalID = setInterval(() => {
      this.moveToRight();
      this.updateIndicator();
    }, 3000);
  }

  #assignElement() {
    this.#sliderWrapper = document.querySelector('#slider-wrap');
    this.#slider = this.#sliderWrapper.querySelector('#slider');
    this.#nextBtn = this.#sliderWrapper.querySelector('#next');
    this.#prevBtn = this.#sliderWrapper.querySelector('#previous');
    this.#indicatorWrapper =
      this.#sliderWrapper.querySelector('#indicator-wrap');
    this.#controlWrapper = this.#sliderWrapper.querySelector('#control-wrap');
  }

  #addEvent() {
    this.#sliderWrapper.addEventListener('mouseenter', this.wrapperMouseEnter);
    this.#sliderWrapper.addEventListener('mouseleave', this.wrapperMouseLeave);
    this.#nextBtn.addEventListener('click', this.moveToRight);
    this.#prevBtn.addEventListener('click', this.moveToLeft);
    this.#indicatorWrapper.addEventListener('click', this.moveToIndicator);
    this.#controlWrapper.addEventListener('click', this.clickAutoPlayBtn);
  }

  wrapperMouseEnter = () => {
    this.#isEnter = true;
    this.stopAutoPlay();
    this.clickAutoPlayBtn();
  };

  wrapperMouseLeave = () => {
    this.#isEnter = false;
    this.startAutoPlay();
    this.clickAutoPlayBtn();
  };

  clickAutoPlayBtn = () => {
    this.#isPlay = [...this.#controlWrapper.classList].includes('play');
    this.#controlWrapper.className = this.#isEnter
      ? 'control-wrap pause'
      : 'control-wrap play';
    if (this.#isEnter) return;

    this.#controlWrapper.className = this.#isPlay
      ? 'control-wrap pause'
      : 'control-wrap play';
    this.#isPlay = !this.#isPlay;
    if (!this.#isPlay) this.stopAutoPlay();
    else this.startAutoPlay();
  };

  moveToIndicator = event => {
    const { target } = event;
    if (target.nodeName !== 'LI') return;
    this.#currentPosition = Number(target.dataset.num);
    this.#slider.style.left = `${this.#currentPosition * -this.#slidwidth}px`;
    this.updateIndicator();
  };

  moveToRight = () => {
    this.#currentPosition += 1;
    if (this.#currentPosition === this.#slidNum) this.#currentPosition = 0;
    this.#slider.style.left = `${this.#currentPosition * -this.#slidwidth}px`;
    this.updateIndicator();
  };

  moveToLeft = () => {
    this.#currentPosition -= 1;
    if (this.#currentPosition < 0) this.#currentPosition = this.#slidNum - 1;
    this.#slider.style.left = `${this.#currentPosition * -this.#slidwidth}px`;
    this.updateIndicator();
  };

  updateIndicator = () => {
    this.#indicatorWrapper
      .querySelector('ul > li.active')
      .classList.remove('active');
    this.#indicatorList[this.#currentPosition].classList.add('active');
  };

  stopAutoPlay = () => {
    clearInterval(this.#autoPlayIntervalID);
  };

  startAutoPlay = () => {
    if ([...this.#controlWrapper.classList].includes('pause')) return;
    clearInterval(this.#autoPlayIntervalID);
    this.#autoPlayIntervalID = setInterval(() => {
      this.#currentPosition += 1;
      if (this.#currentPosition === this.#slidNum) this.#currentPosition = 0;
      this.#slider.style.left = `${this.#currentPosition * -this.#slidwidth}px`;
      this.updateIndicator();
    }, 3000);
  };
}
