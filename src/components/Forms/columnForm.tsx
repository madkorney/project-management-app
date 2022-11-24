import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, TextField } from '@mui/material';
import { Toast } from 'components';

import { useCreateColumnMutation, useGetColumnsQuery } from 'services';
import { ErrorResponse } from 'types';

import './boardForm.scss';

type ColumnFormType = {
  boardId: string;
  onClose?: () => void;
};

const ColumnForm = ({ boardId, onClose }: ColumnFormType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string }>({
    mode: 'onTouched',
  });

  const [addColumn, { error }] = useCreateColumnMutation();
  const { data: columns } = useGetColumnsQuery(boardId);

  const onSubmit: SubmitHandler<{ title: string }> = async (data) => {
    await addColumn({ ...data, boardId, order: columns?.length as number })
      .unwrap()
      .then(() => onClose?.());
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
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
      {error && <Toast message={(error as ErrorResponse).data.message} />}
    </form>
  );
};

export default ColumnForm;
