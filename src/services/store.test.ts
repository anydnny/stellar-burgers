import { expect, test } from '@jest/globals';
import store, { rootReducer } from './store';

test('Тест корректности rootReducer', () => {
  const result = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
  expect(result).toEqual(store.getState());
});
