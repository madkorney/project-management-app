import {
  RegExpLoginValidation,
  RegExpNameValidation,
  RegExpPasswordValidation,
} from '../../templates/validationConstants';

import {
  setValidateLogin,
  setValidatePassword,
  setValidateName,
} from '../../redux/validateUserSlice';
import { Dispatch } from '@reduxjs/toolkit';

export const validatePassword = (data: string, dispatch: Dispatch) => {
  dispatch(setValidatePassword(!RegExpPasswordValidation.test(data)));
};

export const validateLogin = (data: string, dispatch: Dispatch) => {
  console.log(!RegExpLoginValidation.test(data), 'login');
  dispatch(setValidateLogin(!RegExpLoginValidation.test(data)));
};

export const validateName = (data: string, dispatch: Dispatch) => {
  dispatch(setValidateName(!RegExpNameValidation.test(data)));
};

export const resetError = (data: string, dispatch: Dispatch) => {
  switch (data) {
    case 'password':
      dispatch(setValidatePassword(false));
      return;
    case 'name':
      dispatch(setValidateName(false));
      return;
    case 'login':
      dispatch(setValidateLogin(false));
      return;
  }
};
