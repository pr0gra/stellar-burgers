import { describe, test, beforeEach, expect } from '@jest/globals';
import {
  checkAuth,
  updateUser,
  logout,
  resetProfileError,
  initialState,
  profileSliceReducer
} from './profileSlice';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

describe('profileSlice', () => {
  let state = initialState;

  beforeEach(() => {
    state = { ...initialState };
  });

  test('обработка checkAuth.pending', () => {
    const action = { type: checkAuth.pending.type };
    const newState = profileSliceReducer(state, action);
    expect(newState.loading).toBe(true);
  });

  test('обработка checkAuth.fulfilled с авторизованным пользователем', () => {
    const action = { type: checkAuth.fulfilled.type, payload: mockUser };
    const newState = profileSliceReducer(state, action);
    expect(newState.loading).toBe(false);
    expect(newState.user).toEqual(mockUser);
    expect(newState.isAuthenticated).toBe(true);
  });

  test('обработка checkAuth.fulfilled с null (неавторизован)', () => {
    const action = { type: checkAuth.fulfilled.type, payload: null };
    const newState = profileSliceReducer(state, action);
    expect(newState.loading).toBe(false);
    expect(newState.user).toBeNull();
    expect(newState.isAuthenticated).toBe(false);
  });

  test('обработка checkAuth.rejected', () => {
    const action = { type: checkAuth.rejected.type };
    const newState = profileSliceReducer(state, action);
    expect(newState.loading).toBe(false);
    expect(newState.isAuthenticated).toBe(false);
  });
  test('обработка logout.fulfilled', () => {
    const prefilledState = {
      ...state,
      user: mockUser,
      isAuthenticated: true
    };
    const action = { type: logout.fulfilled.type };
    const newState = profileSliceReducer(prefilledState, action);
    expect(newState).toEqual(prefilledState);
  });

  test('обработка resetProfileError', () => {
    const prefilledState = {
      ...state,
      error: 'Ошибка входа',
      updateError: 'Ошибка обновления'
    };
    const action = resetProfileError();
    const newState = profileSliceReducer(prefilledState, action);
    expect(newState.error).toBeNull();
    expect(newState.updateError).toBeNull();
  });
});
