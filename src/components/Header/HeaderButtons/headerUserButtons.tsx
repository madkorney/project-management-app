import Modal from 'components/Modal';
import { BoardForm } from 'components/Forms/ModalForm';

import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LanguageIcon from '@mui/icons-material/Language';

import styles from '../header.module.scss';
import { TFunction } from 'i18next';

type UserButtonProps = {
  openUserPage: boolean;
  onClickOut: () => void;
  onClickUser: () => void;
  langClick: () => void;
  buttonLangText: string;
  t: TFunction<'translation', undefined>;
  onGoBoards?: () => void;
};

export const HeaderUserButtons = ({
  openUserPage,
  onClickUser,
  onClickOut,
  onGoBoards,
  langClick,
  buttonLangText,
  t,
}: UserButtonProps) => {
  return (
    <>
      <li onClick={onGoBoards}>
        <Modal
          buttonText={`${t('addBoard')}`}
          title="Add new board"
          style={styles.MuiButtonBase}
          styleText={styles.headerTextButton}
        >
          <BoardForm mode={'add'} />
        </Modal>
      </li>
      <li onClick={onGoBoards}>
        <Button
          className={styles.MuiButtonBase}
          startIcon={<DashboardIcon className={styles.headerButton} />}
          onClick={onClickUser}
        >
          <span className={styles.headerTextButton}>{t('boards')}</span>
        </Button>
      </li>

      {!openUserPage && (
        <li>
          <Button
            className={styles.MuiButtonBase}
            startIcon={<PersonIcon className={styles.headerButton} />}
            onClick={onClickUser}
          >
            <span className={styles.headerTextButton}>{t('profile')}</span>
          </Button>
        </li>
      )}
      <li>
        <Button
          className={styles.MuiButtonBase}
          startIcon={<LogoutIcon className={styles.headerButton} />}
          onClick={onClickOut}
        >
          <span className={styles.headerTextButton}>{t('logOut')}</span>
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
