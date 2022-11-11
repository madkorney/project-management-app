import { ChangeEvent, useState } from 'react';

import { Button } from '@mui/material';
import { InputPassword, InputText, LinkAuthorization } from '../InputsForm';
import { resetError, validateLogin, validateName, validatePassword } from '../Authorization.utils';
import { setShowPassword } from '../../../redux/validateUserSlice';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { UserSignUpType } from 'types';

import styles from '../Authorization.module.scss';

const SingUp = () => {
  const [values, setValues] = useState<UserSignUpType>({
    name: '',
    password: '',
    login: '',
  });

  const dispatch = useAppDispatch();
  const { validateUser } = useAppSelector((state) => state.validate);

  const onSubmit = () => {
    validatePassword(values.password, dispatch, validateUser);
    validateLogin(values.login, dispatch, validateUser);
    validateName(values.name, dispatch, validateUser);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (validateUser.errorPassword) resetError(event.target.name, dispatch, validateUser);
    if (validateUser.errorLogin) resetError(event.target.name, dispatch, validateUser);
    if (validateUser.errorName) resetError(event.target.name, dispatch, validateUser);

    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
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
      <form onSubmit={onSubmit}>
        <InputText values={values} onChange={handleChange} nameElement="name" />
        <InputText values={values} onChange={handleChange} nameElement="login" />
        <InputPassword
          values={values}
          onChange={handleChange}
          nameElement="password"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
        />
        <Button className={styles.formButton} variant="contained" onClick={onSubmit}>
          Sign Out
        </Button>
        <LinkAuthorization linkNames="sing-in" />
      </form>
    </div>
  );
};

export default SingUp;
