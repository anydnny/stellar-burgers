import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchOrderByNumber } from './action';

type TOrderByNumberInitialState = {
  orders: TOrder[];
  isLoading: boolean;
  errors?: string;
};

export const initialState: TOrderByNumberInitialState = {
  orders: [],
  isLoading: false
};

const orderByNumberSlice = createSlice({
  name: 'orderByNumber',
  initialState,
  selectors: {
    selectOrders: (state) => state.orders
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        (state.isLoading = false), (state.orders = action.payload.orders);
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        (state.isLoading = false), (state.errors = action.error.message);
      });
  }
});

export const orderByNumberReducer = orderByNumberSlice.reducer;
export const { selectOrders } = orderByNumberSlice.selectors;
