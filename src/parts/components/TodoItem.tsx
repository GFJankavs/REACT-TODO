import './styles/TodoItem.scss';
import {
  FC, Dispatch, SetStateAction, ChangeEvent,
} from 'react';
import TodoItemType from '../../interfaces/TodoItemType';
import { useAppDispatch } from '../../state/hooks';
import { addTodoTag, completeTodo, updateTodoText } from '../../state/reducers/todosSlice';

interface TodoItemInterface {
  item: TodoItemType;
  todoClickHandler: () => void;
  todoEditHandler: Dispatch<SetStateAction<string>>;
  inputText: string;
}

const TodoItem: FC<TodoItemInterface> = ({
  item, todoClickHandler, todoEditHandler, inputText,
}) => {
  const dispatch = useAppDispatch();

  const tagClickHandler = (tagName: string) => dispatch(addTodoTag({ todoId: item.id, tagName }));

  return (
    <div
      className="todo-item__container"
      style={{ cursor: item.editMode ? 'default' : 'pointer' }}
      onClick={() => {
        if (!item.editMode) {
          dispatch(completeTodo(item.id));
        }
      }}
    >
      <img
        className="todo-item__icon"
        src="https://cdn-icons.flaticon.com/png/512/5991/premium/5991463.png?token=exp=1638369035~hmac=7e84d9030ee5ab151c18484e2a78ff8e"
        alt=""
      />
      <div
        className="todo-item__text-container"
      >
        {item.editMode ? (
          <>
            <input
              className="todo-item__input"
              type="text"
              value={inputText}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  dispatch(updateTodoText({ todoId: item.id, inputText }));
                }
              }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => todoEditHandler(e.target.value)}
            />
          </>
        ) : (
          <div
            className="todo-item__value"
            style={item.isCompleted ? { color: '#ccc', textDecoration: 'line-through' } : { color: '#fff', textDecoration: 'none' }}
          >
            {item.text}
          </div>
        )}
      </div>
      <div
        className="todo-item__tag-container"
        style={{
          justifyContent: item.editMode ? 'space-between' : 'flex-end',
          display: !item.editMode && item.tag === 'All' ? 'none' : 'inline-flex',
        }}
      >
        <div
          style={{ display: item.editMode ? 'flex' : 'none' }}
          onClick={() => dispatch(addTodoTag({ todoId: item.id, tagName: 'Today' }))}
          className={item.tag === 'Today' ? 'todo-item__tag todo-item__tag--active' : 'todo-item__tag'}
        >
          Today
        </div>
        <div
          style={{ display: item.editMode ? 'flex' : 'none' }}
          onClick={() => dispatch(addTodoTag({ todoId: item.id, tagName: 'This Week' }))}
          className={item.tag === 'This Week' ? 'todo-item__tag todo-item__tag--active' : 'todo-item__tag'}
        >
          This Week
        </div>
        <div
          style={{ display: item.editMode ? 'flex' : 'none' }}
          onClick={() => dispatch(addTodoTag({ todoId: item.id, tagName: 'This Month' }))}
          className={item.tag === 'This Month' ? 'todo-item__tag todo-item__tag--active' : 'todo-item__tag'}
        >
          This Month
        </div>
        <div
          className="todo-item__tag--selected"
          style={{ display: item.tag !== 'all' && !item.editMode ? 'inline-flex' : 'none' }}
        >
          {item.tag !== 'All' && item.tag}
        </div>
      </div>
      <div
        className="todo-item__check-container"
      >
        <img
          className="todo-item__check"
          style={item.isCompleted ? { visibility: 'visible' } : { visibility: 'hidden' }}
          src="https://uxwing.com/wp-content/themes/uxwing/download/48-checkmark-cross/tick-mark.png"
          alt="check"
        />
      </div>
    </div>
  );
};

export default TodoItem;
