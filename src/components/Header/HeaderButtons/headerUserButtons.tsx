import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Modal from 'components/Modal/modal';
import AddBoard from 'components/Forms/addBoard';

import styles from '../header.module.scss';

type UserButtonProps = {
  openUserPage: boolean;
  onClickOut: () => void;
  onClickUser: () => void;
  closeUserLink: () => void;
};

export const HeaderUserButtons = ({
  openUserPage,
  onClickUser,
  onClickOut,
  closeUserLink,
}: UserButtonProps) => {
  return (
    <ul className={styles.headerNavUser}>
      <li onClick={closeUserLink}>
        <Modal buttonText="+ Add new board" title="Add new board">
          <AddBoard />
        </Modal>
      </li>
      <li onClick={closeUserLink}>
        <Link to="boards">boards</Link>
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
          startIcon={<ExitToAppIcon className={styles.headerButton} />}
          onClick={onClickOut}
        >
          <span className={styles.headerTextButton}>Log Out</span>
        </Button>
      </li>
    </ul>
  );
};
