import Form from 'components/Forms/FormAuthorization';
import { UserSignUpType } from 'types';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setOpenUpdateModal, setUpdateUserData } from 'redux/modalUserSlice';

import ModalUpdateUser from 'components/Modal/ModalUser';

import styles from './userPage.module.scss';

const UserPage = () => {
  const dispatch = useAppDispatch();
  const login = useAppSelector((state) => state.auth.user.login);

  const handleDeleteUser = () => {
    dispatch(setOpenUpdateModal(true));
  };

  const onSubmit = async (data: UserSignUpType) => {
    dispatch(setUpdateUserData(data));
  };

  return (
    <>
      <div className={styles.user}>
        <div className={styles.userDescription}>
          <h2>Hi, {login && login.slice(0, 1).toUpperCase() + login.slice(1)}</h2>
          <p>This is your profile page.</p>
          <p>Here you can update your details or completely delete your account.</p>
        </div>
        <Form
          className={styles.userForm}
          onSubmit={onSubmit}
          formName="User page"
          formLink=""
          nameFiled={true}
          userPage={true}
          userDel={handleDeleteUser}
        />
        <ModalUpdateUser />
      </div>
    </>
  );
};

export default UserPage;
