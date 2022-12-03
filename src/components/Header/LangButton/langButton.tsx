import { Button } from '@mui/material';
import styles from '../header.module.scss';
import LanguageIcon from '@mui/icons-material/Language';

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
