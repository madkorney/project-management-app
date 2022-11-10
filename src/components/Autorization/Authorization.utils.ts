import { RegExpPasswordValidation } from '../../templates/validationConstants';

export const validatePassword = (data: string) => {
  return !RegExpPasswordValidation.test(data);
};
