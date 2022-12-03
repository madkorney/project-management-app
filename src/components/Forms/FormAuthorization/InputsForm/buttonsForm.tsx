import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import Modal from 'components/Modal/modal';
import { ModalText } from 'pages/UserPage/userPage';

import styles from 'global-styles/authorization.module.scss';
import { useTranslation } from 'react-i18next';

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
        {t('updateUser')}
      </Button>
      <Modal
        buttonText={`${t('delUser')}`}
        title="Delete user"
        mode="confirm"
        onConfirm={isConfirm}
      >
        <p>{ModalText.DELETE}</p>
      </Modal>
    </div>
  ) : (
    <Button className={styles.formButton} variant="contained" type="submit">
      {formName}
    </Button>
  );
};
