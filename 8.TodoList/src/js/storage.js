export class Storage {
  saveTodo(id, todoContent) {
    const todosData = this.getTodos();
    todosData.push({ id, content: todoContent, status: 'TODO' });
    localStorage.setItem('todos', JSON.stringify(todosData));
  }

  editTodo(id, content, status = 'TODO') {
    const todoDatas = this.getTodos();
    const todoIndex = todoDatas.findIndex(todo => todo.id === Number(id));
    console.log(todoIndex);
    const targetTodoData = todoDatas[todoIndex];
    console.log('targetTodoData', targetTodoData);
    const editedTodoData =
      content === ''
        ? { ...targetTodoData, status }
        : { ...targetTodoData, content };
    todoDatas.splice(todoIndex, 1, editedTodoData);
    localStorage.setItem('todos', JSON.stringify(todoDatas));
  }

  deleteTodo(id) {
    const todoDatas = this.getTodos();
    todoDatas.splice(
      todoDatas.findIndex(todo => todo.id === String(id)),
      1,
    );
    localStorage.setItem('todos', JSON.stringify(todoDatas));
  }

  getTodos() {
    const todos = localStorage.getItem('todos');
    return todos === null ? [] : JSON.parse(todos);
  }
}
