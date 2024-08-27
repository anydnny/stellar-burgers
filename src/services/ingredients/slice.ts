import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { fetchIngredients } from './action';

type TIngregientsInitialState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error?: string;
};
const initialState: TIngregientsInitialState = {
  ingredients: [],
  isLoading: false
};
export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        (state.isLoading = true), (state.error = undefined);
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        (state.isLoading = false), (state.error = action.error.message);
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        (state.isLoading = false), (state.ingredients = action.payload);
      });
  }
});

export const { selectIngredients } = ingredientsSlice.selectors;
export const ingredientsReducer = ingredientsSlice.reducer;
