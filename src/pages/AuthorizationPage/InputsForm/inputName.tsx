import { FormControl, TextField } from '@mui/material';
import { FormInputsProps } from '../types';

import { RegExpNameValidation } from '../../../constants';

import styles from '../authorization.module.scss';

export const InputName = ({ register, errors }: FormInputsProps) => {
  const errorBool = errors !== undefined;
  return (
    <FormControl sx={{ m: 2, maxWidth: '30ch', width: '90%' }} variant="outlined">
      <TextField
        label="name"
        {...register('name', {
          required: true,
          pattern: RegExpNameValidation,
        })}
        error={errorBool}
      />
      {errors && <span className={styles.formError}>Enter valid name</span>}
    </FormControl>
  );
};
