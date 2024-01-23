import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'AuthSlice',
  initialState: {
    isLoggedIn: false,
    // 다른 필요한 상태들 추가 가능
  },
  reducers: {
    // 로그인, 로그아웃 관련 액션들 정의
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;