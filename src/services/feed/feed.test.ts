import { expect, test, describe } from '@jest/globals';
import { feedsReducer, selectFeeds, TFeedsInitialState } from './slice';
import { getFeeds } from './action';
import { FEEDS } from '../../utils/testData';
import { initialState } from './slice';

describe('Тест [reducer] feed', () => {
  describe('Тест экшена getFeeds', () => {
    const actionsState = {
      pending: {
        type: getFeeds.pending.type,
        payload: null
      },
      fulfilled: {
        type: getFeeds.fulfilled.type,
        payload: { orders: FEEDS, total: 3, totalToday: 2 }
      },
      rejected: {
        type: getFeeds.rejected.type,
        error: { message: 'Test Error Message' }
      }
    };
    test('Тест getFeeds[pending]', () => {
      const result = feedsReducer(initialState, actionsState.pending);
      expect(result.isLoading).toBe(true);
    });
    test('Тест getFeeds[fulfilled]', () => {
      const result = feedsReducer(initialState, actionsState.fulfilled);
      expect(result.isLoading).toBe(false);
      expect(result.feeds).toEqual(actionsState.fulfilled.payload.orders);
      expect(result.total).toBe(actionsState.fulfilled.payload.total);
      expect(result.totalToday).toBe(actionsState.fulfilled.payload.totalToday);
    });
    test('Тест getFeeds[rejected]', () => {
      const result = feedsReducer(initialState, actionsState.rejected);
      expect(result.isLoading).toBe(false);
      expect(result.errors).toBe(actionsState.rejected.error.message);
    });
  });
  describe('Тест селектора selectFeeds', () => {
    const initialStateFake: TFeedsInitialState = {
      ...initialState,
      feeds: FEEDS
    };
    const result = selectFeeds({ feeds: initialStateFake });
    expect(result).toEqual(FEEDS);
  });
});
