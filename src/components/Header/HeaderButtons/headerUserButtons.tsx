import { TFunction } from 'i18next';

import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Modal from 'components/Modal';
import { BoardForm } from 'components/Forms/ModalForm';

import styles from '../header.module.scss';

type UserButtonProps = {
  openUserPage: boolean;
  onClickOut: () => void;
  onClickUser: () => void;

  t: TFunction<'translation', undefined>;
  onGoBoards?: () => void;
};

export const HeaderUserButtons = ({
  openUserPage,
  onClickUser,
  onClickOut,
  onGoBoards,
  t,
}: UserButtonProps) => {
  return (
    <>
      <li onClick={onGoBoards}>
        <Modal
          buttonText={t('add.board')}
          title={t('add.board')}
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
    </>
  );
};
