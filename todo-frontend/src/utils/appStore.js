import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";

const appStore = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

export default appStore;
