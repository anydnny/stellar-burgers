import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchOrderBurger = createAsyncThunk(
  'order/create',
  async (data: string[]) => orderBurgerApi(data)
);
