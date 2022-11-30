import Modal from 'components/Modal';
import { BoardForm } from 'components/Forms/ModalForm';

import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';

import styles from '../header.module.scss';

type UserButtonProps = {
  openUserPage: boolean;
  onClickOut: () => void;
  onClickUser: () => void;
  onGoBoards?: () => void;
};

export const HeaderUserButtons = ({
  openUserPage,
  onClickUser,
  onClickOut,
  onGoBoards,
}: UserButtonProps) => {
  return (
    <>
      <li onClick={onGoBoards}>
        <Modal
          buttonText="Add board"
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
          <span className={styles.headerTextButton}>boards</span>
        </Button>
      </li>

      {!openUserPage && (
        <li>
          <Button
            className={styles.MuiButtonBase}
            startIcon={<PersonIcon className={styles.headerButton} />}
            onClick={onClickUser}
          >
            <span className={styles.headerTextButton}>profile</span>
          </Button>
        </li>
      )}
      <li>
        <Button
          className={styles.MuiButtonBase}
          startIcon={<LogoutIcon className={styles.headerButton} />}
          onClick={onClickOut}
        >
          <span className={styles.headerTextButton}>Log Out</span>
        </Button>
      </li>
    </>
  );
};
