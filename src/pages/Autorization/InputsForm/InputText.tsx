import { FormControl, TextField } from '@mui/material';
import { InputProps } from '../types';
import styles from '../Authorization.module.scss';
import { useAppSelector } from 'redux/hooks';

export const InputText = ({ values, onChange, nameElement }: InputProps) => {
  const { validateUser } = useAppSelector((state) => state.validate);
  return (
    <FormControl sx={{ m: 2, maxWidth: '30ch', width: '90%' }} variant="outlined">
      <TextField
        label={nameElement}
        value={nameElement === 'name' ? values.name : values.login}
        name={nameElement}
        onChange={onChange}
        error={nameElement === 'login' ? validateUser.errorLogin : validateUser.errorName}
      />
      {nameElement === 'login'
        ? validateUser.errorLogin && (
            <span className={styles.formError}>Enter valid Login(word, number)</span>
          )
        : validateUser.errorName && (
            <span className={styles.formError}>Enter valid Name(max one space)</span>
          )}
    </FormControl>
  );
};
