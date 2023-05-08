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
    },
    loginFail: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    loginWithGG: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload.data;
      state.login.error = false;
      state.login.isAuthenticated = true;
      state.login.role = "User";
    },
    logout: (state) => {
      state.login.currentUser = null;
      state.login.role = null;
      state.login.isAuthenticated = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFail, logout, loginWithGG } =
  authSlice.actions;

export default authSlice.reducer;
