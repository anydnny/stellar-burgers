import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { fetchRegisterUser } from './action';

type TAuthInitialState = {
  userData: TUser;
  isAuth: boolean;
  isAuthRequest: boolean;
  error?: string;
};

export const initialState: TAuthInitialState = {
  userData: {
    email: '',
    name: ''
  },
  isAuth: false,
  isAuthRequest: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRegisterUser.pending, (state) => {
        state.isAuthRequest = true;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        (state.isAuth = false), (state.error = action.error.message);
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        (state.isAuth = true),
          (state.userData.email = action.payload.user.email),
          (state.userData.name = action.payload.user.name);
      });
  }
});

export const authReducer = authSlice.reducer;
