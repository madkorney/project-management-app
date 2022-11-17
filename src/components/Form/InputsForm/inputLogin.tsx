import { FormControl, TextField } from '@mui/material';
import { FormInputsProps } from '../types';
import { REGEXP_LOGIN_VALID_CHARACTERS } from 'data/constants';

import styles from 'global-styles/authorization.module.scss';

export const InputLogin = ({ register, errors }: FormInputsProps) => {
  const isError = !!errors;

  return (
    <FormControl sx={{ m: 2, maxWidth: '30ch', width: '90%' }} variant="outlined">
      <TextField
        label="Login"
        {...register('login', {
          required: { value: true, message: 'cannot be empty' },
          minLength: {
            value: 3,
            message: 'must be at least 3 characters',
          },
          validate: {
            shouldStartFromLetter: (login) =>
              new RegExp(/[a-zA-Z0-9]/).test(login[0]) || 'should begin from letter or digit',
            containOnlyValidCharacters: (login) =>
              REGEXP_LOGIN_VALID_CHARACTERS.test(login) ||
              'can contain only latin letters, digits and underscore',
          },
        })}
        error={isError}
      />
      {errors && <span className={styles.formError}>Login {errors.message}</span>}
    </FormControl>
  );
};
