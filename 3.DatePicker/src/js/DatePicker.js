export default class DatePicker {
  datePicker;

  calendar;

  constructor() {
    this.assignElement();
    this.addEvent();
  }

  assignElement() {
    this.datePicker = document.querySelector('#date-picker');
    this.calendar = this.datePicker.querySelector('#calendar');
  }

  addEvent() {
    this.datePicker.addEventListener('click', this.toggleActive);
  }

  toggleActive = e => {
    if (e.target === this.datePicker.querySelector('#date-input'))
      this.calendar.classList.toggle('active');
  };
}
