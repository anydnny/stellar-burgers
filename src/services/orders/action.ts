import { getOrdersApi } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
export const fetchUserOrders = createAsyncThunk('orders/get', async () =>
  getOrdersApi()
);
