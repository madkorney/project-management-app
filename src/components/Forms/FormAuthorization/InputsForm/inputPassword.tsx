import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const isError = !!errors;

  return (
    <FormControl sx={{ m: 1, maxWidth: '30ch', width: '90%' }} variant="outlined">
      <InputLabel
        sx={{ color: isError ? '#d32f2f' : 'initial' }}
        htmlFor="outlined-adornment-password"
      >
        {t('inputs.password')}
      </InputLabel>
      <OutlinedInput
        label={t('inputs.password')}
        type={showPassword ? 'text' : 'password'}
        error={isError}
        {...register('password', {
          required: { value: true, message: t('validate.password.required') },
          minLength: {
            value: MIN_PASSWORD_LENGTH,
            message: t('validate.password.minLength', { minPasswordLength: MIN_PASSWORD_LENGTH }),
          },
          validate: {
            onlyValidSymbols: (pass) =>
              REGEXP_PASSWORD_VALID_CHARACTERS.test(pass) || `${t('validate.password.validChars')}`,
            atLeastOneDigit: (pass) =>
              new RegExp(/\d/).test(pass) || `${t('validate.password.oneDigit')}`,
            atLeastOneLowerCaseLetter: (pass) =>
              new RegExp(/[a-z]/).test(pass) || `${t('validate.password.oneLowercase')}`,
            atLeastOneUpperCaseLetter: (pass) =>
              new RegExp(/[A-Z]/).test(pass) || `${t('validate.password.oneUppercase')}`,
            atLeastOneSpecialCharacter: (pass) =>
              REGEXP_SPECIAL_CHARACTERS.test(pass) || `${t('validate.password.oneSpecialChar')}`,
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
        <span className={styles.formError}>
          {t('inputs.password')} {errors.message}
        </span>
      ) : (
        <span className={styles.formError}> </span>
      )}
    </FormControl>
  );
};
