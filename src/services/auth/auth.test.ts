import { expect, test, describe } from '@jest/globals';
import { authReducer, initialState } from './slice';

import {
  fetchRegisterUser,
  fetchLoginUser,
  fetchLogoutUser,
  fetchUpdateUseInfo,
  fetchGetUser
} from './action';

describe('Тест [reducer] auth', () => {
  describe('Тест экшена fetchRegisterUser', () => {
    const actionsState = {
      pending: {
        type: fetchRegisterUser.pending.type,
        payload: null
      },
      fulfilled: {
        type: fetchRegisterUser.fulfilled.type,
        payload: { user: { name: 'Keke', email: 'keke@gmail.com' } }
      },
      rejected: {
        type: fetchRegisterUser.rejected.type,
        error: { message: 'ERROR!' }
      }
    };

    test('Тест fetchRegisterUser[pending]', () => {
      const result = authReducer(initialState, actionsState.pending);
      expect(result.isAuth).toBe(false);
      expect(result.isAuthRequest).toBe(true);
      expect(result.isLoginRequest).toBe(false);
    });

    test('Тест fetchRegisterUser[fulfilled]', () => {
      const result = authReducer(initialState, actionsState.fulfilled);
      expect(result.isAuth).toBe(true);
      expect(result.isAuthRequest).toBe(false);
      expect(result.isLoginRequest).toBe(false);
      expect(result.userData).toEqual(actionsState.fulfilled.payload.user);
    });

    test('Тест fetchRegisterUser[rejected]', () => {
      const result = authReducer(initialState, actionsState.rejected);
      expect(result.isAuth).toBe(false);
      expect(result.isAuthRequest).toBe(false);
      expect(result.isLoginRequest).toBe(false);
      expect(result.error).toBe(actionsState.rejected.error.message);
    });
  });
  describe('Тест экшена fetchGetUser', () => {
    const actionsState = {
      pending: {
        type: fetchGetUser.pending.type,
        payload: null
      },
      fulfilled: {
        type: fetchGetUser.fulfilled.type,
        payload: { user: { name: 'Keke', email: 'keke@gmail.com' } }
      },
      rejected: {
        type: fetchGetUser.rejected.type,
        error: { message: 'ERROR!' }
      }
    };
    test('Тест fetchGetUser[pending]', () => {
      const result = authReducer(initialState, actionsState.pending);
      expect(result.isAuth).toBe(false);
      expect(result.isAuthRequest).toBe(false);
      expect(result.isLoginRequest).toBe(true);
    });
    test('Тест fetchGetUser[fulfilled]', () => {
      const result = authReducer(initialState, actionsState.fulfilled);
      expect(result.isAuth).toBe(true);
      expect(result.isAuthRequest).toBe(false);
      expect(result.isLoginRequest).toBe(false);
      expect(result.userData).toEqual(actionsState.fulfilled.payload.user);
    });
    test('Тест fetchGetUser[rejected]', () => {
      const result = authReducer(initialState, actionsState.rejected);
      expect(result.isAuth).toBe(false);
      expect(result.isAuthRequest).toBe(false);
      expect(result.isLoginRequest).toBe(false);
      expect(result.error).toBe(actionsState.rejected.error.message);
    });
  });
  describe('Тест экшена fetchLoginUser', () => {
    const actionsState = {
      pending: {
        type: fetchLoginUser.pending.type,
        payload: null
      },
      fulfilled: {
        type: fetchLoginUser.fulfilled.type,
        payload: { user: { name: 'Keke', email: 'keke@gmail.com' } }
      },
      rejected: {
        type: fetchLoginUser.rejected.type,
        error: { message: 'ERROR!' }
      }
    };
    test('Тест fetchLoginUser[pending]', () => {
      const result = authReducer(initialState, actionsState.pending);
      expect(result.isAuth).toBe(false);
      expect(result.isAuthRequest).toBe(false);
      expect(result.isLoginRequest).toBe(true);
    });
    test('Тест fetchLoginUser[fulfilled]', () => {
      const result = authReducer(initialState, actionsState.fulfilled);
      expect(result.isAuth).toBe(true);
      expect(result.isAuthRequest).toBe(false);
      expect(result.isLoginRequest).toBe(false);
      expect(result.userData).toEqual(actionsState.fulfilled.payload.user);
    });
    test('Тест fetchLoginUser[rejected]', () => {
      const result = authReducer(initialState, actionsState.rejected);
      expect(result.isAuth).toBe(false);
      expect(result.isAuthRequest).toBe(false);
      expect(result.isLoginRequest).toBe(false);
      expect(result.error).toBe(actionsState.rejected.error.message);
    });
  });
  describe('Тест экшена fetchLogoutUser', () => {
    const actionsState = {
      pending: {
        type: fetchLogoutUser.pending.type,
        payload: null
      },
      fulfilled: {
        type: fetchLogoutUser.fulfilled.type,
        payload: null
      },
      rejected: {
        type: fetchLogoutUser.rejected.type,
        error: { message: 'ERROR!' }
      }
    };
    test('Тест fetchLogoutUser[pending]', () => {
      const result = authReducer(initialState, actionsState.pending);
      expect(result.isAuthRequest).toBe(true);
    });
    test('Тест fetchLogoutUser[fulfilled]', () => {
      const result = authReducer(initialState, actionsState.fulfilled);
      expect(result.isAuth).toBe(false);
      expect(result.isAuthRequest).toBe(false);
      expect(result.userData).toEqual(initialState.userData);
    });
    test('Тест fetchLogoutUser[rejected]', () => {
      const result = authReducer(initialState, actionsState.rejected);
      expect(result.isAuthRequest).toBe(true);
      expect(result.error).toBe(actionsState.rejected.error.message);
    });
  });
  describe('Тест экшена fetchUpdateUseInfo', () => {
    const actionsState = {
      pending: {
        type: fetchUpdateUseInfo.pending.type,
        payload: null
      },
      fulfilled: {
        type: fetchUpdateUseInfo.fulfilled.type,
        payload: { user: { name: 'Keke', email: 'keke@gmail.com' } }
      },
      rejected: {
        type: fetchUpdateUseInfo.rejected.type,
        error: { message: 'ERROR!' }
      }
    };
    test('Тест fetchLoginUser[pending]', () => {
      const result = authReducer(initialState, actionsState.pending);
      expect(result.isLoginRequest).toBe(true);
    });
    test('Тест fetchLoginUser[fulfilled]', () => {
      const result = authReducer(initialState, actionsState.fulfilled);
      expect(result.isLoginRequest).toBe(false);
      expect(result.userData).toEqual(actionsState.fulfilled.payload.user);
    });
    test('Тест fetchLoginUser[rejected]', () => {
      const result = authReducer(initialState, actionsState.rejected);
      expect(result.isLoginRequest).toBe(true);
      expect(result.error).toBe(actionsState.rejected.error.message);
    });
  });
});
