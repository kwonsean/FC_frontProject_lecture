import '@fortawesome/fontawesome-free/js/all.min';
import '../scss/style.scss';

class TodoList {
  // 강의에서는 버튼을 만드는 메서드를 만들어서 id, class 값들을 전달해서 버튼을 하나씩 만드는 방식으로 구현
  // 근데 결국 이것도 매번 함수가 3번 실행되는 형태이기 때문에 이 방법보다는 제 방법이 더 낫지 않나.. (가독성은 떨어져도)
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
    const { currentTarget, target } = event;
    const btn = target.closest('button');
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

  // eslint-disable-next-line class-methods-use-this
  deleteTodoList(todoEl) {
    todoEl.classList.add('delete');
    todoEl.addEventListener('transitionend', () => {
      todoEl.remove();
    });
  }
}

const todoList = new TodoList();
