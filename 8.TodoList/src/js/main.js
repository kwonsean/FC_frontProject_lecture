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

  onClickTodoEl = event => {
    const { currentTarget } = event;
    const btn = event.target.closest('button');
    if (btn === null) return;
    switch (btn.className) {
      case 'delete-btn':
        this.deleteTodoList(currentTarget);
        break;
      case 'complete-btn':
        console.log('complete');
        break;
      case 'edit-btn':
        console.log('edit');
        break;
      default:
        break;
    }
  };

  addTodoList() {
    const todoEl = document.createElement('div');
    todoEl.classList.add('todo');
    todoEl.innerHTML = this.todoBtnElements;
    const todoItemEl = document.createElement('input');
    todoItemEl.classList.add('todo-item');
    todoItemEl.value = this.toDoInputEl.value;
    this.toDoInputEl.value = '';
    todoItemEl.readOnly = true;

    todoEl.prepend(todoItemEl);
    todoEl.addEventListener('click', this.onClickTodoEl);
    this.todoListEl.append(todoEl);
  }

  deleteTodoList(todoEl) {
    todoEl.classList.add('delete');
    setTimeout(() => {
      this.updateTodoList();
    }, 1000);
  }

  updateTodoList() {
    const deletedTodo = this.todoListEl.querySelectorAll('.delete');
    this.todoListEl.removeChild(deletedTodo[0]);
  }
}

const todoList = new TodoList();
