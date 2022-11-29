import { Children, cloneElement, isValidElement, ReactNode, useState } from 'react';

import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';

type ModalPropsType = {
  children: JSX.Element;
  buttonText?: string;
  title: string;
  mode?: string;
  style?: string;
  styleText?: string;
  onConfirm?: () => Promise<void>;
};

const Modal = ({
  children,
  buttonText,
  title,
  mode,
  onConfirm,
  style,
  styleText,
}: ModalPropsType) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    onConfirm?.();
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant={mode === 'confirm' ? 'contained' : undefined}
        className={style}
        size="small"
        startIcon={
          mode === 'confirm' ? (
            <DeleteIcon />
          ) : mode === 'add' ? (
            <PlaylistAddIcon />
          ) : mode === 'edit' ? (
            <BorderColorIcon />
          ) : mode === 'task' ? undefined : (
            <DashboardCustomizeIcon className={styleText} />
          )
        }
      >
        <Typography className={styleText} noWrap={mode === 'task'}>
          {buttonText}
        </Typography>
      </Button>
      <Dialog open={open} onClose={handleClose} disableRestoreFocus>
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
