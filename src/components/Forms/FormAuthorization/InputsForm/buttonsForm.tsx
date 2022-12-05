import { useTranslation } from 'react-i18next';

import { Button, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Modal from 'components/Modal/modal';

import styles from '../authorization.module.scss';

type ButtonProps = {
  formName: string;
  isConfirm: () => Promise<void>;
  userPage?: boolean;
};

export const ButtonsForm = ({ userPage, formName, isConfirm }: ButtonProps) => {
  const { t } = useTranslation();
  return userPage ? (
    <div className={styles.formGroupButton}>
      <Button variant="contained" type="submit" startIcon={<SendIcon />} size="medium">
        {t('update')}
      </Button>
      <Modal
        buttonText={t('delete.common')}
        title={t('delete.user')}
        mode="confirm"
        onConfirm={isConfirm}
      >
        <Typography>{t('confirmation.user')}</Typography>
      </Modal>
    </div>
  ) : (
    <Button className={styles.formButton} variant="contained" type="submit">
      {formName}
    </Button>
  );
};
