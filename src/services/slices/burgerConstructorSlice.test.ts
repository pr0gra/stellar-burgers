import { describe, test } from '@jest/globals';
import {
  addIngredient,
  initialState,
  moveIngredientDown,
  removeIngredient,
  BurgerConstructorState
} from './burgerConstructorSlice';
import BurgerConstructorReducer from './burgerConstructorSlice';

const initialIngredient = {
  _id: '643d69a5c3f7b9001cfa0948',
  name: 'Кристаллы марсианских альфа-сахаридов',
  type: 'main',
  proteins: 234,
  fat: 432,
  carbohydrates: 111,
  calories: 189,
  price: 762,
  image: 'https://code.s3.yandex.net/react/code/core.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/core-large.png'
};

const initialIngredient2 = {
  ...initialIngredient,
  _id: '643d69a5c3f7b9001cfa0949'
};

describe('BurgerConstructorSlice', () => {
  let state: BurgerConstructorState;

  beforeEach(() => {
    state = initialState;
  });

  test('обработку экшена добавления ингредиента', () => {
    const addIngredientAction = addIngredient(initialIngredient);
    state = BurgerConstructorReducer(state, addIngredientAction);
    console.log(state);
    expect(state.ingredients[0]._id).toEqual(initialIngredient._id);
  });

  test('обработку экшена удаления ингредиента', () => {
    const addIngredientAction = addIngredient(initialIngredient);
    state = BurgerConstructorReducer(state, addIngredientAction);

    const action = removeIngredient(state.ingredients[0]._id);
    state = BurgerConstructorReducer(state, action);
    expect(state.ingredients).toEqual([]);
  });
  describe('обработку экшена изменения порядка ингредиентов в начинке', () => {
    state = BurgerConstructorReducer(state, addIngredient(initialIngredient));
    state = BurgerConstructorReducer(state, addIngredient(initialIngredient2));

    test('Перемещение ингредиента вниз работает корректно', () => {
      const action = moveIngredientDown(state.ingredients[0]._id);
      state = BurgerConstructorReducer(state, action);
      expect(state.ingredients[1]._id).toEqual(initialIngredient._id);
      expect(state.ingredients[0]._id).toEqual(initialIngredient2._id);
    });
  });
});
