/* eslint-disable class-methods-use-this */
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
    this.radioAreaEl = this.inputContainerEl.querySelector('#radio-area');
    this.filterRadioBtnEls =
      this.radioAreaEl.querySelectorAll('input[name=filter]');
  }

  addEvent() {
    this.addBtnEl.addEventListener('click', this.onClickAddBtn);
    this.addRadioBtnEvent();
  }

  addRadioBtnEvent() {
    for (const filterRadioBtn of this.filterRadioBtnEls) {
      filterRadioBtn.addEventListener('click', this.onClickRadioBtn);
    }
  }

  onClickRadioBtn = event => {
    const { target } = event;
    // 필터링은 이제 주소값이 바뀔때 실행됨
    // this.filterTodo(target.value);
    window.location.href = `#/${target.value.toLowerCase()}`;
  };

  filterTodo(status) {
    const todoDivEls = this.todoListEl.querySelectorAll('div.todo');
    for (const todoDivEl of todoDivEls) {
      switch (status) {
        case 'ALL':
          todoDivEl.style.display = 'flex';
          break;
        case 'DONE':
          todoDivEl.style.display = todoDivEl.classList.contains('done')
            ? 'flex'
            : 'none';
          break;
        case 'TODO':
          todoDivEl.style.display = todoDivEl.classList.contains('done')
            ? 'none'
            : 'flex';
          break;
      }
    }
  }

  onClickAddBtn = () => {
    if (this.toDoInputEl.value === '') return;
    this.addTodo();
  };

  onClickTodoEl = event => {
    const { currentTarget, target } = event;
    const btn = target.closest('button');
    if (btn === null) return;
    switch (btn.className) {
      case 'delete-btn':
        this.deleteTodo(currentTarget);
        break;
      case 'complete-btn':
        this.completeTodo(currentTarget);
        break;
      case 'edit-btn':
        if (currentTarget.classList.contains('done')) return;
        this.editTodo(currentTarget);
        break;
      case 'save-btn':
        this.updateTodo(currentTarget);
        break;
      default:
        break;
    }
  };

  addTodo() {
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

  deleteTodo(todoEl) {
    todoEl.classList.add('delete');
    todoEl.addEventListener('transitionend', () => {
      todoEl.remove();
    });
  }

  completeTodo(todoEl) {
    todoEl.classList.toggle('done');
  }

  editTodo(todoEl) {
    todoEl.classList.add('edit');
    const inputEl = todoEl.querySelector('input');
    inputEl.readOnly = false;
    inputEl.focus();
  }

  updateTodo(todoEl) {
    const inputEl = todoEl.querySelector('input');
    if (inputEl.value.length === 0) {
      alert('입력 하시죠!');
      inputEl.focus();
    } else {
      todoEl.classList.remove('edit');
      inputEl.readOnly = true;
    }
  }
}

class Router {
  routes = [];
  notFoundCallback = () => {};

  addRoute(url, callback) {
    this.routes.push({ url, callback });
    return this;
  }

  checkRoute = () => {
    const currentRoute = this.routes.find(
      route => route.url === window.location.hash,
    );
    if (!currentRoute) {
      this.notFoundCallback();
      return;
    }
    currentRoute.callback();
  };

  init() {
    window.addEventListener('hashchange', this.checkRoute);
    if (!window.location.hash) {
      window.location.hash = '#/';
    }
    this.checkRoute();
  }

  setNotFound(callback) {
    this.notFoundCallback = callback;
    return this;
  }
}

const router = new Router();
const todoList = new TodoList();
const routerCallback = status => () => {
  todoList.filterTodo(status);
  document.querySelector(
    `input[type='radio'][value='${status}']`,
  ).checked = true;
};
router
  .addRoute('#/all', routerCallback('ALL'))
  .addRoute('#/todo', routerCallback('TODO'))
  .addRoute('#/done', routerCallback('DONE'))
  .setNotFound(routerCallback('ALL'))
  .init();
