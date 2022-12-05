import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'redux/hooks';
import { setCredentials } from 'redux/authSlice';
import { useSignInMutation, useSignUpMutation } from 'services';
import { ErrorResponse, UserSignUpType } from 'types';

import { Typography } from '@mui/material';
import { Toast } from 'components';
import Form from 'components/Forms/FormAuthorization';

import styles from 'components/Forms/FormAuthorization/authorization.module.scss';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [signUp, { error }] = useSignUpMutation();
  const [signIn] = useSignInMutation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

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
        <Typography variant="h5">{t('auth.signUp')}</Typography>
        {error && <Toast message={(error as ErrorResponse).data.message} />}
        <Form onSubmit={onSubmit} formName={t('auth.signUp')} formLink="sign-in" nameFiled={true} />
      </div>
    </div>
  );
};

export default SignUpPage;
