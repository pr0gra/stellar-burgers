import { getOrderByNumberApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderDetailsState = {
  orderData: TOrder | null;
  loading: boolean;
  error: string | null;
};

const initialState: TOrderDetailsState = {
  orderData: null,
  loading: false,
  error: null
};

export const fetchOrderDetails = createAsyncThunk(
  'orderDetails/fetchOrderDetails',
  async (orderNumber: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(orderNumber);
      return response.orders[0];
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, { payload }) => {
        state.orderData = payload;
        state.loading = false;
      })
      .addCase(fetchOrderDetails.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.loading = false;
      });
  }
});

export const orderDetailsReducer = orderDetailsSlice.reducer;
