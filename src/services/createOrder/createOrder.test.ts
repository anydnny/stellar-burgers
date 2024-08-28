import { expect, test, describe } from '@jest/globals';
import { createOrderReducer } from './slice';
import { fetchOrderBurger } from './action';
import { FEEDS } from '../../utils/testData';
import { initialState } from './slice';

describe('Тест [reducer] createOrder', () => {
  describe('Тест экщена fetchOrderBurger', () => {
    const actionsState = {
      pending: {
        type: fetchOrderBurger.pending.type,
        payload: null
      },
      fulfilled: {
        type: fetchOrderBurger.fulfilled.type,
        payload: { order: FEEDS[1] }
      },
      rejected: {
        type: fetchOrderBurger.rejected.type,
        error: { message: 'ERROR!' }
      }
    };

    test('Тест экшена fetchIngredients [pending]', () => {
      const result = createOrderReducer(initialState, actionsState.pending);
      expect(result.isLoading).toBe(true);
    }),
      test('Тест экшена fetchIngredients [fulfilled]', () => {
        const result = createOrderReducer(initialState, actionsState.fulfilled);
        expect(result.isLoading).toBe(false);
        expect(result.order).toEqual(actionsState.fulfilled.payload.order);
      }),
      test('Тест экшена fetchIngredients [rejected]', () => {
        const result = createOrderReducer(initialState, actionsState.rejected);
        expect(result.isLoading).toBe(false);
        expect(result.errors).toEqual(actionsState.rejected.error.message);
      });
  });
});
