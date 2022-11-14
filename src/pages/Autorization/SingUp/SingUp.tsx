import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { InputPassword, InputName, InputLogin, LinkAuthorization } from '../InputsForm';
import { setShowPassword } from '../../../redux/showUserPasswordSlice';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { useSignInMutation, useSignUpMutation } from '../../../services';
import { setAuthorized } from 'redux/authorizedSlice';
import { useState } from 'react';

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

  const [errorSignUp, setErrorSignUp] = useState(false);
  const navigate = useNavigate();
  const [singUp] = useSignUpMutation();
  const [signIn] = useSignInMutation();
  const dispatch = useAppDispatch();
  const { showPassword } = useAppSelector((state) => state.password);
  const { userAuthorized } = useAppSelector((state) => state.authorized);

  const onSubmit = async (dataUser: UserSignUpType) => {
    await singUp(dataUser)
      .unwrap()
      .then(async (data) => {
        await signIn({
          login: data.login,
          password: dataUser.password,
        })
          .unwrap()
          .then((data) => {
            localStorage.setItem('pma_token', data.token);
          });
        localStorage.setItem('LoginUser', dataUser.login);
        dispatch(setAuthorized(!userAuthorized));
        setErrorSignUp(false);
        navigate('/');
      })
      .catch((er) => {
        setErrorSignUp(true);
      });
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
        {errorSignUp && <span className={styles.formError}>Login already exist!</span>}
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
