import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';

export const fetchOrderByNumber = createAsyncThunk(
  'order/getByNumber',
  async (order: number) => getOrderByNumberApi(order)
);
