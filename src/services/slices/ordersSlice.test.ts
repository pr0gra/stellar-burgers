import { describe, test, beforeEach, expect } from '@jest/globals';
import {
  fetchOrders,
  createOrder,
  initialState,
  resetOrder,
  ordersReducer
} from './ordersSlice';
import { TOrder } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: 'order1',
    ingredients: ['643d69a5c3f7b9001cfa093c'],
    status: 'done',
    name: 'Готовый заказ',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T01:00:00.000Z',
    number: 101
  },
  {
    _id: 'order2',
    ingredients: ['643d69a5c3f7b9001cfa093d'],
    status: 'pending',
    name: 'Ожидающий заказ',
    createdAt: '2023-01-02T00:00:00.000Z',
    updatedAt: '2023-01-02T01:00:00.000Z',
    number: 102
  }
];

const newOrder: TOrder = {
  _id: 'new-order',
  ingredients: ['643d69a5c3f7b9001cfa093e'],
  status: 'created',
  name: 'Новый заказ',
  createdAt: '2023-01-03T00:00:00.000Z',
  updatedAt: '2023-01-03T01:00:00.000Z',
  number: 103
};

describe('ordersSlice', () => {
  let state = initialState;

  beforeEach(() => {
    state = { ...initialState };
  });

  test('обработка fetchOrders.pending', () => {
    const action = { type: fetchOrders.pending.type };
    const newState = ordersReducer(state, action);
    expect(newState.loading).toBe(true);
    expect(newState.fetchingOrders).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('обработка fetchOrders.fulfilled', () => {
    const action = {
      type: fetchOrders.fulfilled.type,
      payload: mockOrders
    };
    const newState = ordersReducer(state, action);
    expect(newState.loading).toBe(false);
    expect(newState.fetchingOrders).toBe(false);
    expect(newState.items).toEqual(mockOrders);
  });

  test('обработка fetchOrders.rejected', () => {
    const action = {
      type: fetchOrders.rejected.type,
      payload: 'Ошибка при загрузке заказов'
    };
    const newState = ordersReducer(state, action);
    expect(newState.loading).toBe(false);
    expect(newState.fetchingOrders).toBe(false);
    expect(newState.error).toBe('Ошибка при загрузке заказов');
  });

  test('обработка createOrder.pending', () => {
    const action = { type: createOrder.pending.type };
    const newState = ordersReducer(state, action);
    expect(newState.loading).toBe(true);
    expect(newState.creatingOrder).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('обработка createOrder.fulfilled', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: newOrder
    };
    const newState = ordersReducer(state, action);
    expect(newState.loading).toBe(false);
    expect(newState.creatingOrder).toBe(false);
    expect(newState.order).toEqual(newOrder);
  });

  test('обработка createOrder.rejected', () => {
    const action = {
      type: createOrder.rejected.type,
      payload: 'Ошибка при создании заказа'
    };
    const newState = ordersReducer(state, action);
    expect(newState.loading).toBe(false);
    expect(newState.creatingOrder).toBe(false);
    expect(newState.error).toBe('Ошибка при создании заказа');
  });

  test('обработка resetOrder', () => {
    const prefilledState = {
      ...state,
      order: newOrder,
      items: mockOrders
    };
    const action = resetOrder();
    const newState = ordersReducer(prefilledState, action);
    expect(newState.order).toBeNull();
    expect(newState.items).toEqual([]);
  });
});
