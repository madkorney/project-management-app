import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputProps } from '../types';

import styles from '../Authorization.module.scss';

export const InputPassword = ({
  values,
  nameElement,
  onChange,
  onClick,
  onMouseDown,
  error,
}: InputProps) => {
  return (
    <FormControl
      sx={{ m: 2, maxWidth: '30ch', width: '90%', paddingBottom: '15px' }}
      variant="outlined"
    >
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        type={values.showPassword ? 'text' : 'password'}
        name={nameElement}
        value={values.password}
        onChange={onChange}
        error={error}
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
      {values.errorPassword && (
        <span className={styles.formError}>Enter valid password abc!@#123ABC</span>
      )}
    </FormControl>
  );
};
