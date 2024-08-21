import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice';
import { ingredientsReducer } from './ingredients/slice';
import { burgerConstructorReducer } from './constructor/slice';
import { feedsReducer } from './feed/slice';
import { orderByNumberReducer } from './orderByNumber/slice';
import { orderReducer } from './orders/slice';
import { createOrderReducer } from './createOrder/store';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  auth: authReducer,
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  feeds: feedsReducer,
  orderByNumber: orderByNumberReducer,
  orders: orderReducer,
  createOrder: createOrderReducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
