import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';

import { InputPassword, InputLogin, LinkAuthorization } from '../InputsForm';
import { setShowPassword } from '../../../redux/validateUserSlice';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { UserSignUpType } from 'types';

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
  const { validateUser } = useAppSelector((state) => state.validate);

  const onSubmit = (data: UserSignUpType) => {
    console.log(data);
  };

  const handleClickShowPassword = () => {
    dispatch(setShowPassword(!validateUser.showPassword));
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
