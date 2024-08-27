import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchOrderBurger } from './action';

type TcreateOrderState = {
  order: TOrder | null;
  isLoading: boolean;
  errors?: string;
};

const initialState: TcreateOrderState = {
  order: null,
  isLoading: false
};

const createOrderSlice = createSlice({
  name: 'createOrder',
  initialState,
  selectors: {
    getOrder: (state) => state.order
  },
  reducers: {
    clearOrder: (state) => {
      (state.order = null), (state.isLoading = false);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrderBurger.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderBurger.fulfilled, (state, action) => {
        (state.isLoading = false), (state.order = action.payload.order);
      })
      .addCase(fetchOrderBurger.rejected, (state, action) => {
        (state.isLoading = false), (state.errors = action.error.message);
      });
  }
});

export const createOrderReducer = createOrderSlice.reducer;
export const { getOrder } = createOrderSlice.selectors;
export const { clearOrder } = createOrderSlice.actions;
