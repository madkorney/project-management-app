import { FormControl, TextField } from '@mui/material';
import { FormInputsProps } from '../types';
import { REGEXP_NAME_VALID_CHARACTERS } from 'data/constants';

export const InputName = ({ register, errors }: FormInputsProps) => {
  const isError = !!errors;

  return (
    <FormControl sx={{ m: 1, maxWidth: '30ch', width: '90%' }} variant="outlined">
      <TextField
        label="Name"
        {...register('name', {
          required: { value: true, message: 'cannot be empty' },
          minLength: {
            value: 2,
            message: 'must be at least 2 characters',
          },
          validate: {
            containOnlyValidCharacters: (login) =>
              REGEXP_NAME_VALID_CHARACTERS.test(login) ||
              'can contain only latin letters, space and dash',
            shouldStartFromLetter: (name) =>
              new RegExp(/[А-ЯЁа-яёA-Za-z]/).test(name[0]) || 'should begin with letter',
            shouldEndFromLetter: (name) =>
              new RegExp(/[А-ЯЁа-яёA-Za-z]/).test(name[name.length - 1]) ||
              'should end with letter',
          },
        })}
        error={isError}
        helperText={errors ? `Name ${errors.message}` : ' '}
      />
    </FormControl>
  );
};
