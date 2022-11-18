import { Children, cloneElement, isValidElement, ReactNode, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useDeleteBoardByIdMutation } from 'services';

type ModalPropsType = {
  children: JSX.Element;
  buttonText: string;
  title: string;
  mode?: string;
  id?: string;
};

const Modal = ({ children, buttonText, title, mode, id }: ModalPropsType) => {
  const [open, setOpen] = useState(false);
  const [deleteBoard] = useDeleteBoardByIdMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    switch (title) {
      case 'board':
        await deleteBoard(id as string);
        break;
      default:
        return;
    }

    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen} variant="outlined" size="small">
        {buttonText}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {title}
          {mode !== 'delete' && (
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <Close />
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
        {mode === 'delete' && (
          <DialogActions>
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export default Modal;
