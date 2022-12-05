import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputPasswordProps } from '../types';
import {
  MIN_PASSWORD_LENGTH,
  REGEXP_SPECIAL_CHARACTERS,
  REGEXP_PASSWORD_VALID_CHARACTERS,
} from 'data/constants';

import styles from '../authorization.module.scss';

export const InputPassword = ({
  errors,
  register,
  onClick,
  onMouseDown,
  showPassword,
}: InputPasswordProps) => {
  const isError = !!errors;

  return (
    <FormControl sx={{ m: 1, maxWidth: '30ch', width: '90%' }} variant="outlined">
      {isError ? (
        <InputLabel sx={{ color: 'red' }} htmlFor="outlined-adornment-password">
          Password
        </InputLabel>
      ) : (
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      )}
      <OutlinedInput
        label="Password"
        type={showPassword ? 'text' : 'password'}
        error={isError}
        {...register('password', {
          required: { value: true, message: 'cannot be empty' },
          minLength: {
            value: MIN_PASSWORD_LENGTH,
            message: `must be at least ${MIN_PASSWORD_LENGTH} characters`,
          },
          validate: {
            onlyValidSymbols: (pass) =>
              REGEXP_PASSWORD_VALID_CHARACTERS.test(pass) || 'contains non-valid symbol',
            atLeastOneDigit: (pass) =>
              new RegExp(/\d/).test(pass) || 'should contain at least one digit',
            atLeastOneLowerCaseLetter: (pass) =>
              new RegExp(/[a-z]/).test(pass) || 'should contain at least one lowercase letter',
            atLeastOneUpperCaseLetter: (pass) =>
              new RegExp(/[A-Z]/).test(pass) || 'should contain at least one capital letter',
            atLeastOneSpecialCharacter: (pass) =>
              REGEXP_SPECIAL_CHARACTERS.test(pass) ||
              'should contain at least one special character',
          },
        })}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={onClick}
              onMouseDown={onMouseDown}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {errors ? (
        <span className={styles.formError}>Password {errors.message}</span>
      ) : (
        <span className={styles.formError}> </span>
      )}
    </FormControl>
  );
};
