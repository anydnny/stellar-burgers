import { expect, test, describe } from '@jest/globals';
import { fetchIngredients } from './action';
import { ingredientsReducer } from './slice';
import { INGREDIENTS } from '../../utils/testData';
import { initialState } from './slice';

describe('Тест [reducer] auth', () => {
  describe('Тест экшена fetchIngredients', () => {
    const actionsState = {
      pending: {
        type: fetchIngredients.pending.type,
        payload: null
      },
      fulfilled: {
        type: fetchIngredients.fulfilled.type,
        payload: INGREDIENTS
      },
      rejected: {
        type: fetchIngredients.rejected.type,
        error: { message: 'ERROR!' }
      }
    };
    test('Тест экшена fetchIngredients [pending]', () => {
      const result = ingredientsReducer(initialState, actionsState.pending);
      expect(result.isLoading).toBe(true);
    }),
      test('Тест экшена fetchIngredients [fulfilled]', () => {
        const result = ingredientsReducer(initialState, actionsState.fulfilled);
        expect(result.isLoading).toBe(false);
        expect(result.ingredients).toEqual(actionsState.fulfilled.payload);
      }),
      test('Тест экшена fetchIngredients [rejected]', () => {
        const result = ingredientsReducer(initialState, actionsState.rejected);
        expect(result.isLoading).toBe(false);
        expect(result.error).toEqual(actionsState.rejected.error.message);
      });
  });
});
