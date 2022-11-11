import React from 'react';
import { UserSignUpType } from 'types/services';

export type InputProps = {
  values: UserSignUpType;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  nameElement: string;
  onClick?: () => void;
  onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
