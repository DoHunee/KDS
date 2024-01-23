import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'AuthSlice',
  initialState: {
    isLoggedIn: false,
    // 다른 필요한 상태들 추가 가능
  },
  reducers: {
    // 로그인 및 로그아웃과 관련된 액션 정의
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