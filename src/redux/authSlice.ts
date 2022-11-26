import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { isExpired, decodeToken } from 'react-jwt';

import { AuthSuccessfulType } from 'types';

type UserAuthStateType = {
  id: string;
  login: string;
};

type AuthStateType = {
  isOpenUserPage: boolean;
  isAuthorized: boolean;
  token: string | null;
  user: UserAuthStateType | null;
};

const token = localStorage.getItem('pma_token') || null;

const isTokenExpired = isExpired(token as string);

const initialState: AuthStateType = isTokenExpired
  ? {
      isOpenUserPage: false,
      isAuthorized: false,
      token: null,
      user: null,
    }
  : {
      isOpenUserPage: false,
      isAuthorized: !!token,
      token,
      user: (token && decodeToken(token)) as UserAuthStateType,
    };

isTokenExpired && localStorage.removeItem('pma_token');

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthSuccessfulType>) => {
      state.isAuthorized = true;
      state.token = action.payload.token;
      state.user = decodeToken(action.payload.token) as UserAuthStateType;
    },
    logOut: (state) => {
      state.isAuthorized = false;
      state.token = null;
      state.user = null;
      state.isOpenUserPage = false;
    },
    setOpenUserPage: (state, action: PayloadAction<boolean>) => {
      state.isOpenUserPage = action.payload;
    },
  },
});

export const { setCredentials, logOut, setOpenUserPage } = authSlice.actions;

export default authSlice.reducer;
