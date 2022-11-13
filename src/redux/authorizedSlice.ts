import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type UserAuthorized = {
  userAuthorized: boolean;
};

export const initialState: UserAuthorized = {
  userAuthorized: localStorage.getItem('pma_token')?.length ? true : false,
};

export const authorizedSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setAuthorized(state: UserAuthorized, action: PayloadAction<boolean>) {
      state.userAuthorized = action.payload;
    },
  },
});

export const { setAuthorized } = authorizedSlice.actions;

export default authorizedSlice.reducer;
