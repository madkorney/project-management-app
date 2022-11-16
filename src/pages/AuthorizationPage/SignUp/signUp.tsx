import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { InputPassword, InputName, InputLogin, LinkAuthorization } from '../InputsForm';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { useSignInMutation, useSignUpMutation } from 'services';
import { setAuthorized } from 'redux/authorizedSlice';
import { useState } from 'react';

import { UserSignUpType } from 'types';

import styles from '../authorization.module.scss';
import { setCredentials } from 'redux/authSlice';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUpType>({
    mode: 'onBlur',
  });

  const [errorSignUp, setErrorSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();
  const [signIn] = useSignInMutation();
  const dispatch = useAppDispatch();
  const { userAuthorized } = useAppSelector((state) => state.authorized);

  const onSubmit = async (dataUser: UserSignUpType) => {
    await signUp(dataUser)
      .unwrap()
      .then(async (data) => {
        await signIn({
          login: data.login,
          password: dataUser.password,
        })
          .unwrap()
          .then((data) => {
            localStorage.setItem('pma_token', data.token);
            dispatch(setCredentials(data));
          });
        localStorage.setItem('LoginUser', dataUser.login);
        dispatch(setAuthorized(!userAuthorized));
        setErrorSignUp(false);
        navigate('/');
      })
      .catch(() => {
        setErrorSignUp(true);
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
            showPassword={showPassword}
          />
          <Button className={styles.formButton} variant="contained" type="submit">
            Sign Up
          </Button>
          <LinkAuthorization linkNames="sign-in" />
        </form>
      </div>
    </div>
  );
};
export default SignUp;
