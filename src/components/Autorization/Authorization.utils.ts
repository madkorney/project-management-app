import {
  RegExpLoginValidation,
  RegExpPasswordValidation,
} from '../../templates/validationConstants';

export const validatePassword = (data: string) => {
  return !RegExpPasswordValidation.test(data);
};

export const validateLogin = (data: string) => {
  return !RegExpLoginValidation.test(data);
};
