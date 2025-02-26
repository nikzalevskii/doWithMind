import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterType, Todo } from "../../types/types";

interface TodoState {
  todos: Todo[];
  filter: FilterType;
  nextId: number;
}

const initialState: TodoState = {
  todos: [],
  filter: "all",
  nextId: 1,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: state.nextId++,
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
  },
  extraReducers: (builder) => {
    builder.addCase("RESET_STATE", () => initialState);
  },
});

export const { addTodo, toggleTodo, setFilter, clearCompleted } =
  todoSlice.actions;
export default todoSlice.reducer;
