import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputPasswordProps } from '../types';

import styles from '../Authorization.module.scss';
import { useAppSelector } from 'redux/hooks';
import { RegExpPasswordValidation } from '../../../templates/validationConstants';

export const InputPassword = ({ errors, register, onClick, onMouseDown }: InputPasswordProps) => {
  let errorBool: boolean;
  errors !== undefined ? (errorBool = true) : (errorBool = false);
  const { showPassword } = useAppSelector((state) => state.password);
  return (
    <FormControl
      sx={{ m: 2, maxWidth: '30ch', width: '90%', paddingBottom: '15px' }}
      variant="outlined"
    >
      {errorBool ? (
        <InputLabel sx={{ color: 'red' }} htmlFor="outlined-adornment-password">
          Password
        </InputLabel>
      ) : (
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      )}
      <OutlinedInput
        label="Password"
        type={showPassword ? 'text' : 'password'}
        error={errorBool}
        {...register('password', {
          required: true,
          pattern: RegExpPasswordValidation,
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
      {errors && <span className={styles.formError}>Enter valid password abAB@#12</span>}
    </FormControl>
  );
};
