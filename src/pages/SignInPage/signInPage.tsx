import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'redux/hooks';
import { setCredentials } from 'redux/authSlice';
import { useSignInMutation } from 'services';
import { AuthInfoType, ErrorResponse } from 'types';

import { Typography } from '@mui/material';
import Form from 'components/Forms/FormAuthorization';
import { Toast } from 'components';

import styles from 'global-styles/authorization.module.scss';

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signIn, { error }] = useSignInMutation();

  const onSubmit = async (dataLogin: AuthInfoType) => {
    await signIn(dataLogin)
      .unwrap()
      .then((data) => {
        localStorage.setItem('pma_token', data.token);
        dispatch(setCredentials(data));
      })
      .then(() => navigate('/boards'))
      .catch(() => {
        localStorage.removeItem('pma_token');
      });
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        <Typography variant="h5">Sign In</Typography>
        {error && <Toast message={(error as ErrorResponse).data.message} />}
        <Form onSubmit={onSubmit} formName="Sign In" formLink="sign-up" nameFiled={false} />
      </div>
    </div>
  );
};

export default SignInPage;
