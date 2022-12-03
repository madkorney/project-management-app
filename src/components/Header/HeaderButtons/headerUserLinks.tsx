import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

import { TFunction } from 'i18next';

import styles from '../header.module.scss';

type AuthorizationButtonsProps = {
  onSignIn: () => void;
  onSignUp: () => void;
  t: TFunction<'translation', undefined>;
};

export const HeaderUserLinks = ({ onSignIn, onSignUp, t }: AuthorizationButtonsProps) => {
  return (
    <>
      <li>
        <Button
          className={styles.MuiButtonBase}
          startIcon={<LoginIcon className={styles.headerButton} />}
          onClick={onSignIn}
        >
          <span className={styles.headerTextButton}>{t('signIn')}</span>
        </Button>
      </li>
      <li>
        <Button
          className={styles.MuiButtonBase}
          startIcon={<AppRegistrationIcon className={styles.headerButton} />}
          onClick={onSignUp}
        >
          <span className={styles.headerTextButton}>{t('signUp')}</span>
        </Button>
      </li>
    </>
  );
};
