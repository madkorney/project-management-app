import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, IconButton, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Toast } from 'components';
import InputModal from './InputModal';

import { useCreateColumnMutation, useUpdateColumnByIdMutation, useGetColumnsQuery } from 'services';
import { ColumnType, ErrorResponse, FormPropsType } from 'types';

import './modalForm.scss';

type ColumnFormType = {
  mode: 'add' | 'edit';
  boardId: string;
  column?: ColumnType;
  onClose?: () => void;
};

const ColumnForm = ({ boardId, mode, column, onClose }: ColumnFormType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormPropsType>({
    mode: 'onTouched',
  });

  const { t } = useTranslation();
  const [addColumn, { error: addError }] = useCreateColumnMutation();
  const [updateColumn, { error: updateError }] = useUpdateColumnByIdMutation();
  const { data: columns, error: getError } = useGetColumnsQuery(boardId, { skip: mode === 'edit' });

  const onSubmit: SubmitHandler<Pick<FormPropsType, 'title'>> = async ({ title }) => {
    switch (mode) {
      case 'add': {
        await addColumn({ title, boardId, order: columns?.length as number })
          .unwrap()
          .then(() => onClose?.());
        break;
      }
      case 'edit': {
        if (title !== (column?.title as string)) {
          await updateColumn({ ...(column as ColumnType), title })
            .unwrap()
            .then(() => onClose?.());
        } else {
          onClose?.();
        }
        break;
      }
      default:
        break;
    }
  };

  return (
    <form className={`form ${mode}`} onSubmit={handleSubmit(onSubmit)}>
      {mode === 'add' ? (
        <>
          <InputModal
            errors={errors.title}
            register={register}
            label="title"
            type="Column"
            value={''}
          />
          <Button variant="contained" type="submit">
            {t('add.common')}
          </Button>
        </>
      ) : (
        <>
          <TextField
            hiddenLabel
            autoFocus
            defaultValue={column?.title}
            variant="standard"
            size="small"
            error={!!errors?.title?.message}
            {...register('title', {
              required: {
                value: true,
                message: 'Title cannot be empty',
              },
              minLength: {
                value: 5,
                message: 'Please write more detailed title',
              },
            })}
          />
          <IconButton aria-label={t('save')} type="submit" size="small">
            <CheckIcon />
          </IconButton>
          <IconButton aria-label={t('cancel')} onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </>
      )}
      {addError && <Toast message={(addError as ErrorResponse).data.message} />}
      {updateError && <Toast message={(updateError as ErrorResponse).data.message} />}
      {getError && <Toast message={(getError as ErrorResponse).data.message} />}
    </form>
  );
};

export default ColumnForm;
