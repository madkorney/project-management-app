import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { logOut } from 'redux/authSlice';

import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import styles from './header.module.scss';

const Header = () => {
  const dispatch = useAppDispatch();
  const { isAuthorized } = useAppSelector((state) => state.auth);
  const user = useAppSelector((state) => state.auth.user);

  const goOut = () => {
    localStorage.removeItem('pma_token');
    dispatch(logOut());
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
            <li className={styles.headerUserName}>
              <AccountCircleRoundedIcon sx={{ color: '#d112b1', fontSize: 30 }} />
              {user.login}
            </li>
            <li>
              <ExitToAppIcon className={styles.headerButton} onClick={goOut} />
              <DeleteOutlineSharpIcon className={styles.headerButton} />
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
