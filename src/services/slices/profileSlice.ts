import { getUserApi, logoutApi, TRegisterData, updateUserApi } from '@api';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { getCookie } from '../../../src/utils/cookie';

interface ProfileState {
  user: TUser | null;
  loading: boolean;
  error: string | null;
  updateError: string | null;
  isAuthenticated: boolean;
}

export const initialState: ProfileState = {
  user: null,
  loading: false,
  error: null,
  updateError: null,
  isAuthenticated: false
};

export const checkAuth = createAsyncThunk<TUser | null, void>(
  'profile/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = getCookie('accessToken');
      if (!token) {
        return null;
      }
      const response = await getUserApi();
      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'profile/updateUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(userData);
      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk<void, void>(
  'profile/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      localStorage.removeItem('refreshToken');
      document.cookie = 'accessToken=; Max-Age=0';
      return;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfileError: (state) => {
      state.error = null;
      state.updateError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        checkAuth.fulfilled,
        (state, action: PayloadAction<TUser | null>) => {
          state.loading = false;
          state.user = action.payload;
          state.isAuthenticated = !!action.payload;
        }
      )
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      });
  }
});

export const { resetProfileError } = profileSlice.actions;

export const profileSliceReducer = profileSlice.reducer;
