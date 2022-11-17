import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { InputLogin, InputName, InputPassword, LinkAuthorization } from './InputsForm';
import { Button } from '@mui/material';
import { UserSignUpType } from 'types';

import styles from 'global-styles/authorization.module.scss';

type FormProps = {
  onSubmit: (data: UserSignUpType) => Promise<void>;
  formName: string;
  formLink: string;
  nameFiled: boolean;
};

const Form = ({ onSubmit, formName, formLink, nameFiled }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUpType>({
    mode: 'onTouched',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {nameFiled && <InputName errors={errors.name} register={register} />}
      <InputLogin errors={errors.login} register={register} />
      <InputPassword
        errors={errors.password}
        register={register}
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        showPassword={showPassword}
      />
      <Button className={styles.formButton} variant="contained" type="submit">
        {formName}
      </Button>
      <LinkAuthorization linkName={formLink} />
    </form>
  );
};

export default Form;
