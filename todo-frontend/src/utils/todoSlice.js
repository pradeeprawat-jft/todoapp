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
      const { todoId, title, description, priority, status } = action.payload;
      const updatedTodos = state.todos.map((todo) =>
        todo.todoId === todoId
          ? {
              ...todo,
              title: title,
              description: description,
              priority: priority,
              status: status,
            }
          : todo
      );

      state.todos = updatedTodos;
    },

    removeAll: (state) => {
      state.todos = [];
    },
  },
});

export const { addTodo, removeTodo, editTodo, removeAll } = todoSlice.actions;
export default todoSlice.reducer;
