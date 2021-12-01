import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface TodoItem {
    id: number;
    text: string;
    isCompleted: boolean;
}

const initialState: TodoItem[] = [];

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state: TodoItem[], { payload }: PayloadAction<TodoItem>) => [...state, { id: payload.id, text: payload.text, isCompleted: payload.isCompleted }],
    completeTodo: (state: TodoItem[], { payload }: PayloadAction<number>) => {
      const todoIndex = state.findIndex((todo) => todo.id === payload);
      const newState = [...state];

      newState[todoIndex] = { ...newState[todoIndex], isCompleted: !newState[todoIndex].isCompleted };
      return newState;
    },
  },
});

export const { addTodo, completeTodo } = todoSlice.actions;

export default todoSlice.reducer;
