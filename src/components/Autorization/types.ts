import React from 'react';

export type AuthorizationState = {
  name: string;
  password: string;
  showPassword: boolean;
  login?: string;
};

export type InputProps = {
  values: AuthorizationState;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  nameElement: string;
  onClick?: () => void;
  onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
