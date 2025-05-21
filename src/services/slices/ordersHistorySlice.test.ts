import { describe, test, beforeEach, expect } from '@jest/globals';
import {
  fetchOrdersHistory,
  initialState,
  ordersHistoryReducer
} from './ordersHistorySlice';
import { TOrder } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: 'order1',
    ingredients: ['643d69a5c3f7b9001cfa093c'],
    status: 'done',
    name: 'Первый заказ',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T01:00:00.000Z',
    number: 1001
  },
  {
    _id: 'order2',
    ingredients: ['643d69a5c3f7b9001cfa093d'],
    status: 'pending',
    name: 'Второй заказ',
    createdAt: '2023-01-02T00:00:00.000Z',
    updatedAt: '2023-01-02T01:00:00.000Z',
    number: 1002
  }
];

describe('ordersHistorySlice', () => {
  let state = initialState;

  beforeEach(() => {
    state = { ...initialState };
  });

  test('обработка fetchOrdersHistory.pending', () => {
    const action = { type: fetchOrdersHistory.pending.type };
    const newState = ordersHistoryReducer(state, action);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('обработка fetchOrdersHistory.fulfilled', () => {
    const action = {
      type: fetchOrdersHistory.fulfilled.type,
      payload: mockOrders
    };
    const newState = ordersHistoryReducer(state, action);
    expect(newState.loading).toBe(false);
    expect(newState.orders).toEqual(mockOrders);
  });

  test('обработка fetchOrdersHistory.rejected', () => {
    const action = {
      type: fetchOrdersHistory.rejected.type,
      payload: 'Ошибка получения истории заказов'
    };
    const newState = ordersHistoryReducer(state, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('Ошибка получения истории заказов');
  });
});
