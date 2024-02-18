// authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  stCode: '', // 4자리 번호
  categoryNumber: '', // 2자리 번호
  employeeID: '', // 7자리 번호
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.stCode = action.payload.stCode;
      state.categoryNumber = action.payload.categoryNumber;
      state.employeeID = action.payload.employeeID;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.stCode = '';
      state.categoryNumber = '';
      state.employeeID = '';
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;