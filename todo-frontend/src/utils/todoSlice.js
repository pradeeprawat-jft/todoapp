import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action) => {
      const todoIdToRemove = action.payload;
      state.todos = state.todos.filter(
        (todo) => todo.todoId !== todoIdToRemove
      );
    },
    editTodo: (state, action) => {
      console.log(action.payload, "action");
      const { todoId, title, description } = action.payload;
      state.todos = state.todos.map((todo) =>
        todo.todoId === todoId
          ? {
              ...todo,
              title: title,
              description: description,
            }
          : todo
      );
    },
  },
});

export const { addTodo, removeTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
