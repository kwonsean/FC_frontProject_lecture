/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
// import DatePicker from './DatePicker';
// const datePicker = new DatePicker();

class DatePicker2 {
  monthData = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  calendarDate = {
    data: '',
    date: 0,
    month: 0,
    year: 0,
  };

  selectedDate = {
    data: '',
    date: 0,
    month: 0,
    year: 0,
  };

  datePickerEl;

  dateInputEl;

  calendarEl;

  monthEl;

  monthElContent;

  monthElNext;

  monthElPrev;

  dateEl;

  constructor() {
    this.initCalendarDate();
    this.initSelectedDate();
    this.assignElement();
    this.setDateInput();
    this.addEvent();
  }

  initCalendarDate() {
    const data = new Date();
    const date = data.getDate();
    const month = data.getMonth();
    const year = data.getFullYear();
    this.calendarDate = {
      data,
      date,
      month,
      year,
    };
  }

  initSelectedDate() {
    this.selectedDate = { ...this.calendarDate };
  }

  setDateInput() {
    this.dateInputEl.textContent = this.formateDate(this.selectedDate.data);
    this.dateInputEl.dataset.value = this.selectedDate.data;
  }

  assignElement() {
    this.datePickerEl = document.getElementById('date-picker');
    this.dateInputEl = this.datePickerEl.querySelector('#date-input');
    this.calendarEl = this.datePickerEl.querySelector('#calendar');
    this.monthEl = this.calendarEl.querySelector('#month');
    this.monthElContent = this.monthEl.querySelector('#content');
    this.monthElNext = this.monthEl.querySelector('#next');
    this.monthElPrev = this.monthEl.querySelector('#prev');
    this.dateEl = this.calendarEl.querySelector('#dates');
  }

  addEvent() {
    this.dateInputEl.addEventListener('click', this.toggleActive);
    this.monthEl.addEventListener('click', this.clickArrow);
    this.dateEl.addEventListener('click', this.onClickSelectedDate);
  }

  toggleActive = () => {
    // active가 꺼질때 선택된 날짜값이 세팅되도록
    if (!this.calendarEl.classList.contains('avtive')) {
      this.calendarDate = { ...this.selectedDate };
    }
    this.calendarEl.classList.toggle('active');
    this.updateMonth();
    this.updateDates();
  };

  updateMonth = () => {
    this.monthElContent.textContent = `${this.calendarDate.year} / ${
      this.monthData[this.calendarDate.month]
    }`;
  };

  updateDates = () => {
    this.dateEl.innerHTML = '';
    const numberOfDates = new Date(
      this.calendarDate.year,
      this.calendarDate.month + 1,
      0,
    ).getDate();

    const fragmentEl = new DocumentFragment();
    for (let i = 0; i < numberOfDates; i += 1) {
      const dateEl = document.createElement('div');
      dateEl.classList.add('date');
      dateEl.textContent = i + 1;
      dateEl.dataset.date = i + 1;
      fragmentEl.appendChild(dateEl);
    }

    fragmentEl.firstChild.style.gridColumnStart =
      new Date(this.calendarDate.year, this.calendarDate.month, 1).getDay() + 1;

    this.dateEl.appendChild(fragmentEl);
    this.colorSaturday();
    this.colorSunday();
    this.colorToday();
    this.markSelectedDate();
  };

  colorSaturday() {
    const saturdayEls = this.dateEl.querySelectorAll(
      `.date:nth-child(7n+${
        7 -
        new Date(this.calendarDate.year, this.calendarDate.month, 1).getDay()
      })`,
    );

    [...saturdayEls].map(item => (item.style.color = 'blue'));
  }

  colorSunday() {
    const sundayEls = this.dateEl.querySelectorAll(
      `.date:nth-child(7n+${
        8 -
        (new Date(this.calendarDate.year, this.calendarDate.month, 1).getDay() %
          7)
      })`,
    );

    [...sundayEls].map(item => (item.style.color = 'red'));
  }

  colorToday() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const today = currentDate.getDate();
    if (
      currentYear === this.calendarDate.year &&
      currentMonth === this.calendarDate.month
    ) {
      this.dateEl
        .querySelector(`[data-date='${today}']`)
        .classList.add('today');
    }
  }

  markSelectedDate = () => {
    if (
      this.selectedDate.year === this.calendarDate.year &&
      this.selectedDate.month === this.calendarDate.month
    ) {
      this.calendarEl
        .querySelector(`[data-date='${this.selectedDate.date}']`)
        .classList.add('selected');
    }
  };

  clickArrow = e => {
    if (e.target.id === 'prev') {
      this.calendarDate.month -= 1;
      if (this.calendarDate.month < 0) {
        this.calendarDate.month = 11;
        this.calendarDate.year -= 1;
      }
      this.updateMonth();
      this.updateDates();
    } else if (e.target.id === 'next') {
      this.calendarDate.month += 1;
      if (this.calendarDate.month > 11) {
        this.calendarDate.month = 0;
        this.calendarDate.year += 1;
      }
      this.updateMonth();
      this.updateDates();
    }
  };

  onClickSelectedDate = e => {
    const { target } = e;
    if (target.dataset.date) {
      this.dateEl.querySelector('.selected')?.classList.remove('selected');
      target.classList.add('selected');
      this.selectedDate = {
        data: new Date(
          this.calendarDate.year,
          this.calendarDate.month,
          target.dataset.date,
        ),
        year: this.calendarDate.year,
        month: this.calendarDate.month,
        date: target.dataset.date,
      };
      this.setDateInput();
      this.calendarEl.classList.remove('active');
    }
  };

  formateDate(dateInfo) {
    let date = dateInfo.getDate();
    if (date < 10) {
      date = String(date).padStart(2, '0');
    }
    let month = dateInfo.getMonth() + 1;
    if (month < 10) {
      month = String(month).padStart(2, '0');
    }
    const year = dateInfo.getFullYear();
    return `${year}/${month}/${date}`;
  }
}

const datePicker2 = new DatePicker2();
