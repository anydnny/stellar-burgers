import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TBurgerConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  isLoading: boolean;
  error?: string;
};

export const initialState: TBurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  isLoading: false
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    getConstructorsState: (state) => state.constructorItems,
    getConstructorLoading: (state) => state.isLoading
  },
  reducers: {
    addIngredient: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.constructorItems.bun = payload;
        } else {
          state.constructorItems.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeIngredient: (
      state,
      { payload }: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== payload.id
        );
    },
    moveUpIngredient: (state, { payload }: PayloadAction<number>) => {
      const currentIngredient = state.constructorItems.ingredients[payload];

      const previousIngredient =
        state.constructorItems.ingredients[payload - 1];

      state.constructorItems.ingredients.splice(
        payload - 1,
        2,
        currentIngredient,
        previousIngredient
      );
    },
    moveDownIngredient: (state, { payload }: PayloadAction<number>) => {
      const currentIngredient = state.constructorItems.ingredients[payload];

      const nextIngredient = state.constructorItems.ingredients[payload + 1];

      state.constructorItems.ingredients.splice(
        payload,
        2,
        nextIngredient,
        currentIngredient
      );
    },
    clearIngredients: (state) => {
      (state.constructorItems.bun = null),
        (state.constructorItems.ingredients = []);
    }
  }
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clearIngredients
} = burgerConstructorSlice.actions;
export const { getConstructorsState, getConstructorLoading } =
  burgerConstructorSlice.selectors;
