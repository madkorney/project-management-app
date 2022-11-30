import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

import styles from '../header.module.scss';
import LanguageIcon from '@mui/icons-material/Language';
import { TFunction } from 'i18next';

type AuthorizationButtonsProps = {
  onSignIn: () => void;
  onSignUp: () => void;
  langClick: () => void;
  buttonLangText: string;
  t: TFunction<'translation', undefined>;
};

export const HeaderUserLinks = ({
  onSignIn,
  onSignUp,
  langClick,
  buttonLangText,
  t,
}: AuthorizationButtonsProps) => {
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
      <li>
        <Button
          className={styles.MuiButtonBase}
          startIcon={<LanguageIcon className={styles.headerButton} />}
          onClick={langClick}
        >
          <span className={styles.headerTextButton}>{buttonLangText === 'ru' ? 'en' : 'ru'}</span>
        </Button>
      </li>
    </>
  );
};
