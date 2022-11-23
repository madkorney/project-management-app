import { IconButton, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

type EditColumnTitleProps = {
  title: string;
  onSubmit: () => Promise<void>;
};

const EditColumnTitle = ({ title, onSubmit }: EditColumnTitleProps) => {
  return (
    <div className="edit-title">
      <TextField
        hiddenLabel
        id="filled-hidden-label-small"
        defaultValue={title}
        variant="standard"
        size="small"
      />
      <IconButton aria-label="save" onClick={onSubmit} size="small">
        <CheckIcon />
      </IconButton>
      <IconButton aria-label="cancel" onClick={onSubmit} size="small">
        <CloseIcon />
      </IconButton>
    </div>
  );
};

export default EditColumnTitle;
