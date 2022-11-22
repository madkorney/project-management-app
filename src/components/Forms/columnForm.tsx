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
  } = useForm<{ title: string }>();

  const [addColumn, { error }] = useCreateColumnMutation();
  const { data: columns } = useGetColumnsQuery(boardId);

  const onSubmit: SubmitHandler<{ title: string }> = async (data) => {
    await addColumn({ ...data, boardId, order: columns?.length as number })
      .unwrap()
      .then(() => onClose?.());
    console.log(data);
  };

  return (
    <form className="form-board" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        autoFocus
        margin="dense"
        id="title"
        label="Column title"
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
      {errors.title && <span>{errors.title.message}</span>}
      <Button variant="contained" type="submit">
        Add
      </Button>
      {error && <Toast message={(error as ErrorResponse).data.message} />}
    </form>
  );
};

export default ColumnForm;
