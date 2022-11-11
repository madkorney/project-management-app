import React, { ChangeEvent, useState } from 'react';

import { Button } from '@mui/material';
import { InputPassword, InputText, LinkAuthorization } from '../InputsForm';
import { resetError, validateName, validatePassword } from '../Authorization.utils';

import styles from '../Authorization.module.scss';
import { UserSignUpType } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setShowPassword } from '../../../redux/validateUserSlice';

const SingIn = () => {
  const [values, setValues] = useState<UserSignUpType>({
    name: '',
    password: '',
    login: '',
  });
  const dispatch = useAppDispatch();

  const { validateUser } = useAppSelector((state) => state.validate);
  const onSubmit = () => {
    validatePassword(values.password, dispatch);
    validateName(values.name, dispatch);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    resetError(event.target.name, dispatch);
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
      <h2>Sing In</h2>
      <form onSubmit={onSubmit}></form>
      <InputText values={values} onChange={handleChange} nameElement="name" />
      <InputPassword
        values={values}
        onChange={handleChange}
        nameElement="password"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
      />
      <Button className={styles.formButton} variant="contained" onClick={onSubmit}>
        Sign In
      </Button>
      <LinkAuthorization linkNames="sing-up" />
    </div>
  );
};

export default SingIn;
