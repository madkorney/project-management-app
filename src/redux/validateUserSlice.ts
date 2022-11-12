import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserSignUpType } from '../types';

export type UserValidate = UserSignUpType & {
  showPassword: boolean;
};

type UserCheckValidate = {
  validateUser: UserValidate;
};

export const initialState: UserCheckValidate = {
  validateUser: {
    name: '',
    login: '',
    password: '',
    showPassword: false,
  },
};

export const validateUserSlice = createSlice({
  name: 'validateUser',
  initialState,
  reducers: {
    setShowPassword(state: UserCheckValidate, action: PayloadAction<boolean>) {
      state.validateUser.showPassword = action.payload;
    },
    setUserPassword(state: UserCheckValidate, action: PayloadAction<string>) {
      state.validateUser.password = action.payload;
    },
    setUserName(state: UserCheckValidate, action: PayloadAction<string>) {
      state.validateUser.name = action.payload;
    },
    setUserLogin(state: UserCheckValidate, action: PayloadAction<string>) {
      state.validateUser.login = action.payload;
    },
  },
});

export const { setShowPassword, setUserPassword, setUserName, setUserLogin } =
  validateUserSlice.actions;

export default validateUserSlice.reducer;
