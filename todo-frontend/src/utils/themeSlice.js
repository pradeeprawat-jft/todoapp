import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: "light",
  },
  reducers: {
    toggletheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { toggletheme } = themeSlice.actions;
export default themeSlice.reducer;
