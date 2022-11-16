import { FormControl, TextField } from '@mui/material';
import { FormInputsProps } from '../types';
import { RegExpLoginValidation } from '../../../constants';

import styles from '../authorization.module.scss';

export const InputLogin = ({ register, errors }: FormInputsProps) => {
  const errorBool = errors !== undefined;
  return (
    <FormControl sx={{ m: 2, maxWidth: '30ch', width: '90%' }} variant="outlined">
      <TextField
        label="Login"
        {...register('login', {
          required: true,
          pattern: RegExpLoginValidation,
          minLength: {
            value: 3,
            message: 'At least 3 characters',
          },
        })}
        error={errorBool}
      />
      {errors && <span className={styles.formError}>Enter valid login</span>}
    </FormControl>
  );
};
