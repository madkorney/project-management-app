import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

type ModalPropsType = {
  children: JSX.Element;
  buttonText: string;
  title: string;
  mode?: string;
};

const Modal = ({ children, buttonText, title, mode }: ModalPropsType) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen}>{buttonText}</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        {mode === 'confirm' && (
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export default Modal;
