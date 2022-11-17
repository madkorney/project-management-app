import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { logOut } from 'redux/authSlice';

import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import styles from './header.module.scss';
import { Button, createTheme } from '@mui/material';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthorized } = useAppSelector((state) => state.auth);

  const goOut = () => {
    localStorage.removeItem('pma_token');
    dispatch(logOut());
  };

  const goUserProfile = () => {
    navigate('./user-page');
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <p>Header - Nav - Profile</p>
        <div>
          <nav className={styles.headerNav}>
            <ul className={styles.headerNav}>
              <li>
                <Link to="/">main</Link>
              </li>
              <li>
                <Link to="about">about</Link>
              </li>
              {!isAuthorized && (
                <>
                  <li>
                    <Link to="sign-in">Sign in</Link>
                  </li>
                  <li>
                    <Link to="sign-up">Sign up</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
        {isAuthorized && (
          <ul className={styles.headerNavUser}>
            <li>
              <Button
                className={styles.MuiButtonBase}
                startIcon={<PersonIcon className={styles.headerButton} />}
                onClick={goUserProfile}
              >
                <span className={styles.headerTextButton}>profile</span>
              </Button>
            </li>
            <li>
              <Button
                className={styles.MuiButtonBase}
                startIcon={<ExitToAppIcon className={styles.headerButton} />}
                onClick={goOut}
              >
                <span className={styles.headerTextButton}>Log Out</span>
              </Button>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
