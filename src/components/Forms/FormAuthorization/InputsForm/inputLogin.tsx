import { useTranslation } from 'react-i18next';

import { FormControl, TextField } from '@mui/material';

import { FormInputsProps } from '../types';
import { REGEXP_LOGIN_VALID_CHARACTERS } from 'data/constants';

export const InputLogin = ({ register, errors }: FormInputsProps) => {
  const { t } = useTranslation();
  const isError = !!errors;

  return (
    <FormControl sx={{ m: 1, maxWidth: '30ch', width: '90%' }} variant="outlined">
      <TextField
        label={t('inputs.login')}
        {...register('login', {
          required: { value: true, message: t('validate.login.required') },
          minLength: {
            value: 3,
            message: t('validate.login.minLength'),
          },
          validate: {
            shouldStartFromLetter: (login) =>
              new RegExp(/[a-zA-Z0-9]/).test(login[0]) || `${t('validate.login.firstLetter')}`,
            containOnlyValidCharacters: (login) =>
              REGEXP_LOGIN_VALID_CHARACTERS.test(login) || `${t('validate.login.validChars')}`,
          },
        })}
        error={isError}
        helperText={errors ? `${t('inputs.login')} ${errors.message}` : ' '}
      />
    </FormControl>
  );
};
