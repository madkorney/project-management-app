import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React from 'react';
import { InputProps } from '../types';

export const InputPassword = ({
  values,
  nameElement,
  onChange,
  onClick,
  onMouseDown,
}: InputProps) => {
  return (
    <FormControl sx={{ m: 2, maxWidth: '30ch', width: '90%' }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        type={values.showPassword ? 'text' : 'password'}
        name={nameElement}
        value={values.password}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={onClick}
              onMouseDown={onMouseDown}
              edge="end"
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
};
