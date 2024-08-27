import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  fetchRegisterUser,
  fetchLoginUser,
  fetchLogoutUser,
  fetchUpdateUseInfo,
  fetchGetUser
} from './action';

type TAuthInitialState = {
  userData: TUser;
  isAuth: boolean;
  isAuthRequest: boolean;
  isLoginRequest: boolean;
  error?: string;
};

export const initialState: TAuthInitialState = {
  userData: {
    email: '',
    name: ''
  },
  isAuth: false,
  isAuthRequest: false,
  isLoginRequest: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  selectors: {
    getUserInfo: (state) => state.userData
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRegisterUser.pending, (state) => {
        state.isAuthRequest = true;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        (state.isAuth = true),
          (state.userData.email = action.payload.user.email),
          (state.userData.name = action.payload.user.name);
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        (state.isAuth = false), (state.error = action.error.message);
      })
      .addCase(fetchLoginUser.pending, (state) => {
        state.isLoginRequest = true;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        (state.isAuth = true),
          (state.isLoginRequest = false),
          (state.userData.email = action.payload.user.email),
          (state.userData.name = action.payload.user.name);
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        (state.isAuth = false),
          (state.error = action.error.message),
          (state.isLoginRequest = false);
      })
      .addCase(fetchLogoutUser.pending, (state) => {
        state.isAuthRequest = true;
      })
      .addCase(fetchLogoutUser.fulfilled, (state) => {
        (state.isAuth = false),
          (state.isAuthRequest = false),
          (state.userData.email = ''),
          (state.userData.name = '');
      })
      .addCase(fetchLogoutUser.rejected, (state, action) => {
        (state.isAuthRequest = true), (state.error = action.error.message);
      })
      .addCase(fetchUpdateUseInfo.pending, (state) => {
        state.isLoginRequest = true;
      })
      .addCase(fetchUpdateUseInfo.fulfilled, (state, action) => {
        (state.isLoginRequest = false),
          (state.isAuth = true),
          (state.userData.email = action.payload.user.email),
          (state.userData.name = action.payload.user.name);
      })
      .addCase(fetchUpdateUseInfo.rejected, (state, action) => {
        (state.isLoginRequest = true), (state.error = action.error.message);
      })
      .addCase(fetchGetUser.pending, (state) => {
        (state.isLoginRequest = true), (state.isAuth = false);
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        (state.isLoginRequest = false),
          (state.isAuth = true),
          (state.userData = action.payload.user);
      })
      .addCase(fetchGetUser.rejected, (state, action) => {
        (state.isLoginRequest = false),
          (state.isAuth = false),
          (state.error = action.error.message);
      });
  }
});

export const authReducer = authSlice.reducer;
export const { getUserInfo } = authSlice.selectors;
