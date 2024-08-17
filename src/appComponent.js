import { TodoListDataService } from './services/todoListService.js';

const AppTemplate = document.createElement('template');
AppTemplate.innerHTML = `
    <style>
        @import url('./src/appComponent.css');
       
    </style>
    <div class="app-component">
        <div class="todo-list-container">
            <h1>Todo List</h1>
            <div class="todo-controls">
                <input type="number" class="todo-count-input" placeholder="Enter number of todos" min="1" max="30" step="1" />
                <button class="fetch-todos-btn">Fetch Todos</button>
            </div>
            <div class="custom-todo-controls">
                <button class="add-todo-item-btn">Create Custom Todo</button>
                <button class="delete-custom-todos-btn">Delete Custom Todos</button>
            </div>
            <div class="delete-controls">
                <button class="delete-fetched-todos-btn">Delete Fetched Todos</button>
                <button class="delete-all-todos-btn">Delete All Todos</button>
            </div>
            <div class="todo-items">
            </div>
        </div>
        <div class="error-popup">Please enter a valid whole number between 1 and 30!</div>
        <div class="success-popup">Todos fetched successfully!</div>
    </div>
`;

export class AppComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(AppTemplate.content.cloneNode(true));

    TodoListDataService.initilalizeState([]);

    this.todoList = this.shadowRoot.querySelector('.todo-list-container');
    this.todoItems = this.todoList.querySelector('.todo-items');
    this.addTodoItemBtn = this.todoList.querySelector('.add-todo-item-btn');

    this.todoCountInput = this.todoList.querySelector('.todo-count-input');
    this.fetchTodosBtn = this.todoList.querySelector('.fetch-todos-btn');
    this.deleteFetchedTodosBtn = this.todoList.querySelector(
      '.delete-fetched-todos-btn'
    );
    this.deleteCustomTodosBtn = this.todoList.querySelector(
      '.delete-custom-todos-btn'
    );
    this.deleteAllTodosBtn = this.todoList.querySelector(
      '.delete-all-todos-btn'
    );
    this.errorPopup = this.shadowRoot.querySelector('.error-popup');
    this.successPopup = this.shadowRoot.querySelector('.success-popup');
  }

  connectedCallback() {
    this.fetchTodosBtn.addEventListener('click', () => this.handleFetchClick());
    this.deleteFetchedTodosBtn.addEventListener('click', () =>
      this.deleteFetchedTodos()
    );
    this.deleteCustomTodosBtn.addEventListener('click', () =>
      this.deleteCustomTodos()
    );
    this.deleteAllTodosBtn.addEventListener('click', () =>
      this.deleteAllTodos()
    );
    this.addTodoItemBtn.addEventListener('click', (e) => this.addTodoItem(e));
  }

  handleFetchClick() {
    const count = this.todoCountInput.value;
    const isWholeNumber = Number.isInteger(Number(count));

    if (!isWholeNumber || count < 1 || count > 30) {
      this.showErrorPopup();
    } else {
      this.fetchTodos(count);
    }
  }

  async fetchTodos(count) {
    try {
      const response = await fetch(
        `https://dummyjson.com/todos?limit=${count}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }

      const data = await response.json();

      data.todos.forEach((todo) => {
        TodoListDataService.AddTodoItem(todo.id, todo.todo, todo.completed);
        this.renderTodoItem(todo, true);
      });

      this.showSuccessPopup('Todos fetched successfully!'); // Show success message
    } catch (error) {
      console.error('Error fetching todos:', error);
      this.showErrorPopup(
        'There was an error fetching todos. Please try again.'
      );
    }
  }

  renderTodoItem(todo, isFetched = false) {
    const todoItem = document.createElement('todo-item');

    todoItem.id = todo.id;
    todoItem.setAttribute('data-value', todo.todo);
    todoItem.setAttribute('data-checked', todo.completed);

    if (isFetched) {
      todoItem.classList.add('fetched-todo');
    }

    this.todoItems.appendChild(todoItem);
  }

  addTodoItem(e) {
    e.stopPropagation();
    const todoItem = document.createElement('todo-item');

    AppComponent.todoIdCount =
      AppComponent.todoIdCount ?? TodoListDataService.state.length;
    todoItem.id = AppComponent.todoIdCount++;

    this.todoItems.appendChild(todoItem);
  }

  deleteFetchedTodos() {
    const fetchedTodos = this.todoItems.querySelectorAll('.fetched-todo');

    fetchedTodos.forEach((todoElement) => {
      this.todoItems.removeChild(todoElement);
      TodoListDataService.DeleteTodoItem(todoElement.id);
    });
  }

  deleteCustomTodos() {
    const customTodos = this.todoItems.querySelectorAll(':not(.fetched-todo)');

    customTodos.forEach((todoElement) => {
      this.todoItems.removeChild(todoElement);
      TodoListDataService.DeleteTodoItem(todoElement.id);
    });
  }

  deleteAllTodos() {
    const allTodos = this.todoItems.querySelectorAll('todo-item');

    allTodos.forEach((todoElement) => {
      this.todoItems.removeChild(todoElement);
      TodoListDataService.DeleteTodoItem(todoElement.id);
    });
  }

  showErrorPopup() {
    this.errorPopup.style.display = 'block';
    setTimeout(() => {
      this.errorPopup.style.display = 'none';
    }, 3000);
  }

  showSuccessPopup() {
    this.successPopup.style.display = 'block';
    setTimeout(() => {
      this.successPopup.style.display = 'none';
    }, 3000);
  }

  disconnectedCallback() {
    this.fetchTodosBtn.removeEventListener('click', this.handleFetchClick);
    this.deleteFetchedTodosBtn.removeEventListener(
      'click',
      this.deleteFetchedTodos
    );
    this.deleteCustomTodosBtn.removeEventListener(
      'click',
      this.deleteCustomTodos
    );
    this.deleteAllTodosBtn.removeEventListener('click', this.deleteAllTodos);
    this.addTodoItemBtn.removeEventListener('click', this.addTodoItem);
  }
}
