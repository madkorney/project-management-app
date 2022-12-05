import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'redux/hooks';
import { setCredentials } from 'redux/authSlice';
import { useSignInMutation, useSignUpMutation } from 'services';
import { ErrorResponse, UserSignUpType } from 'types';

import { Toast } from 'components';
import Form from 'components/Forms/FormAuthorization';

import styles from 'global-styles/authorization.module.scss';
import { Typography } from '@mui/material';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [signUp, { error }] = useSignUpMutation();
  const [signIn] = useSignInMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (dataUser: UserSignUpType) => {
    await signUp(dataUser)
      .unwrap()
      .then(async (data) => {
        await signIn({
          login: data.login,
          password: dataUser.password,
        })
          .unwrap()
          .then((data) => {
            localStorage.setItem('pma_token', data.token);
            dispatch(setCredentials(data));
          });
      })
      .then(() => navigate('/boards'))
      .catch(() => {
        localStorage.removeItem('pma_token');
      });
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        <Typography variant="h5">Sign Up</Typography>
        {error && <Toast message={(error as ErrorResponse).data.message} />}
        <Form onSubmit={onSubmit} formName="Sign Up" formLink="sign-in" nameFiled={true} />
      </div>
    </div>
  );
};

export default SignUpPage;
