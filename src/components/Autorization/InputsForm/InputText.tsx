import { FormControl, TextField } from '@mui/material';
import React from 'react';
import { InputProps } from '../types';
import styles from '../Authorization.module.scss';

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
      {nameElement === 'login'
        ? values.errorLogin && (
            <span className={styles.formError}>Enter valid Login(word, number)</span>
          )
        : values.errorName && (
            <span className={styles.formError}>Enter valid Name(max one space)</span>
          )}
    </FormControl>
  );
};
