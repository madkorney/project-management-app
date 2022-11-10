import React, { useState } from 'react';
import { Button } from '@mui/material';
import { AuthorizationState } from '../types';
import { NavLink } from 'react-router-dom';
import { InputPassword, InputText, LinkAuthorization } from '../InputsForm';

import styles from '../Authorization.module.scss';

const SingIn = () => {
  const [values, setValues] = useState<AuthorizationState>({
    name: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
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
      <InputText values={values} onChange={handleChange} nameElement="name" />
      <InputPassword
        values={values}
        onChange={handleChange}
        nameElement="password"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
      />
      <Button className={styles.formButton} variant="contained">
        Sign In
      </Button>
      <LinkAuthorization linkNames="sing-out" />
    </div>
  );
};

export default SingIn;
