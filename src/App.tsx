import React, { useState } from 'react';
import './App.scss';
import TodoInput from './parts/components/TodoInput';
import TodoItem from './parts/components/TodoItem';
import { useAppDispatch, useAppSelector } from './state/hooks';
import { RootState } from './state/store';
import { completeTodo } from './state/reducers/todosSlice';

const App = () => {
  const [showCompleted, setShowCompleted] = useState(false);
  const todoItemList = useAppSelector((state: RootState) => state.todos);

  const dispatch = useAppDispatch();

  const filteredTodos = todoItemList.filter((item) => item.isCompleted);

  console.log('todos: ', todoItemList);
  return (
    <div className="app">
      <TodoInput />
      <div
        className="todo-list__container"
      >
        {/* eslint-disable-next-line no-nested-ternary */}
        {todoItemList.length > 0 ? (
        // eslint-disable-next-line no-nested-ternary
          showCompleted ? (
            filteredTodos.length ? (
              filteredTodos.map((item, index) => (
                <div
                  className="todo-item__wrapper"
                >
                  <TodoItem
                    key={item.id}
                    item={item}
                    todoClickHandler={() => dispatch(completeTodo(item.id))}
                  />
                </div>
              ))
            ) : (
              <h1>No Completed Tasks in the List</h1>
            )
          ) : (
            todoItemList.map((item, index) => (
              <div
                className="todo-item__wrapper"
              >
                <TodoItem
                  key={item.id}
                  item={item}
                  todoClickHandler={() => dispatch(completeTodo(item.id))}
                />
              </div>
            )))
        ) : (
          <h1>No Tasks in the List</h1>
        )}
        <button
          style={{ visibility: todoItemList.length ? 'visible' : 'hidden' }}
          className="todo-list__toggle todo-input__button"
          onClick={() => setShowCompleted(!showCompleted)}
        >
          Show Completed
        </button>
      </div>
    </div>
  );
};

export default App;
