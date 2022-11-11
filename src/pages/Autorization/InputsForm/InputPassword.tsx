import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputProps } from '../types';

import styles from '../Authorization.module.scss';
import { useAppSelector } from 'redux/hooks';

export const InputPassword = ({
  values,
  nameElement,
  onChange,
  onClick,
  onMouseDown,
}: InputProps) => {
  const { validateUser } = useAppSelector((state) => state.validate);
  return (
    <FormControl
      sx={{ m: 2, maxWidth: '30ch', width: '90%', paddingBottom: '15px' }}
      variant="outlined"
    >
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        type={validateUser.showPassword ? 'text' : 'password'}
        name={nameElement}
        value={values.password}
        onChange={onChange}
        error={validateUser.errorPassword}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={onClick}
              onMouseDown={onMouseDown}
              edge="end"
            >
              {validateUser.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
      {validateUser.errorPassword && (
        <span className={styles.formError}>Enter valid password abAB@#12</span>
      )}
    </FormControl>
  );
};
