import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { RootState } from '../../state/store';
import TodoItem from './TodoItem';
import { completeTodo, editTodoMode, updateTodoText } from '../../state/reducers/todosSlice';
import TodoItemType from '../../interfaces/TodoItemType';

interface TodoListType {
  filterType: string;
  showCompletedList: boolean;
}

const TodoTaskList = (todoList: TodoListType) => {
  const [editTodoText, setEditTodoText] = useState('');
  const todoItemList = useAppSelector((state: RootState) => state.todos);
  const filteredTodos = todoItemList?.filter((item) => item.isCompleted);
  const filteredTodosByTag = todoItemList.filter((item) => item.tag === todoList.filterType);
  const dispatch = useAppDispatch();

  console.log(todoItemList.filter((item) => item.text !== ''));

  if (todoItemList.filter((item) => item.text !== '').length) {
    if (todoList.filterType !== 'All') {
      if (filteredTodosByTag.length) {
        if (todoList.showCompletedList) {
          if (filteredTodos.length) {
            return (
              <>
                {
                  filteredTodos.map((item) => (
                    <div
                      className="todo-item__wrapper"
                      key={item.id}
                    >
                      <TodoItem
                        key={item.id}
                        item={item}
                        todoClickHandler={() => dispatch(completeTodo(item.id))}
                        todoEditHandler={() => setEditTodoText}
                        inputText={editTodoText}
                      />
                      <div
                        className="todo-item__edit-container"
                      >
                        <button
                          key={item.id}
                          className="todo-item__edit"
                          onClick={() => {
                            setEditTodoText(item.text);
                            dispatch(editTodoMode({
                              todoId: item.id,
                              inputText: editTodoText,
                            }));
                          }}
                        >
                          Edit Task
                        </button>
                      </div>
                    </div>
                  ))
                }
              </>
            );
          }
          return <h1>No Completed Tasks in the List</h1>;
        }
        return (
          <>
            {filteredTodosByTag.map((item) => (
              <div
                className="todo-item__wrapper"
                key={item.id}
              >
                <TodoItem
                  key={item.id}
                  item={item}
                  todoClickHandler={() => dispatch(completeTodo(item.id))}
                  todoEditHandler={setEditTodoText}
                  inputText={editTodoText}
                />
                <div
                  className="todo-item__edit-container"
                >
                  <button
                    className="todo-item__edit"
                    style={{ cursor: item.isCompleted ? 'not-allowed' : 'pointer' }}
                    onClick={() => {
                      if (!item.isCompleted) {
                        if (item.editMode) {
                          dispatch(updateTodoText({
                            todoId: item.id,
                            inputText: editTodoText,
                          }));
                        } else {
                          setEditTodoText(item.text);
                          dispatch(editTodoMode({
                            todoId: item.id,
                            inputText: editTodoText,
                          }));
                        }
                      }
                    }}
                  >
                    Edit Task
                  </button>
                </div>
              </div>
            ))}
          </>
        );
      }
      return <h1>No Todos with such tag name.</h1>;
    }
    return (
      <>
        {todoItemList.filter((item) => item.text !== '')
          .map((item) => (
            <div
              className="todo-item__wrapper"
              key={item.id}
            >
              <TodoItem
                key={item.id}
                item={item}
                todoClickHandler={() => dispatch(completeTodo(item.id))}
                todoEditHandler={setEditTodoText}
                inputText={editTodoText}
              />
              <div
                className="todo-item__edit-container"
              >
                <button
                  className="todo-item__edit"
                  style={{ cursor: item.isCompleted ? 'not-allowed' : 'pointer' }}
                  onClick={() => {
                    if (!item.isCompleted) {
                      if (item.editMode) {
                        dispatch(updateTodoText({
                          todoId: item.id,
                          inputText: editTodoText,
                        }));
                      } else {
                        setEditTodoText(item.text);
                        dispatch(editTodoMode({
                          todoId: item.id,
                          inputText: editTodoText,
                        }));
                      }
                    }
                  }}
                >
                  Edit Task
                </button>
              </div>
            </div>
          ))}
      </>
    );
  }
  return <h1>No Tasks in the List</h1>;
};

export default TodoTaskList;
