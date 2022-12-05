import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

import { UserSignUpType } from 'types/services';

export type FormInputsProps = {
  register: UseFormRegister<UserSignUpType>;
  errors?: FieldError;
  onButtonClick?: () => void;
};

export type InputPasswordProps = FormInputsProps & {
  showPassword: boolean;
  onClick?: () => void;
  onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
