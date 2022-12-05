import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { logOut, setCredentials } from 'redux/authSlice';
import {
  useDeleteUserByIdMutation,
  useGetUserByIdQuery,
  useSignInMutation,
  useUpdateUserByIdMutation,
} from 'services';

import { updateProfile } from './userPage.utils';
import { ErrorResponse, UserSignUpType } from 'types';

import Form from 'components/Forms/FormAuthorization';
import { Toast } from 'components';

import styles from './userPage.module.scss';
import { useTranslation } from 'react-i18next';

export enum ModalText {
  DELETE = 'Are you sure you want to delete your account?',
  PROFILE_UPDATE = 'Profile update.',
}

const UserPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [signIn] = useSignInMutation();
  const [deleteUser] = useDeleteUserByIdMutation();
  const [updateUser, { error }] = useUpdateUserByIdMutation();
  const { id } = useAppSelector((state) => state.auth.user!);
  const [isMessageUser, setMessageUser] = useState('');
  const [userName, setUserName] = useState('');
  const userData = useGetUserByIdQuery(id);

  const handleDeleteUser = async () => {
    localStorage.removeItem('pma_token');
    await deleteUser(id!);
    dispatch(logOut());
    navigate('/');
  };
  console.log('run');

  const onSubmit = async (dataUser: UserSignUpType) => {
    id &&
      updateUser(updateProfile(id, dataUser))
        .unwrap()
        .then(async () => {
          await signIn({
            login: dataUser.login,
            password: dataUser.password,
          })
            .unwrap()
            .then((data) => {
              localStorage.setItem('pma_token', data.token);
              dispatch(setCredentials(data));
              setMessageUser(ModalText.PROFILE_UPDATE);
            });
        })
        .catch(() => setMessageUser(''));
  };

  useEffect(() => {
    if (isMessageUser.length) {
      setTimeout(() => {
        setMessageUser('');
      }, 3000);
    }
  }, [isMessageUser]);

  useEffect(() => {
    if (userData.currentData?.name) setUserName(userData.currentData.name);
  }, [userData.currentData]);

  return (
    <div className={styles.user}>
      {error && <Toast message={(error as ErrorResponse).data.message} />}
      {!error && isMessageUser && <Toast message={isMessageUser} />}
      <div className={styles.userDescription}>
        <h2 className={styles.userTitle}>
          {t('userHi')} {userName && userName.slice(0, 1).toUpperCase() + userName.slice(1)}!
        </h2>
        <p>{t('userPage')}</p>
      </div>
      <Form
        className={styles.userForm}
        onSubmit={onSubmit}
        formName="User page"
        formLink=""
        nameFiled={true}
        userPage={true}
        isConfirm={handleDeleteUser}
      />
    </div>
  );
};

export default UserPage;
