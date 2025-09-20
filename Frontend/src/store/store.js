// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice"; // example slice
import sidebarReducer from "../slices/sidebarSlice";
export const store = configureStore({
  reducer: {
    user: userReducer, // add more slices here later
    sidebar: sidebarReducer,
  },
});
