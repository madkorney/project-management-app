import {
  RegExpLoginValidation,
  RegExpNameValidation,
  RegExpPasswordValidation,
} from '../../templates/validationConstants';
import { AuthorizationState } from './types';

export const validatePassword = (data: string) => {
  return !RegExpPasswordValidation.test(data);
};

export const validateLogin = (data: string) => {
  return !RegExpLoginValidation.test(data);
};

export const validateReset = (
  name: string,
  value: string,
  values: AuthorizationState,
  setValues: React.Dispatch<React.SetStateAction<AuthorizationState>>
) => {
  if (name === 'password')
    setValues({
      ...values,
      [name]: value,
      errorPassword: false,
    });
  if (name === 'login')
    setValues({
      ...values,
      [name]: value,
      errorLogin: false,
    });
  if (name === 'name')
    setValues({
      ...values,
      [name]: value,
      errorName: false,
    });
};

export const validateName = (data: string) => {
  return !RegExpNameValidation.test(data);
};
