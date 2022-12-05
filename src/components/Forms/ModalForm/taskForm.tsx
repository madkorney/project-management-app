import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'redux/hooks';

import { Autocomplete, Button, TextField } from '@mui/material';
import { Toast } from 'components';
import InputModal from './InputModal';

import {
  useGetUsersQuery,
  useCreateTaskMutation,
  useUpdateTaskByIdMutation,
  useGetBoardByIdQuery,
  useGetTasksQuery,
} from 'services';
import { ErrorResponse, FormPropsType, TaskType } from 'types';

import './modalForm.scss';

type TaskFormType = {
  mode: 'edit' | 'add';
  boardId: string;
  columnId: string;
  task?: TaskType;
  onClose?: () => void;
};

const TaskForm = ({ mode, boardId, columnId, task, onClose }: TaskFormType) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormPropsType>({
    mode: 'onTouched',
  });

  const { t } = useTranslation();
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

  const onSubmit: SubmitHandler<FormPropsType> = async (data) => {
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
      <InputModal
        errors={errors.title}
        register={register}
        label="title"
        type="Task"
        value={task?.title as string}
      />
      <InputModal
        errors={errors.description}
        register={register}
        label="description"
        type="Task"
        value={task?.description as string}
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
              noOptionsText={t('users.noUsers')}
              onChange={(_, value) => onChange(value.map((key) => key._id))}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...field}
                  variant="standard"
                  label={t('users.responsible')}
                  placeholder={t('users.placeholder')}
                />
              )}
              renderOption={(props, option) => (
                <li {...props} key={option._id}>
                  {option.name}
                </li>
              )}
            />
          )}
        />
      )}
      <Button variant="contained" type="submit">
        {mode === 'edit' ? t('save') : t('add.common')}
      </Button>
      {addError && <Toast message={(addError as ErrorResponse).data.message} />}
      {editError && <Toast message={(editError as ErrorResponse).data.message} />}
      {getError && <Toast message={(getError as ErrorResponse).data.message} />}
    </form>
  );
};

export default TaskForm;
