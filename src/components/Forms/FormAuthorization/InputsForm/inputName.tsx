import { useTranslation } from 'react-i18next';

import { FormControl, TextField } from '@mui/material';

import { FormInputsProps } from '../types';
import { REGEXP_NAME_VALID_CHARACTERS } from 'data/constants';

export const InputName = ({ register, errors }: FormInputsProps) => {
  const { t } = useTranslation();
  const isError = !!errors;

  return (
    <FormControl sx={{ m: 1, maxWidth: '30ch', width: '90%' }} variant="outlined">
      <TextField
        label={t('inputs.name')}
        autoFocus
        {...register('name', {
          required: { value: true, message: t('validate.name.required') },
          minLength: {
            value: 2,
            message: t('validate.name.minLength'),
          },
          validate: {
            containOnlyValidCharacters: (name) =>
              REGEXP_NAME_VALID_CHARACTERS.test(name) || `${t('validate.name.validChars')}`,
            shouldStartFromLetter: (name) =>
              new RegExp(/[А-ЯЁA-Z]/).test(name[0]) || `${t('validate.name.firstLetter')}`,
            shouldEndFromLetter: (name) =>
              new RegExp(/[А-ЯЁа-яёA-Za-z]/).test(name[name.length - 1]) ||
              `${t('validate.name.lastLetter')}`,
          },
        })}
        error={isError}
        helperText={errors ? `${t('inputs.name')} ${errors.message}` : ' '}
      />
    </FormControl>
  );
};
