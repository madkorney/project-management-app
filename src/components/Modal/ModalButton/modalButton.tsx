import { Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';

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
        size={mode === 'confirm' ? 'small' : undefined}
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
        {mode === 'task' || mode == 'add' ? (
          <Typography className={styleText} noWrap={mode === 'task'}>
            {buttonText}
          </Typography>
        ) : (
          <span className={styleText}>{buttonText}</span>
        )}
      </Button>
    );
  } else {
    return (
      <Button
        onClick={onClick}
        variant={mode === 'confirm' ? 'contained' : undefined}
        size="small"
        sx={{
          fontSize: 18,
          'span:first-child': {
            marginRight: 0,
            display: 'flex',
            alignItems: 'center',
          },
        }}
        startIcon={<DeleteIcon sx={{ width: '22px', height: '22px', marginRight: 0 }} />}
      />
    );
  }
};
