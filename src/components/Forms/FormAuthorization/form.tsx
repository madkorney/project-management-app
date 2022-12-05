import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { ButtonsForm, InputLogin, InputName, InputPassword, LinkAuthorization } from './InputsForm';

import { UserSignUpType } from 'types';

type FormProps = {
  onSubmit: (data: UserSignUpType) => Promise<void>;
  formName: string;
  formLink: string;
  nameFiled: boolean;
  isConfirm?: () => Promise<void>;
  userPage?: boolean;
  userDel?: () => void;
  className?: string;
};

const Form = ({
  className,
  onSubmit,
  formName,
  formLink,
  nameFiled,
  userPage,
  isConfirm,
}: FormProps) => {
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
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      {nameFiled && <InputName errors={errors.name} register={register} />}
      <InputLogin errors={errors.login} register={register} />
      <InputPassword
        errors={errors.password}
        register={register}
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        showPassword={showPassword}
      />
      <ButtonsForm formName={formName} userPage={userPage} isConfirm={isConfirm!} />

      {!userPage && <LinkAuthorization linkName={formLink} />}
    </form>
  );
};

export default Form;
