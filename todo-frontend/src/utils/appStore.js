import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import userReducer from "./userSlice";
import themeReducee from "./themeSlice";

const appStore = configureStore({
  reducer: {
    todo: todoReducer,
    user: userReducer,
    theme: themeReducee,
  },
});

export default appStore;
