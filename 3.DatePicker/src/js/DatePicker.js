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
    this.month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
      this.today,
    );
    this.dateInputEl.textContent = `${this.year}/${this.monthNum}/${this.date}`;
    this.monthEl.querySelector('#content').textContent = this.month;
  }

  initDate() {
    this.endDate = new Date(this.year, this.monthNum, 0).getDate();
    this.firstDay = new Date(this.year, this.monthNum - 1, 1).getDay();

    const fragmentEl = document.createDocumentFragment();
    for (let i = 1; i <= this.endDate; i += 1) {
      const date = document.createElement('div');
      date.className = 'date';
      date.textContent = i;
      if (i === 1) date.style.gridColumnStart = this.firstDay + 1;
      if (7 - this.firstDay === i % 7) date.style.color = 'blue';
      else if (8 - this.firstDay === i % 7) date.style.color = 'red';
      if (i === this.date) date.classList.add('today');
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
  }

  clickDates = e => {
    if (e.target.classList.contains('date')) {
      this.datesEl.querySelector('.selected')?.classList.remove('selected');
      e.target.classList.add('selected');
    }
  };

  toggleActive = () => {
    this.calendar.classList.toggle('active');
  };
}
