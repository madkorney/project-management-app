import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { setAuthorized } from 'redux/authorizedSlice';

import styles from './Header.module.scss';

const Header = () => {
  const dispatch = useAppDispatch();
  const { userAuthorized } = useAppSelector((state) => state.authorized);
  const name = localStorage.getItem('LoginUser');

  const goOut = () => {
    dispatch(setAuthorized(false));
    localStorage.setItem('LoginUser', '');
    localStorage.setItem('pma_token', '');
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
            </ul>
            {!userAuthorized && (
              <>
                <li>
                  <Link to="sing-in">Sign in</Link>
                </li>
                <li>
                  <Link to="sing-up">Sign up</Link>
                </li>
              </>
            )}
          </nav>
        </div>
        {userAuthorized && (
          <ul className={styles.headerNavUser}>
            <li className={styles.headerUserName}>
              <AccountCircleRoundedIcon sx={{ color: '#d112b1', fontSize: 30 }} />
              {name}
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
