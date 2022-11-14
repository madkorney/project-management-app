import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { InputPassword, InputLogin, LinkAuthorization } from '../InputsForm';
import { setShowPassword } from '../../../redux/showUserPasswordSlice';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { useSignInMutation } from '../../../services';
import { setAuthorized } from 'redux/authorizedSlice';

import { AuthInfoType, UserSignUpType } from 'types';

import styles from '../Authorization.module.scss';
import { useState } from 'react';

const SingIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUpType>({
    mode: 'onBlur',
  });

  const [errorLogIn, setErrorLogIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [sigIn] = useSignInMutation();
  const { showPassword } = useAppSelector((state) => state.password);

  const onSubmit = async (dataLogin: AuthInfoType) => {
    await sigIn(dataLogin)
      .unwrap()
      .then((data) => {
        localStorage.setItem('pma_token', data.token);
        localStorage.setItem('LoginUser', dataLogin.login);
        dispatch(setAuthorized(true));
        setErrorLogIn(false);
        navigate('/');
      })
      .catch(() => {
        return setErrorLogIn(true);
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
        <h2>Log In</h2>
        {errorLogIn && <span className={styles.formError}>User is not found!</span>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputLogin errors={errors.login} register={register} />
          <InputPassword
            errors={errors.password}
            register={register}
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          />
          <Button className={styles.formButton} variant="contained" type="submit">
            Log In
          </Button>
          <LinkAuthorization linkNames="sing-up" />
        </form>
      </div>
    </div>
  );
};
export default SingIn;
