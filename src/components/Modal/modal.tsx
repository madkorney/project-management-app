import { Children, cloneElement, isValidElement, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ModalButton } from './ModalButton/modalButton';

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
  const { t } = useTranslation();

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
      <ModalButton
        onClick={handleClickOpen}
        mode={mode}
        style={style}
        styleText={styleText}
        buttonText={buttonText}
      />
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
              {t('delete.common')}
            </Button>
            <Button onClick={handleClose}>{t('cancel')}</Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export default Modal;
