import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";


// --------- Helper function ---------
const loadAuthFromStorage = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  

  if (token && user) {
    try {
      const decoded = jwtDecode(token);
      

      // Check if token is expired
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return { user: null, token: null, isAuthenticated: false };
      }

      return { user, token, isAuthenticated: true };
    } catch (err) {
      // Invalid token
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { user: null, token: null, isAuthenticated: false };
    }
  }

  return { user: null, token: null, isAuthenticated: false };
};

// --------- Initial state ---------
const initialState = loadAuthFromStorage();

// --------- Slice ---------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      // Persist in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    updateUser: (state, action) => {
      // Merge new user data safely
      state.user = { ...(state.user || {}), ...action.payload };
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
});

export const { setCredentials, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
