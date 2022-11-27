import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useAppSelector } from 'redux/hooks';

import { Autocomplete, Button, TextField } from '@mui/material';
import { Toast } from 'components';

import {
  useGetUsersQuery,
  useCreateTaskMutation,
  useUpdateTaskByIdMutation,
  useGetBoardByIdQuery,
  useGetTasksQuery,
} from 'services';
import { ErrorResponse, TaskType } from 'types';

import './boardForm.scss';

type TaskFormType = {
  mode: 'edit' | 'add';
  boardId: string;
  columnId: string;
  task?: TaskType;
  onClose?: () => void;
};

type TaskParamsType = Pick<TaskType, 'title' | 'description' | 'users'>;

const TaskForm = ({ mode, boardId, columnId, task, onClose }: TaskFormType) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TaskParamsType>({
    mode: 'onTouched',
  });

  const [addTask, { error: addError }] = useCreateTaskMutation();
  const [updateTask, { error: editError }] = useUpdateTaskByIdMutation();
  const { data: boardData } = useGetBoardByIdQuery(boardId);

  const responsibleUsers = [...(boardData?.users as string[]), boardData?.owner as string];

  const userId = useAppSelector((state) => state.auth.user?.id) as string;
  const { data: users } = useGetUsersQuery();
  const { data: tasks, error: getError } = useGetTasksQuery(
    { columnId, boardId },
    { skip: mode === 'edit' }
  );

  const onSubmit: SubmitHandler<TaskParamsType> = async (data) => {
    if (mode === 'add') {
      await addTask({ ...data, userId, boardId, columnId, order: tasks?.length as number })
        .unwrap()
        .then(() => onClose?.());
    }
    if (mode === 'edit') {
      await updateTask({ ...(task as TaskType), ...data })
        .unwrap()
        .then(() => onClose?.());
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        autoFocus
        margin="dense"
        id="title"
        label="Task title"
        error={!!errors?.title?.message}
        helperText={errors?.title?.message || ' '}
        defaultValue={task?.title}
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
        label="Task description"
        multiline
        defaultValue={task?.description}
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
            ...users.filter((user) => task?.users.includes(user._id)).map((user) => user._id),
          ]}
          render={({ field: { onChange, value, ...field } }) => (
            <Autocomplete
              multiple
              id="users"
              options={users.filter((user) => responsibleUsers.includes(user._id))}
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
                  label="Resposible users"
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
      {getError && <Toast message={(getError as ErrorResponse).data.message} />}
    </form>
  );
};

export default TaskForm;
