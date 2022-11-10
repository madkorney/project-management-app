import {
  RegExpLoginValidation,
  RegExpNameValidation,
  RegExpPasswordValidation,
} from '../../templates/validationConstants';

export const validatePassword = (data: string) => {
  return !RegExpPasswordValidation.test(data);
};

export const validateLogin = (data: string) => {
  return !RegExpLoginValidation.test(data);
};

export const validateName = (data: string) => {
  return !RegExpNameValidation.test(data);
};
