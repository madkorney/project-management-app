import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, IconButton, TextField } from '@mui/material';
import { Toast } from 'components';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { useCreateColumnMutation, useUpdateColumnByIdMutation, useGetColumnsQuery } from 'services';
import { ColumnType, ErrorResponse } from 'types';

import './boardForm.scss';

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
  } = useForm<{ title: string }>({
    mode: 'onTouched',
  });

  const [addColumn, { error: addError }] = useCreateColumnMutation();
  const [updateColumn, { error: updateError }] = useUpdateColumnByIdMutation();
  const { data: columns, error: getError } = useGetColumnsQuery(boardId, { skip: mode === 'edit' });

  const onSubmit: SubmitHandler<{ title: string }> = async (data) => {
    if (mode === 'add') {
      await addColumn({ ...data, boardId, order: columns?.length as number })
        .unwrap()
        .then(() => onClose?.());
    }
    if (mode === 'edit') {
      if (data.title !== (column?.title as string)) {
        await updateColumn({ ...(column as ColumnType), ...data })
          .unwrap()
          .then(() => onClose?.());
      } else {
        onClose?.();
      }
    }
  };

  return (
    <form className={`form ${mode}`} onSubmit={handleSubmit(onSubmit)}>
      {mode === 'add' ? (
        <>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Column title"
            error={!!errors?.title?.message}
            helperText={errors.title?.message || ' '}
            fullWidth
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
          <Button variant="contained" type="submit">
            Add
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
          <IconButton aria-label="save" type="submit" size="small">
            <CheckIcon />
          </IconButton>
          <IconButton aria-label="cancel" onClick={onClose} size="small">
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
