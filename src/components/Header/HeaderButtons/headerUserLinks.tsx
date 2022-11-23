import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

import styles from '../header.module.scss';

type AuthorizationButtonsProps = {
  onSignIn: () => void;
  onSignUp: () => void;
};

export const HeaderUserLinks = ({ onSignIn, onSignUp }: AuthorizationButtonsProps) => {
  return (
    <>
      <li>
        <Button
          className={styles.MuiButtonBase}
          startIcon={<LoginIcon className={styles.headerButton} />}
          onClick={onSignIn}
        >
          <span className={styles.headerTextButton}>Sign in</span>
        </Button>
      </li>
      <li>
        <Button
          className={styles.MuiButtonBase}
          startIcon={<AppRegistrationIcon className={styles.headerButton} />}
          onClick={onSignUp}
        >
          <span className={styles.headerTextButton}>Sign up</span>
        </Button>
      </li>
    </>
  );
};
