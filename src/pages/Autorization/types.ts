import React from 'react';
import { UserSignUpType } from 'types/services';
import { FieldError, UseFormRegister } from 'react-hook-form';

export type FormInputsProps = {
  register: UseFormRegister<UserSignUpType>;
  errors?: FieldError;
  onButtonClick?: () => void;
};

export type InputPasswordProps = FormInputsProps & {
  onClick?: () => void;
  onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
