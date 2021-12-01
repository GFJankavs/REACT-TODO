import React, { useEffect, useState } from 'react';
import './App.scss';
import './parts/components/styles/TodoItem.scss';
import TodoInput from './parts/components/TodoInput';
import { useAppDispatch, useAppSelector } from './state/hooks';
import { RootState } from './state/store';
import {
  completeTodo, editTodoMode, updateTodoText, clearCompletedTodos,
  TodoItem, initialLoad,
} from './state/reducers/todosSlice';
import TodoTaskList from './parts/components/TodoList';
import useLocalStorage from './services/localStorage';

const App = () => {
  const [showCompleted, setShowCompleted] = useState(false);
  const [sortFilter, setSortFilter] = useState('All');
  const todoItemList = useAppSelector((state: RootState) => state.todos);

  const dispatch = useAppDispatch();

  const getStorageValue = (key: string, defaultValue: []) => {
    // getting stored value
    const saved = localStorage.getItem(key);
    const initial = JSON.parse(saved || '[]');
    return initial || defaultValue;
  };

  useEffect(() => {
    dispatch(initialLoad(getStorageValue('todos', [])));
  }, []);

  useEffect(() => {
    // storing input name
    localStorage.setItem('todos', JSON.stringify(todoItemList));
  }, [todoItemList]);

  console.log(localStorage);

  const categoryTodos = todoItemList.filter((todo) => todo.tag === sortFilter);

  const filteredTodos = todoItemList?.filter((item) => item.isCompleted);

  return (
    <div className="app">
      <TodoInput />
      <div
        className="todo-list__button-container"
      >
        <button
          className="todo-list__toggle todo-input__button"
          disabled={!todoItemList.length}
          onClick={() => setShowCompleted(!showCompleted)}
        >
          Show Completed
        </button>
        <button
          disabled={!todoItemList.length}
          className="todo-list__toggle todo-input__button"
          onClick={() => dispatch(clearCompletedTodos())}
        >
          Clear All Completed Tasks
        </button>
        <div
          className={!todoItemList.length ? 'todo-list__filter-container todo-list__filter-container--disabled' : 'todo-list__filter-container'}
        >
          <span
            className="todo-list__filter-text"
          >
            Filter by:
          </span>
          <select
            disabled={!todoItemList.length}
            className="todo-list__filter"
            name="tag"
            id="tag"
            onChange={(e) => setSortFilter(e.target.value)}
            value={sortFilter}
          >
            <option value="All">All</option>
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
          </select>
        </div>
      </div>

      <div
        className="todo-list__container"
      >
        <TodoTaskList
          filterType={sortFilter}
          showCompletedList={showCompleted}
        />
      </div>
    </div>

  );
};

export default App;
