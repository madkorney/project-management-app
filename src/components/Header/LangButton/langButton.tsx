import { Button } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

import styles from '../header.module.scss';

type LangProps = {
  langClick: () => void;
  buttonLangText: string;
};

export const LangButton = ({ langClick, buttonLangText }: LangProps) => {
  return (
    <div className={styles.headerLang}>
      <Button
        className={styles.MuiButtonBase}
        startIcon={<LanguageIcon className={styles.headerButton} />}
        onClick={langClick}
      >
        <span className={styles.headerTextButton}>{buttonLangText}</span>
      </Button>
    </div>
  );
};
