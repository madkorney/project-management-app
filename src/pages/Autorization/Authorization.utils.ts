import { Dispatch } from '@reduxjs/toolkit';

import {
  RegExpLoginValidation,
  RegExpNameValidation,
  RegExpPasswordValidation,
} from '../../templates/validationConstants';
import {
  setValidateLogin,
  setValidatePassword,
  setValidateName,
  setUserPassword,
  UserValidate,
  setUserLogin,
  setUserName,
} from '../../redux/validateUserSlice';

export const validatePassword = (data: string, dispatch: Dispatch, validateUser: UserValidate) => {
  validateUser.errorPassword !== !RegExpPasswordValidation.test(data) &&
    dispatch(setValidatePassword(!RegExpPasswordValidation.test(data)));
  data !== validateUser.password && dispatch(setUserPassword(data));
};

export const validateLogin = (data: string, dispatch: Dispatch, validateUser: UserValidate) => {
  validateUser.errorLogin !== !RegExpLoginValidation.test(data) &&
    dispatch(setValidateLogin(!RegExpLoginValidation.test(data)));
  data !== validateUser.login && dispatch(setUserLogin(data));
};

export const validateName = (data: string, dispatch: Dispatch, validateUser: UserValidate) => {
  validateUser.errorName !== !RegExpNameValidation.test(data) &&
    dispatch(setValidateName(!RegExpNameValidation.test(data)));
  data !== validateUser.name && dispatch(setUserName(data));
};

export const resetError = (data: string, dispatch: Dispatch, validateUser: UserValidate) => {
  if (data === 'name') validateUser.errorName && dispatch(setValidateName(false));
  if (data === 'login') validateUser.errorLogin && dispatch(setValidateLogin(false));
  if (data === 'password') validateUser.errorPassword && dispatch(setValidatePassword(false));
};
