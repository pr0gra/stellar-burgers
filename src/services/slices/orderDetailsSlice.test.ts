import { describe, test, beforeEach, expect } from '@jest/globals';
import {
  fetchOrderDetails,
  initialState,
  orderDetailsReducer
} from './orderDetailsSlice';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
  _id: 'order123',
  ingredients: ['643d69a5c3f7b9001cfa093c'],
  status: 'done',
  name: 'Тестовый заказ',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T01:00:00.000Z',
  number: 12345
};

describe('orderDetailsSlice', () => {
  let state = initialState;

  beforeEach(() => {
    state = { ...initialState };
  });

  test('обработка fetchOrderDetails.pending', () => {
    const action = { type: fetchOrderDetails.pending.type };
    const newState = orderDetailsReducer(state, action);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('обработка fetchOrderDetails.fulfilled', () => {
    const action = {
      type: fetchOrderDetails.fulfilled.type,
      payload: mockOrder
    };
    const newState = orderDetailsReducer(state, action);
    expect(newState.loading).toBe(false);
    expect(newState.orderData).toEqual(mockOrder);
  });

  test('обработка fetchOrderDetails.rejected', () => {
    const action = {
      type: fetchOrderDetails.rejected.type,
      payload: 'Ошибка при получении данных заказа'
    };
    const newState = orderDetailsReducer(state, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('Ошибка при получении данных заказа');
  });
});
