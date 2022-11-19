import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setCloseModal, setMessageUser } from 'redux/modalUserSlice';
import { logOut, setCredentials } from 'redux/authSlice';
import { useDeleteUserByIdMutation, useSignInMutation, useUpdateUserByIdMutation } from 'services';

import Toast from '../Toast/toast';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { updateProfile } from './modalUpadteUser.utils';
import { ErrorResponse } from 'types';
import { useEffect } from 'react';

enum ModalText {
  UPDATE = 'Are you sure you want to update your account?',
  DELETE = 'Are you sure you want to delete your account?',
  PROFILE_UPDATE = 'Profile update.',
}

const ModalUpdateUser = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signIn] = useSignInMutation();
  const [deleteUser] = useDeleteUserByIdMutation();
  const [updateUser, { error }] = useUpdateUserByIdMutation();
  const { isOpen, isModalType, updateUserData, isMessageUser } = useAppSelector(
    (state) => state.userSettings
  );
  const idUser = useAppSelector((state) => state.auth.user.id);

  const handleClose = () => {
    dispatch(setCloseModal(false));
  };

  const handleUpdate = async () => {
    idUser &&
      updateUser(updateProfile(idUser, updateUserData))
        .unwrap()
        .then(async (data) => {
          await signIn({
            login: updateUserData.login,
            password: updateUserData.password,
          })
            .unwrap()
            .then((data) => {
              localStorage.setItem('pma_token', data.token);
              dispatch(setCredentials(data));
            });
          dispatch(setMessageUser(ModalText.PROFILE_UPDATE));
        })
        .catch((er) => handleClose());

    handleClose();
  };

  const handleDelete = async () => {
    await deleteUser(idUser!);
    dispatch(logOut());
    navigate('/');
    handleClose();
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(setMessageUser(''));
    }, 4000);
  }),
    [isMessageUser];
  return (
    <>
      {error && <Toast message={(error as ErrorResponse).data.message} />}
      {isMessageUser && <Toast message={isMessageUser} />}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <span style={{ color: 'red', fontWeight: 'bold' }}>
            {isModalType ? 'Delete user' : 'Update profile'}
          </span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {isModalType ? ModalText.DELETE : ModalText.UPDATE}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={isModalType ? handleDelete : handleUpdate} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalUpdateUser;
