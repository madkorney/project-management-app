import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

type UserAuthStateType = {
  id: string | null;
  login: string | null;
};

type AuthStateType = {
  token: string | null;
  user: UserAuthStateType;
};

const token = localStorage.getItem('pma_token') || null;

const initialState = {
  token,
  user: (token && jwt_decode(token)) as UserAuthStateType,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthStateType>) => {
      state = action.payload;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
