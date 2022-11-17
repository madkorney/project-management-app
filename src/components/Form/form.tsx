import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { ButtonsForm, InputLogin, InputName, InputPassword, LinkAuthorization } from './InputsForm';
import { UserSignUpType } from 'types';

type FormProps = {
  onSubmit: (data: UserSignUpType) => Promise<void>;
  formName: string;
  formLink: string;
  nameFiled: boolean;
  userPage?: boolean;
};

const Form = ({ onSubmit, formName, formLink, nameFiled, userPage }: FormProps) => {
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
      <ButtonsForm formName={formName} userPage={userPage} />

      {!userPage && <LinkAuthorization linkName={formLink} />}
    </form>
  );
};

export default Form;
