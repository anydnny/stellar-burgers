import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeeds } from './action';

type TFeedsInitialState = {
  feeds: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  errors?: string;
};

export const initialState: TFeedsInitialState = {
  feeds: [],
  total: 0,
  totalToday: 0,
  isLoading: false
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    selectFeeds: (state) => state.feeds,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday
  },
  extraReducers(builder) {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feeds = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.error.message;
      });
  }
});

export const feedsReducer = feedsSlice.reducer;
export const { selectFeeds, selectTotal, selectTotalToday } =
  feedsSlice.selectors;
