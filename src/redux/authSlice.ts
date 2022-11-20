import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { AuthSuccessfulType } from 'types';

type UserAuthStateType = {
  id: string | null;
  login: string | null;
};

type AuthStateType = {
  isOpenUserPage: boolean;
  isAuthorized: boolean;
  token: string | null;
  user: UserAuthStateType;
};

const token = localStorage.getItem('pma_token') || null;

const initialState: AuthStateType = {
  isOpenUserPage: false,
  isAuthorized: !!token,
  token,
  user: (token && jwt_decode(token)) as UserAuthStateType,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthSuccessfulType>) => {
      state.isAuthorized = true;
      state.token = action.payload.token;
      state.user = jwt_decode(action.payload.token);
    },
    logOut: (state) => {
      state.isAuthorized = false;
      state.token = null;
      state.user = { id: null, login: null };
    },
    setOpenUserPage: (state, action: PayloadAction<boolean>) => {
      state.isOpenUserPage = action.payload;
    },
  },
});

export const { setCredentials, logOut, setOpenUserPage } = authSlice.actions;

export default authSlice.reducer;
