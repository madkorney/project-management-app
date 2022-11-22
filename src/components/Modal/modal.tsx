import { Children, cloneElement, isValidElement, ReactNode, useState } from 'react';

import { useAppDispatch } from 'redux/hooks';
import { setOpenUserPage } from 'redux/authSlice';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

import { ModalText } from 'pages/UserPage/userPage';

type ModalPropsType = {
  children: JSX.Element;
  buttonText?: string;
  title: string;
  mode?: string;
  onConfirm?: () => Promise<void>;
};

const Modal = ({ children, buttonText, title, mode, onConfirm }: ModalPropsType) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    onConfirm?.();
    setOpen(false);
    if (title === ModalText.DELETE_USER) {
      dispatch(setOpenUserPage(false));
    }
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant={mode === 'confirm' ? 'contained' : 'outlined'}
        size="small"
        startIcon={mode === 'confirm' && <DeleteIcon />}
        sx={{ minWidth: 'auto' }}
      >
        {buttonText}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {title}
          {mode !== 'confirm' && (
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
        <DialogContent>
          {Children.map<ReactNode, ReactNode>(children, (child) => {
            return isValidElement(child)
              ? cloneElement(child, {
                  ...child.props,
                  onClose: handleClose,
                })
              : null;
          })}
        </DialogContent>
        {mode === 'confirm' && (
          <DialogActions>
            <Button autoFocus onClick={handleConfirm}>
              Delete
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export default Modal;
