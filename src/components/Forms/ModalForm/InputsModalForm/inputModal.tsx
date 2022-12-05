import { FieldError, UseFormRegister } from 'react-hook-form';

import { TextField } from '@mui/material';
import { FormPropsType } from 'types';

type InputModalProps = {
  register: UseFormRegister<FormPropsType>;
  label: 'title' | 'description';
  type: 'Board' | 'Column' | 'Task';
  value: string;
  errors?: FieldError;
};

export const InputModal = ({ register, errors, label, type, value }: InputModalProps) => (
  <TextField
    autoFocus={label === 'title'}
    margin="dense"
    multiline={label !== 'title'}
    rows={label === 'title' ? 1 : 3}
    id={label}
    label={`${type} ${label}`}
    error={!!errors}
    helperText={errors?.message || ' '}
    defaultValue={value}
    fullWidth
    {...register(label, {
      required: {
        value: true,
        message: `${label.replace(label[0], label[0].toUpperCase())} cannot be empty`,
      },
      minLength: {
        value: label === 'title' ? 5 : 20,
        message: `Please write more detailed ${label}`,
      },
    })}
  />
);
