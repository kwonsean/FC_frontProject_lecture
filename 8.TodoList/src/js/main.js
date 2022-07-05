import '@fortawesome/fontawesome-free/js/all.min';
import '../scss/style.scss';

class TodoList {
  todoBtnElements = `<button id="complete-btn" class="complete-btn">
  <i class="fas fa-check"></i>
</button>
<button id="edit-btn" class="edit-btn">
  <i class="fas fa-edit"></i>
</button>
<button id="save-btn" class="save-btn">
  <i class="fas fa-save"></i>
</button>
<button id="delete-btn" class="delete-btn">
  <i class="fas fa-trash"></i>
</button>`;

  constructor() {
    this.assginElement();
    this.addEvent();
  }

  assginElement() {
    this.inputContainerEl = document.getElementById('input-container');
    this.toDoInputEl = this.inputContainerEl.querySelector('#todo-input');
    this.addBtnEl = this.inputContainerEl.querySelector('#add-btn');
    this.todoContainerEl = document.getElementById('todo-container');
    this.todoListEl = this.todoContainerEl.querySelector('#todo-list');
  }

  addEvent() {
    this.addBtnEl.addEventListener('click', this.onClickAddBtn);
  }

  onClickAddBtn = () => {
    if (this.toDoInputEl.value === '') return;
    this.addTodoList();
  };

  addTodoList() {
    const todoEl = document.createElement('div');
    todoEl.classList.add('todo');
    todoEl.innerHTML = this.todoBtnElements;
    const todoItemEl = document.createElement('input');
    todoItemEl.classList.add('todo-item');
    todoItemEl.value = this.toDoInputEl.value;

    todoEl.prepend(todoItemEl);
    this.todoListEl.append(todoEl);
  }
}

const todoList = new TodoList();
