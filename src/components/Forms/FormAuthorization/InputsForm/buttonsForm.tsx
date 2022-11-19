import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

import styles from 'global-styles/authorization.module.scss';

type ButtonProps = {
  userPage?: boolean;
  delUser?: () => void;
  formName: string;
};

export const ButtonsForm = ({ userPage, formName, delUser }: ButtonProps) => {
  return userPage ? (
    <div className={styles.formGroupButton}>
      <Button variant="contained" type="submit" startIcon={<SendIcon />}>
        Update
      </Button>
      <Button variant="contained" onClick={delUser} startIcon={<DeleteIcon />}>
        Delete
      </Button>
    </div>
  ) : (
    <Button className={styles.formButton} variant="contained" type="submit">
      {formName}
    </Button>
  );
};
