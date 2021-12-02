import React from 'react';

import './styles/ProgressBar.scss';
import { useAppSelector } from '../../state/hooks';
import { RootState } from '../../state/store';

const ProgressBar = () => {
  console.log(123);
  const todoItemList = useAppSelector((state: RootState) => state.todos);
  const completedTasks = todoItemList.filter((item) => item.isCompleted);
  const completedTasksPercent = completedTasks.length / todoItemList.length;
  return (
    <div
      className="todo__progressbar-container"
      style={{ display: todoItemList.length ? 'flex' : 'none' }}
    >
      <h3
        className="todo__progressbar-text"
      >
        Completed Tasks
      </h3>
      <span
        className="todo__progressbar-percentage"
      >
        {`${Math.round(completedTasksPercent * 100)}%`}
      </span>
      <div
        className="todo__progressbar-wrapper"
      >
        <div
          className="todo__progressbar"
          style={{ width: `${600 * completedTasksPercent}px` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
