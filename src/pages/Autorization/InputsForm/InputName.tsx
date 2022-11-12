import { FormControl, TextField } from '@mui/material';
import { FormInputsProps } from '../types';
import styles from '../Authorization.module.scss';
import { RegExpNameValidation } from '../../../templates/validationConstants';

export const InputName = ({ register, errors }: FormInputsProps) => {
  let errorBool: boolean;
  errors !== undefined ? (errorBool = true) : (errorBool = false);
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
