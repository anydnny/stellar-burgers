import { expect, test, describe } from '@jest/globals';
import { orderReducer } from './slice';
import { fetchUserOrders } from './action';
import { FEEDS } from '../..//utils/testData';
import { initialState } from './slice';

describe('Тест [reducer] orders', () => {
  describe('Тест экшена fetchUserOrders', () => {
    const actionsState = {
      pending: {
        type: fetchUserOrders.pending.type,
        payload: null
      },
      fulfilled: {
        type: fetchUserOrders.fulfilled.type,
        payload: FEEDS
      },
      rejected: {
        type: fetchUserOrders.rejected.type,
        error: { message: 'ERROR!' }
      }
    };
    test('Тест экшена fetchIngredients [pending]', () => {
      const result = orderReducer(initialState, actionsState.pending);
      expect(result.isLoading).toBe(true);
    }),
      test('Тест экшена fetchIngredients [fulfilled]', () => {
        const result = orderReducer(initialState, actionsState.fulfilled);
        expect(result.isLoading).toBe(false);
        expect(result.orders).toEqual(actionsState.fulfilled.payload);
      }),
      test('Тест экшена fetchIngredients [rejected]', () => {
        const result = orderReducer(initialState, actionsState.rejected);
        expect(result.isLoading).toBe(false);
        expect(result.errors).toEqual(actionsState.rejected.error.message);
      });
  });
});
