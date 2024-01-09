// authActions.js

// 액션 타입 정의
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

// 사용자 로그인 액션 생성자 함수
export const loginUser = () => {
  return {
    type: LOGIN_USER,
  };
};

// 사용자 로그아웃 액션 생성자 함수
export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};