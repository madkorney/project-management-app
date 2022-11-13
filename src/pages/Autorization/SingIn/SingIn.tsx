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

const SingIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUpType>({
    mode: 'onBlur',
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [sigIn] = useSignInMutation();
  const { showPassword } = useAppSelector((state) => state.password);

  const onSubmit = async (data: AuthInfoType) => {
    const pmaToken = await sigIn(data).unwrap();
    localStorage.setItem('pma_token', pmaToken.token);
    localStorage.setItem('LoginUser', data.login);
    dispatch(setAuthorized(true));
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
        <h2>Log In</h2>
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
