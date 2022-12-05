import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'redux/hooks';

import { Autocomplete, Button, TextField } from '@mui/material';
import { Toast } from 'components';
import InputModal from './InputModal';

import { useCreateBoardMutation, useUpdateBoardByIdMutation, useGetUsersQuery } from 'services';
import { BoardType, ErrorResponse, FormPropsType } from 'types';

import './modalForm.scss';

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
  } = useForm<FormPropsType>({
    mode: 'onTouched',
  });

  const { t } = useTranslation();

  const [addBoard, { error: addError }] = useCreateBoardMutation();
  const [updateBoard, { error: editError }] = useUpdateBoardByIdMutation();
  const userId = useAppSelector((state) => state.auth.user?.id) as string;
  const { data: users } = useGetUsersQuery();

  const onSubmit: SubmitHandler<Omit<FormPropsType, 'owner'>> = async (data) => {
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
      <InputModal
        errors={errors.title}
        register={register}
        label="title"
        type="Board"
        value={board?.title as string}
      />
      <InputModal
        errors={errors.description}
        register={register}
        label="description"
        type="Board"
        value={board?.description as string}
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
              noOptionsText={t('users.noUsers')}
              onChange={(_, value) => onChange(value.map((key) => key._id))}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...field}
                  variant="standard"
                  label={t('users.assigned')}
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
    </form>
  );
};

export default BoardForm;
