import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'redux/hooks';
import { useSignInMutation } from 'services';
import { setCredentials } from 'redux/authSlice';

import Form from 'components/Forms/FormAuthorization';
import Toast from 'components/Toast/toast';

import { AuthInfoType, ErrorResponse } from 'types';

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
        <h2>Sign In</h2>
        {error && <Toast message={(error as ErrorResponse).data.message} />}
        <Form onSubmit={onSubmit} formName="Sing In" formLink="sign-up" nameFiled={false} />
      </div>
    </div>
  );
};

export default SignInPage;
