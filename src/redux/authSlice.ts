import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { AuthSuccessfulType } from 'types';

type UserAuthStateType = {
  id: string | null;
  login: string | null;
};

type AuthStateType = {
  token: string | null;
  user: UserAuthStateType;
};

const token = localStorage.getItem('pma_token') || null;

const initialState: AuthStateType = {
  token,
  user: (token && jwt_decode(token)) as UserAuthStateType,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthSuccessfulType>) => {
      state.token = action.payload.token;
      state.user = jwt_decode(action.payload.token);
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
