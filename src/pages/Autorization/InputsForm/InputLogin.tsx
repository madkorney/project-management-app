import { FormControl, TextField } from '@mui/material';
import { FormInputsProps } from '../types';
import { RegExpLoginValidation } from '../../../templates/validationConstants';

import styles from '../Authorization.module.scss';

export const InputLogin = ({ register, errors }: FormInputsProps) => {
  let errorBool: boolean;
  errors !== undefined ? (errorBool = true) : (errorBool = false);
  return (
    <FormControl sx={{ m: 2, maxWidth: '30ch', width: '90%' }} variant="outlined">
      <TextField
        label="login"
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
