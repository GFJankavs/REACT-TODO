import './styles/TodoInput.scss';
import {
  useEffect, useRef, useState,
} from 'react';
import { addTodo } from '../../state/reducers/todosSlice';
import { useAppDispatch } from '../../state/hooks';

const TodoInput = () => {
  const [inputText, setInputText] = useState('');
  const input = useRef< HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    input.current?.focus();
  }, []);

  return (
    <div
      className="todo-input__container"
    >
      <img
        className="todo-input__image"
        src="https://coursework.vschool.io/content/images/2015/08/todo_logo.gif"
        alt="todo-logo"
      />
      <h3
        className="todo-input__description"
      >
        Write a task to add it to the list
      </h3>
      <form
        className="todo-input__wrapper"
      >
        <input
          ref={input}
          className="todo-input"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          className="todo-input__button"
          onClick={(e) => {
            e.preventDefault();
            if (inputText.length > 0) {
              dispatch(addTodo({ id: Math.random(), text: inputText, isCompleted: false }));
            }
            setInputText('');
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default TodoInput;
