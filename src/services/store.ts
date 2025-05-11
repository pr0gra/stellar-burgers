import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredientsSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ordersReducer } from './slices/ordersSlice';
import burgerConstructorSlice from './slices/burgerConstructorSlice';
import { profileSliceReducer } from './slices/profileSlice';
import { ordersHistoryReducer } from './slices/ordersHistorySlice';
import { orderDetailsReducer } from './slices/orderDetailsSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orders: ordersReducer,
  burgerConstructor: burgerConstructorSlice,
  profile: profileSliceReducer,
  ordersHistory: ordersHistoryReducer,
  orderDetails: orderDetailsReducer
});

const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
