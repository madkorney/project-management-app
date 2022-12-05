import { FieldError, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TextField } from '@mui/material';

import { FormPropsType } from 'types';
import { useAppSelector } from 'redux/hooks';

type InputModalProps = {
  register: UseFormRegister<FormPropsType>;
  label: 'title' | 'description';
  type: 'Board' | 'Column' | 'Task';
  value: string;
  errors?: FieldError;
};

const InputModal = ({ register, errors, label, type, value }: InputModalProps) => {
  const { t } = useTranslation();
  const lang = useAppSelector((state) => state.auth.lang);

  const inputLabel =
    lang === 'en'
      ? `${t(`modal.type.${type.toLowerCase()}`)} ${t(`modal.${label}`).toLowerCase()}`
      : `${t(`modal.${label}`)} ${t(`modal.type.${type.toLowerCase()}`)}`;

  return (
    <TextField
      autoFocus={label === 'title'}
      margin="dense"
      multiline={label !== 'title'}
      rows={label === 'title' ? 1 : 3}
      id={label}
      label={inputLabel}
      error={!!errors}
      helperText={errors?.message || ' '}
      defaultValue={value}
      fullWidth
      {...register(label, {
        required: {
          value: true,
          message: t('modal.validate.required', { val: t(`modal.${label}`) }),
        },
        minLength: {
          value: label === 'title' ? 5 : 20,
          message: t('modal.validate.minLength', { val: t(`modal.${label}`).toLowerCase() }),
        },
      })}
    />
  );
};

export default InputModal;
