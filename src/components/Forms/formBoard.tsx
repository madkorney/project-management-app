import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useAppSelector } from 'redux/hooks';

import { Autocomplete, Button, TextField } from '@mui/material';
import { Toast } from 'components';

import {
  useCreateBoardMutation,
  useUpdateBoardByIdMutation,
  useGetUsersQuery,
  useGetBoardByIdQuery,
} from 'services';
import { BoardParamsType, ErrorResponse } from 'types';

import './formBoard.scss';

type BoardFormType = {
  mode: 'edit' | 'add';
  boardId?: string;
  onClose?: () => void;
};

const BoardForm = ({ mode, boardId, onClose }: BoardFormType) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BoardParamsType>();

  const [addBoard, { error: addError }] = useCreateBoardMutation();
  const [updateBoard, { error: editError }] = useUpdateBoardByIdMutation();
  const userId = useAppSelector((state) => state.auth.user.id) as string;
  const { data: users } = useGetUsersQuery();
  const { data: board } = useGetBoardByIdQuery(boardId as string);

  const onSubmit: SubmitHandler<Omit<BoardParamsType, 'owner'>> = async (data) => {
    if (mode === 'add') {
      await addBoard({ ...data, owner: userId })
        .unwrap()
        .then(() => onClose?.());
    }
    if (mode === 'edit') {
      console.log(data);
      await updateBoard({ _id: boardId as string, ...data, owner: board?.owner as string })
        .unwrap()
        .then(() => onClose?.());
    }
  };

  return (
    <form className="form-board" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        autoFocus
        margin="dense"
        id="title"
        label="Board title"
        defaultValue={board?.title}
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
      <TextField
        margin="dense"
        id="description"
        label="Board description"
        multiline
        defaultValue={board?.description}
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
        <Controller
          control={control}
          name="users"
          defaultValue={[
            ...users.filter((user) => board?.users.includes(user._id)).map((user) => user._id),
          ]}
          shouldUnregister
          render={({ field: { ref, onChange, value, ...field } }) => (
            <Autocomplete
              multiple
              id="users"
              options={users.filter((user) => user._id !== userId)}
              value={users.filter((user) => value.includes(user._id))}
              getOptionLabel={(option) => option.name}
              filterSelectedOptions
              limitTags={2}
              noOptionsText="No users found"
              onChange={(_, value) => onChange(value.map((key) => key._id))}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...field}
                  inputRef={ref}
                  variant="standard"
                  label="Assigned users"
                  placeholder="Users"
                />
              )}
            />
          )}
        />
      )}
      <Button variant="contained" type="submit">
        {mode}
      </Button>
      {addError && <Toast message={(addError as ErrorResponse).data.message} />}
      {editError && <Toast message={(editError as ErrorResponse).data.message} />}
    </form>
  );
};

export default BoardForm;
