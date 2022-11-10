import React, { ChangeEvent, useState } from 'react';
import { AuthorizationState } from '../types';
import { InputPassword, InputText, LinkAuthorization } from '../InputsForm';
import { Button } from '@mui/material';

import styles from '../Authorization.module.scss';

const SingOut = () => {
  const [values, setValues] = useState<AuthorizationState>({
    name: '',
    password: '',
    login: '',
    showPassword: false,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
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
      <h2>Sing Out</h2>
      <InputText values={values} onChange={handleChange} nameElement="name" />
      <InputText values={values} onChange={handleChange} nameElement="login" />
      <InputPassword
        values={values}
        onChange={handleChange}
        nameElement="password"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
      />
      <Button className={styles.formButton} variant="contained">
        Sign Out
      </Button>
      <LinkAuthorization linkNames="sing-in" />
    </div>
  );
};

export default SingOut;
