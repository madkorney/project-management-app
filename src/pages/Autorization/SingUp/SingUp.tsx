import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { InputPassword, InputName, InputLogin, LinkAuthorization } from '../InputsForm';
import { setShowPassword } from '../../../redux/showUserPasswordSlice';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { useSignInMutation, useSignUpMutation } from '../../../services';
import { setAuthorized } from 'redux/authorizedSlice';

import { UserSignUpType } from 'types';

import styles from '../Authorization.module.scss';

const SingUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUpType>({
    mode: 'onBlur',
  });

  const navigate = useNavigate();
  const [singUp] = useSignUpMutation();
  const [signIn] = useSignInMutation();
  const dispatch = useAppDispatch();
  const { showPassword } = useAppSelector((state) => state.password);
  const { userAuthorized } = useAppSelector((state) => state.authorized);

  const onSubmit = async (data: UserSignUpType) => {
    await singUp(data).unwrap();
    const userData = await signIn({
      login: data.login,
      password: data.password,
    }).unwrap();

    localStorage.setItem('pma_token', userData.token);
    localStorage.setItem('LoginUser', data.login);
    dispatch(setAuthorized(!userAuthorized));
    navigate('/');
  };

  const handleClickShowPassword = () => {
    dispatch(setShowPassword(!showPassword));
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        <h2>Sing Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputName errors={errors.name} register={register} />
          <InputLogin errors={errors.login} register={register} />
          <InputPassword
            errors={errors.password}
            register={register}
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          />
          <Button className={styles.formButton} variant="contained" type="submit">
            Sign Up
          </Button>
          <LinkAuthorization linkNames="sing-in" />
        </form>
      </div>
    </div>
  );
};
export default SingUp;
