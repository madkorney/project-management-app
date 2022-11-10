import React, { ChangeEvent, useState } from 'react';
import { AuthorizationState } from '../types';
import { InputPassword, InputText, LinkAuthorization } from '../InputsForm';
import { Button } from '@mui/material';
import { validateLogin, validateName, validatePassword } from '../Authorization.utils';

import styles from '../Authorization.module.scss';

const SingUp = () => {
  const [values, setValues] = useState<AuthorizationState>({
    name: '',
    password: '',
    login: '',
    showPassword: false,
    errorLogin: false,
    errorName: false,
    errorPassword: false,
  });

  const onSubmit = () => {
    const errorPass = validatePassword(values.password);
    const errorLogin = validateLogin(values.login || '');
    const errorName = validateName(values.name);
    setValues({
      ...values,
      errorPassword: errorPass,
      errorLogin: errorLogin,
      errorName: errorName,
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // setValues({ ...values, [event.target.name]: event.target.value });

    if (event.target.name === 'password')
      setValues({
        ...values,
        [event.target.name]: event.target.value,
        errorPassword: false,
      });
    if (event.target.name === 'login')
      setValues({
        ...values,
        [event.target.name]: event.target.value,
        errorLogin: false,
      });
    if (event.target.name === 'name')
      setValues({
        ...values,
        [event.target.name]: event.target.value,
        errorName: false,
      });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <div className={styles.form}>
      <h2>Sing Up</h2>
      <form onSubmit={onSubmit}>
        <InputText
          values={values}
          onChange={handleChange}
          nameElement="name"
          error={values.errorName}
        />
        <InputText
          values={values}
          onChange={handleChange}
          nameElement="login"
          error={values.errorLogin}
        />
        <InputPassword
          values={values}
          onChange={handleChange}
          nameElement="password"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          error={values.errorPassword}
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
