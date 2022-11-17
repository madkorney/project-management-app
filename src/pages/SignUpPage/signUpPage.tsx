import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { useSignInMutation, useSignUpMutation } from 'services';
import { setCredentials } from 'redux/authSlice';

import Toast from 'components/Toast/toast';
import Form from 'components/Form';

import { ErrorResponse, UserSignUpType } from 'types';

import styles from 'global-styles/authorization.module.scss';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [signUp, { error }] = useSignUpMutation();
  const [signIn] = useSignInMutation();
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);

  useEffect(() => {
    if (isAuthorized) {
      navigate('/', { replace: true });
    }
  });

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
        navigate('/');
      })
      .catch(() => {
        localStorage.removeItem('pma_token');
      });
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        <h2>Sign Up</h2>
        {error && <Toast message={(error as ErrorResponse).data.message} />}
        <Form onSubmit={onSubmit} formName="Sign Up" formLink="sign-in" nameFiled={true} />
      </div>
    </div>
  );
};

export default SignUpPage;
