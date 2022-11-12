import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ShowUserPassword = {
  showPassword: boolean;
};

export const initialState: ShowUserPassword = {
  showPassword: false,
};

export const showUserPasswordSlice = createSlice({
  name: 'showUserPassword',
  initialState,
  reducers: {
    setShowPassword(state: ShowUserPassword, action: PayloadAction<boolean>) {
      state.showPassword = action.payload;
    },
  },
});

export const { setShowPassword } = showUserPasswordSlice.actions;

export default showUserPasswordSlice.reducer;
