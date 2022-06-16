export default class DatePicker {
  datePicker;

  dateInputEl;

  today;

  year;

  month;

  monthNum;

  date;

  datesEl;

  monthEl;

  endDate;

  firstDay;

  calendar;

  constructor() {
    this.assignElement();
    this.initDay();
    this.initDate();
    this.addEvent();
  }

  initDay() {
    this.today = new Date();
    this.year = this.today.getFullYear();
    this.monthNum = this.today.getMonth() + 1;
    this.date = this.today.getDate();
    this.month = this.getMonthString(this.monthNum);
    this.dateInputEl.textContent = `${this.year}/${this.monthNum}/${this.date}`;
    this.monthEl.querySelector('#content').textContent = this.month;
  }

  initDate() {
    this.firstDay = new Date(this.year, this.monthNum - 1, 1).getDay();
    this.endDate = new Date(this.year, this.monthNum, 0).getDate();
    this.drawDate();
  }

  drawDate() {
    this.datesEl.innerHTML = '';
    const fragmentEl = document.createDocumentFragment();
    for (let i = 1; i <= this.endDate; i += 1) {
      const date = document.createElement('div');
      date.className = 'date';
      date.textContent = i;
      if (i === 1) date.style.gridColumnStart = this.firstDay + 1;
      if (7 - this.firstDay === i % 7) date.style.color = 'blue';
      else if (8 - this.firstDay === i % 7) date.style.color = 'red';
      if (
        i === this.date &&
        this.year === this.today.getFullYear() &&
        this.monthNum === this.today.getMonth() + 1
      )
        date.classList.add('today');
      fragmentEl.appendChild(date);
    }

    this.datesEl.appendChild(fragmentEl);
  }

  assignElement() {
    this.datePicker = document.querySelector('#date-picker');
    this.dateInputEl = this.datePicker.querySelector('#date-input');
    this.calendar = this.datePicker.querySelector('#calendar');
    this.monthEl = this.datePicker.querySelector('#month');
    this.datesEl = this.datePicker.querySelector('#dates');
  }

  addEvent() {
    this.dateInputEl.addEventListener('click', this.toggleActive);
    this.datesEl.addEventListener('click', this.clickDates);
    this.monthEl.addEventListener('click', this.clickArrow);
  }

  updateDate() {
    this.firstDay = new Date(this.year, this.monthNum - 1, 1).getDay();
    this.endDate = new Date(this.year, this.monthNum, 0).getDate();
    this.drawDate();
  }

  clickArrow = e => {
    if (e.target.id === 'prev') {
      this.monthNum -= 1;
      this.monthEl.querySelector('#content').textContent = this.getMonthString(
        this.monthNum,
      );
    } else if (e.target.id === 'next') {
      this.monthNum += 1;
      this.monthEl.querySelector('#content').textContent = this.getMonthString(
        this.monthNum,
      );
    }
    this.updateDate();
  };

  clickDates = e => {
    if (e.target.classList.contains('date')) {
      this.datesEl.querySelector('.selected')?.classList.remove('selected');
      e.target.classList.add('selected');
      this.dateInputEl.textContent = `${this.year}/${this.monthNum}/${e.target.textContent}`;
    }
  };

  toggleActive = () => {
    this.calendar.classList.toggle('active');
  };

  getMonthString = month => {
    const updatedYear = Math.floor(month / 12);
    this.monthNum = Math.abs(month % 12);
    this.year += updatedYear;
    const date = new Date(this.year + updatedYear, month - 1);
    const monthString = new Intl.DateTimeFormat('en-US', {
      month: 'long',
    }).format(date);
    return monthString;
  };
}
