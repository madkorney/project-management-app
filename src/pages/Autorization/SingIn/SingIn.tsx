import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';

import { InputPassword, InputLogin, LinkAuthorization } from '../InputsForm';
import { setShowPassword } from '../../../redux/showUserPasswordSlice';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { AuthInfoType, UserSignUpType } from 'types';

import styles from '../Authorization.module.scss';

const SingIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUpType>({
    mode: 'onBlur',
  });

  const dispatch = useAppDispatch();
  const { showPassword } = useAppSelector((state) => state.password);

  const onSubmit = (data: AuthInfoType) => {
    console.log(data);
  };

  const handleClickShowPassword = () => {
    dispatch(setShowPassword(!showPassword));
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className={styles.form}>
      <h2>Sing Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputLogin errors={errors.login} register={register} />
        <InputPassword
          errors={errors.password}
          register={register}
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
        />
        <Button className={styles.formButton} variant="contained" type="submit">
          Sign Out
        </Button>
        <LinkAuthorization linkNames="sing-up" />
      </form>
    </div>
  );
};
export default SingIn;
