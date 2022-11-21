import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppSelector } from 'redux/hooks';

import { Autocomplete, Button, TextField } from '@mui/material';
import { Toast } from 'components';

import { useCreateBoardMutation, useGetUsersQuery } from 'services';
import { BoardParamsType, ErrorResponse } from 'types';

import './addBoard.scss';

type AddBoardType = {
  onClose?: () => void;
};

const AddBoard = ({ onClose }: AddBoardType) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BoardParamsType>();

  const [addBoard, { error }] = useCreateBoardMutation();
  const userId = useAppSelector((state) => state.auth.user.id) as string;
  const { data: users } = useGetUsersQuery();

  const onSubmit: SubmitHandler<Omit<BoardParamsType, 'owner'>> = async (data) =>
    await addBoard({ ...data, owner: userId })
      .unwrap()
      .then(() => onClose?.());

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
          minLength: {
            value: 20,
            message: 'Please write more detailed description',
          },
        })}
      />
      {errors.description && <span>{errors.description.message}</span>}
      {users && (
        <Autocomplete
          multiple
          id="users"
          options={users.filter((user) => user._id !== userId)}
          getOptionLabel={(option) => option.name}
          filterSelectedOptions
          limitTags={2}
          noOptionsText="No users found"
          {...register('users')}
          onChange={(_, value) =>
            setValue(
              'users',
              value.map((key) => key._id)
            )
          }
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Assigned users" placeholder="Users" />
          )}
        />
      )}
      <Button variant="contained" type="submit">
        Add
      </Button>
      {error && <Toast message={(error as ErrorResponse).data.message} />}
    </form>
  );
};

export default AddBoard;
