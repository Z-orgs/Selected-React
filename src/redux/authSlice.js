import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
      isAuthenticated: false,
      role: null,
      info: null,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload.res;
      state.login.error = false;
      state.login.isAuthenticated = true;
      state.login.role = action.payload.role;
      state.login.info = action.payload.user;
    },
    loginFail: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    logout: (state) => {
      state.login.currentUser = null;
      state.login.role = null;
      state.login.isAuthenticated = false;
      state.login.info = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFail, logout } =
  authSlice.actions;

export default authSlice.reducer;
