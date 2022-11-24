import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useAppSelector } from 'redux/hooks';

import { Autocomplete, Button, TextField } from '@mui/material';
import { Toast } from 'components';

import { useCreateBoardMutation, useUpdateBoardByIdMutation, useGetUsersQuery } from 'services';
import { BoardParamsType, BoardType, ErrorResponse } from 'types';

import './boardForm.scss';

type BoardFormType = {
  mode: 'edit' | 'add';
  board?: BoardType;
  onClose?: () => void;
};

const BoardForm = ({ mode, board, onClose }: BoardFormType) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BoardParamsType>({
    mode: 'onTouched',
  });

  const [addBoard, { error: addError }] = useCreateBoardMutation();
  const [updateBoard, { error: editError }] = useUpdateBoardByIdMutation();
  const userId = useAppSelector((state) => state.auth.user.id) as string;
  const { data: users } = useGetUsersQuery();

  const onSubmit: SubmitHandler<Omit<BoardParamsType, 'owner'>> = async (data) => {
    if (mode === 'add') {
      await addBoard({ ...data, owner: userId })
        .unwrap()
        .then(() => onClose?.());
    }
    if (mode === 'edit') {
      await updateBoard({ _id: board?._id as string, ...data, owner: board?.owner as string })
        .unwrap()
        .then(() => onClose?.());
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        margin="dense"
        id="title"
        label="Board title"
        error={!!errors?.title?.message}
        helperText={errors?.title?.message || ' '}
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
      <TextField
        margin="dense"
        id="description"
        label="Board description"
        multiline
        defaultValue={board?.description}
        rows={3}
        error={!!errors?.description?.message}
        helperText={errors?.description?.message || ' '}
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
      {users && (
        <Controller
          control={control}
          name="users"
          defaultValue={[
            ...users.filter((user) => board?.users.includes(user._id)).map((user) => user._id),
          ]}
          render={({ field: { onChange, value, ...field } }) => (
            <Autocomplete
              multiple
              id="users"
              options={users.filter((user) => ![board?.owner, userId].includes(user._id))}
              value={users.filter((user) => value.includes(user._id))}
              getOptionLabel={(option) => option.name}
              filterSelectedOptions
              limitTags={2}
              noOptionsText="No users found"
              onChange={(_, value) => onChange(value.map((key) => key._id))}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...field}
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
        {mode === 'edit' ? 'save' : mode}
      </Button>
      {addError && <Toast message={(addError as ErrorResponse).data.message} />}
      {editError && <Toast message={(editError as ErrorResponse).data.message} />}
    </form>
  );
};

export default BoardForm;
