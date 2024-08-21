import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchUserOrders } from './action';

type TOrdersInitialState = {
  orders: TOrder[];
  isLoading: boolean;
  errors?: string;
};

export const initialState: TOrdersInitialState = {
  orders: [],
  isLoading: false
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.error.message;
      });
  }
});

export const orderReducer = ordersSlice.reducer;
