import { FormControl, TextField } from '@mui/material';
import React from 'react';
import { InputProps } from '../types';

export const InputText = ({ values, onChange, nameElement, error }: InputProps) => {
  return (
    <FormControl sx={{ m: 2, maxWidth: '30ch', width: '90%' }} variant="outlined">
      <TextField
        label={nameElement}
        value={nameElement === 'name' ? values.name : values.login}
        name={nameElement}
        onChange={onChange}
        error={error}
      />
    </FormControl>
  );
};
