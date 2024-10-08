import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData,
  TLoginData
} from '../../utils/burger-api';
import { setCookie, deleteCookie } from '../../utils/cookie';

export const fetchRegisterUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) =>
    registerUserApi(data).then((res) => {
      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      return res;
    })
);

export const fetchLoginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) =>
    loginUserApi(data).then((res) => {
      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      return res;
    })
);

export const fetchLogoutUser = createAsyncThunk('user/logout', async () =>
  logoutApi().then(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  })
);
export const fetchUpdateUseInfo = createAsyncThunk(
  'user/update',
  async (data: TRegisterData) => updateUserApi(data)
);
export const fetchGetUser = createAsyncThunk('user/get', async () =>
  getUserApi()
);
