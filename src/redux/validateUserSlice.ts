import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserSignUpType } from '../types';

export type UserValidate = UserSignUpType & {
  showPassword: boolean;
  errorPassword: boolean;
  errorName: boolean;
  errorLogin: boolean;
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
    errorPassword: false,
    errorLogin: false,
    errorName: false,
  },
};

export const validateUserSlice = createSlice({
  name: 'validateUser',
  initialState,
  reducers: {
    setValidatePassword(state: UserCheckValidate, action: PayloadAction<boolean>) {
      state.validateUser.errorPassword = action.payload;
    },
    setValidateLogin(state: UserCheckValidate, action: PayloadAction<boolean>) {
      state.validateUser.errorLogin = action.payload;
    },
    setValidateName(state: UserCheckValidate, action: PayloadAction<boolean>) {
      state.validateUser.errorName = action.payload;
    },
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

export const {
  setValidatePassword,
  setValidateName,
  setValidateLogin,
  setShowPassword,
  setUserPassword,
  setUserName,
  setUserLogin,
} = validateUserSlice.actions;

export default validateUserSlice.reducer;
