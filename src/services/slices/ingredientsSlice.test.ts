import { describe, test, beforeEach, expect } from '@jest/globals';
import { fetchIngredients, ingredientsReducer, initialState } from './ingredientsSlice';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Тестовый ингредиент',
    type: 'main',
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 200,
    price: 100,
    image: 'test.jpg',
    image_mobile: 'test_mobile.jpg',
    image_large: 'test_large.jpg'
  }
];

describe('ingredientsSlice', () => {
  let state = initialState;

  beforeEach(() => {
    state = { ...initialState };
  });

  test('обработка fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const newState = ingredientsReducer(state, action);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('обработка fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const newState = ingredientsReducer(state, action);
    expect(newState.loading).toBe(false);
    expect(newState.items).toEqual(mockIngredients);
  });

  test('обработка fetchIngredients.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      payload: 'Ошибка загрузки'
    };
    const newState = ingredientsReducer(state, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('Ошибка загрузки');
  });
});
