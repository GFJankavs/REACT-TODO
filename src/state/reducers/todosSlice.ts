import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TodoItem {
    id: number;
    text: string;
    isCompleted: boolean;
    editMode: boolean;
    tag: string;
}

interface AddTodoType {
  text: string;
}

interface TodoEdit {
  inputText: string;
  todoId: number;
}

interface TodoTagType {
  todoId: number;
  tagName: string;
}

const initialState: TodoItem[] = [];

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state: TodoItem[], { payload }: PayloadAction<AddTodoType>) => [...state, {
      id: Math.random(), text: payload.text, isCompleted: false, editMode: false, tag: 'all',
    }],
    completeTodo: (state: TodoItem[], { payload }: PayloadAction<number>) => {
      const todoIndex = state.findIndex((todo) => todo.id === payload);
      const newState = [...state];

      newState[todoIndex] = { ...newState[todoIndex], isCompleted: !newState[todoIndex].isCompleted };
      return newState;
    },
    editTodoMode: (state: TodoItem[], { payload }: PayloadAction<TodoEdit>) => {
      const todoIndex = state.findIndex((todo) => todo.id === payload.todoId);
      const openEdit = state.findIndex((todo) => todo.editMode);
      const newState = [...state];

      // @ts-ignore
      newState[openEdit] = { ...newState[openEdit], editMode: false, text: payload.inputText };
      if (newState[todoIndex].editMode) {
        if (newState[openEdit].editMode) {
          newState[openEdit] = { ...newState[todoIndex], editMode: false };
          return newState;
        }
        newState[todoIndex] = { ...newState[todoIndex], editMode: false };
        return newState;
      }
      newState[todoIndex] = { ...newState[todoIndex], editMode: true };
      return newState;
    },
    updateTodoText: (state: TodoItem[], { payload }: PayloadAction<TodoEdit>) => {
      const todoIndex = state.findIndex((todo) => todo.id === payload.todoId);
      const newState = [...state];

      newState[todoIndex] = { ...newState[todoIndex], text: payload.inputText, editMode: false };
      return newState;
    },
    clearCompletedTodos: (state: TodoItem[]) => {
      const newState = [...state];
      return newState.filter((todo) => !todo.isCompleted);
    },
    addTodoTag: (state: TodoItem[], { payload }: PayloadAction<TodoTagType>) => {
      const todoIndex = state.findIndex((todo) => todo.id === payload.todoId);
      const newState = [...state];
      if (newState[todoIndex].tag === payload.tagName) {
        newState[todoIndex] = { ...newState[todoIndex], tag: 'All' };
      } else {
        newState[todoIndex] = { ...newState[todoIndex], tag: payload.tagName };
      }
      return newState;
    },
    initialLoad: (state: TodoItem[], { payload }: PayloadAction<TodoItem[]>) => payload,
  },
});

export const {
  addTodo, completeTodo, editTodoMode, updateTodoText, clearCompletedTodos, addTodoTag, initialLoad,
} = todoSlice.actions;

export default todoSlice.reducer;
