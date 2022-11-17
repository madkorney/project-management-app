import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import styles from '../header.module.scss';

type UserButtonProps = {
  openUserPage: boolean;
  onClickOut: () => void;
  onClickUser: () => void;
};

export const UserButtons = ({ openUserPage, onClickUser, onClickOut }: UserButtonProps) => {
  return (
    <ul className={styles.headerNavUser}>
      <li>
        {!openUserPage && (
          <Button
            className={styles.MuiButtonBase}
            startIcon={<PersonIcon className={styles.headerButton} />}
            onClick={onClickUser}
          >
            <span className={styles.headerTextButton}>profile</span>
          </Button>
        )}
      </li>
      <li>
        <Button
          className={styles.MuiButtonBase}
          startIcon={<ExitToAppIcon className={styles.headerButton} />}
          onClick={onClickOut}
        >
          <span className={styles.headerTextButton}>Log Out</span>
        </Button>
      </li>
    </ul>
  );
};
