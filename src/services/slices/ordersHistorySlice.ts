import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrdersHistoryState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
};

export const initialState: TOrdersHistoryState = {
  orders: [],
  loading: false,
  error: null
};

export const fetchOrdersHistory = createAsyncThunk(
  'ordersHistory/fetchOrdersHistory',
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getOrdersApi();
      return orders;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const ordersHistorySlice = createSlice({
  name: 'ordersHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersHistory.fulfilled, (state, { payload }) => {
        state.orders = payload;
        state.loading = false;
      })
      .addCase(fetchOrdersHistory.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  }
});

export const ordersHistoryReducer = ordersHistorySlice.reducer;
