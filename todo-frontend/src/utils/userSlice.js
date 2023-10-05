import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    showCompletedTodos: false,
  },
  reducers: {
    showCompletedTodos: (state) => {
      state.showCompletedTodos = !state.showCompletedTodos;
    },
  },
});

export const { addUser, removeUser, showCompletedTodos } = userSlice.actions;
export default userSlice.reducer;
