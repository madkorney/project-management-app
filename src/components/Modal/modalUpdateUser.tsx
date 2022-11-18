import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setOpenUpdateModal, setCloseModal } from 'redux/modalUserSlice';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const ModalUpdateUser = () => {
  const dispatch = useAppDispatch();
  const { open, textUpdate, textDelete, modalType } = useAppSelector((state) => state.userSettings);

  const handleClose = () => {
    dispatch(setCloseModal(false));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Warning'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {modalType === 'delete' ? textDelete : textUpdate}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleClose} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalUpdateUser;
