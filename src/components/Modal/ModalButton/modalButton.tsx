import { Button, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';

import styles from './ModalButton.module.scss';

type ModalButtonProps = {
  onClick: () => void;
  style?: string;
  buttonText?: string;
  mode?: string;
  styleText?: string;
};

export const ModalButton = ({ onClick, style, buttonText, mode, styleText }: ModalButtonProps) => {
  if (buttonText) {
    return (
      <Button
        onClick={onClick}
        variant={mode === 'confirm' ? 'contained' : undefined}
        className={style}
        size="medium"
        startIcon={
          mode === 'confirm' ? (
            <DeleteIcon />
          ) : mode === 'add' ? (
            <PlaylistAddIcon />
          ) : mode === 'edit' ? (
            <BorderColorIcon />
          ) : mode === 'task' ? undefined : (
            <DashboardCustomizeIcon />
          )
        }
      >
        {mode === 'task' || mode == 'add' ? (
          <Typography noWrap={mode === 'task'}>{buttonText}</Typography>
        ) : (
          <span className={styleText}>{buttonText}</span>
        )}
      </Button>
    );
  } else {
    return (
      <IconButton onClick={onClick} className={styles.MuiButtonBase} size="small">
        <DeleteIcon className={styles.MuiSvgIcon} />
      </IconButton>
    );
  }
};
