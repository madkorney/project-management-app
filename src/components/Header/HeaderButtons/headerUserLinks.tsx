import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import styles from '../header.module.scss';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

type AuthorizationButtonsProps = {
  onSignIn: () => void;
  onSignUp: () => void;
};

export const HeaderUserLinks = ({ onSignIn, onSignUp }: AuthorizationButtonsProps) => {
  return (
    <>
      <li>
        <Button
          className={styles.MuiButtonBase}
          startIcon={<VpnKeyOutlinedIcon className={styles.headerButton} />}
          onClick={onSignIn}
        >
          <span className={styles.headerTextButton}>Sign in</span>
        </Button>
      </li>
      <li>
        <Button
          className={styles.MuiButtonBase}
          startIcon={<AddCircleOutlineOutlinedIcon className={styles.headerButton} />}
          onClick={onSignUp}
        >
          <span className={styles.headerTextButton}>Sign up</span>
        </Button>
      </li>
    </>
  );
};
