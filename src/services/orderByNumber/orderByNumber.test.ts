import { expect, test, describe } from '@jest/globals';
import { initialState, orderByNumberReducer } from './slice';
import { fetchOrderByNumber } from './action';
import { FEEDS } from '../../utils/testData';

describe('Тест [reducer] orderByNumber', () => {
  describe('Тест экшена fetchOrderByNumber', () => {
    const actionsState = {
      pending: {
        type: fetchOrderByNumber.pending.type,
        payload: null
      },
      fulfilled: {
        type: fetchOrderByNumber.fulfilled.type,
        payload: { orders: [FEEDS[1]._id] }
      },
      rejected: {
        type: fetchOrderByNumber.rejected.type,
        error: { message: 'ERROR!' }
      }
    };
    const initialStateFake = { ...initialState, orders: FEEDS };

    test('Тест экшена fetchOrderByNumber [pending]', () => {
      const result = orderByNumberReducer(
        initialStateFake,
        actionsState.pending
      );
      expect(result.isLoading).toBe(true);
    }),
      test('Тест экшена fetchOrderByNumber [fulfilled]', () => {
        const result = orderByNumberReducer(
          initialStateFake,
          actionsState.fulfilled
        );
        expect(result.isLoading).toBe(false);
        expect(result.orders[0]).toEqual(
          actionsState.fulfilled.payload.orders[0]
        );
      }),
      test('Тест экшена fetchOrderByNumber [rejected]', () => {
        const result = orderByNumberReducer(
          initialStateFake,
          actionsState.rejected
        );
        expect(result.isLoading).toBe(false);
        expect(result.errors).toEqual(actionsState.rejected.error.message);
      });
  });
});
