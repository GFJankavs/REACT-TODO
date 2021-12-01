import './styles/TodoItem.scss';
import { FC } from 'react';
import TodoItemType from '../../interfaces/TodoItemType';

interface TodoItemInterface {
  item: TodoItemType;
  todoClickHandler: () => void;
}

const TodoItem: FC<TodoItemInterface> = ({ item, todoClickHandler }) => (
  <div
    className="todo-item__container"
    onClick={todoClickHandler}
  >
    <h1
      style={item.isCompleted ? { color: '#ccc', textDecoration: 'line-through' } : { color: '#fff', textDecoration: 'none' }}
    >
      {item.text}
    </h1>
    <img
      className="todo-item__check"
      style={item.isCompleted ? { visibility: 'visible' } : { visibility: 'hidden' }}
      src="https://uxwing.com/wp-content/themes/uxwing/download/48-checkmark-cross/tick-mark.png"
      alt="check"
    />
  </div>
);

export default TodoItem;
