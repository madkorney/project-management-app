import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BoardParamsType } from 'types';

import './addBoard.scss';

const AddBoard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BoardParamsType>();

  const onSubmit: SubmitHandler<Pick<BoardParamsType, 'title' | 'description'>> = async (data) => {
    console.log(data);
  };

  return (
    <form className="add-board-form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        autoFocus
        margin="dense"
        id="title"
        label="Board title"
        fullWidth
        {...register('title', {
          required: {
            value: true,
            message: 'Title cannot be empty',
          },
        })}
      />
      {errors.title && <span>{errors.title.message}</span>}
      <TextField
        margin="dense"
        id="description"
        label="Board description"
        multiline
        rows={3}
        fullWidth
        {...register('description', {
          required: {
            value: true,
            message: 'Description cannot be empty',
          },
        })}
      />
      {errors.description && <span>{errors.description.message}</span>}
      <Button variant="contained">Submit</Button>
    </form>
  );
};

export default AddBoard;
