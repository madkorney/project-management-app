import React, { ChangeEvent, useState } from 'react';

import { Button } from '@mui/material';
import { AuthorizationState } from '../types';
import { InputPassword, InputText, LinkAuthorization } from '../InputsForm';
import { validateName, validatePassword, validateReset } from '../Authorization.utils';

import styles from '../Authorization.module.scss';

const SingIn = () => {
  const [values, setValues] = useState<AuthorizationState>({
    name: '',
    password: '',
    showPassword: false,
    errorPassword: false,
    errorName: false,
    errorLogin: false,
  });
  const onSubmit = () => {
    const errorPass = validatePassword(values.password);
    const errorName = validateName(values.name);
    setValues({
      ...values,
      errorPassword: errorPass,
      errorName: errorName,
    });

    console.log(values);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    validateReset(event.target.name, event.target.value, values, setValues);
  };

  const handleClickShowPassword = () => {
    console.log(values.showPassword);
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
      <h2>Sing In</h2>
      <form onSubmit={onSubmit}></form>
      <InputText
        values={values}
        onChange={handleChange}
        nameElement="name"
        error={values.errorName}
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
        Sign In
      </Button>
      <LinkAuthorization linkNames="sing-up" />
    </div>
  );
};

export default SingIn;
