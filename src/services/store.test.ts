import store from './store';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { initialState as BurgerConstructorInitialState } from './slices/burgerConstructorSlice';
import { initialState as IngredientsSliceInitialState } from './slices/ingredientsSlice';
import { initialState as OrdersSliceInitialState } from './slices/ordersSlice';
import { initialState as ProfileSliceInitialState } from './slices/profileSlice';
import { initialState as OrderDetailsSliceInitialState } from './slices/orderDetailsSlice';
import { initialState as ordersHistorySliceInitialState } from './slices/ordersHistorySlice';

import { ordersReducer } from './slices/ordersSlice';
import burgerConstructorSlice from './slices/burgerConstructorSlice';
import { profileSliceReducer } from './slices/profileSlice';
import { ordersHistoryReducer } from './slices/ordersHistorySlice';
import { orderDetailsReducer } from './slices/orderDetailsSlice';

describe('rootReducer Initialization', () => {
  it('initial state', () => {
    const initialState = store.getState();
    expect(initialState).toEqual({
      ingredients: IngredientsSliceInitialState,
      orders: OrdersSliceInitialState,
      burgerConstructor: BurgerConstructorInitialState,
      profile: ProfileSliceInitialState,
      ordersHistory: ordersHistorySliceInitialState,
      orderDetails: OrderDetailsSliceInitialState
    });
  });
});
