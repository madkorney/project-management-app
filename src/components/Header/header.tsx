import React from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../redux/hooks';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import styles from './header.module.scss';

const Header = () => {
  const { userAuthorized } = useAppSelector((state) => state.authorized);
  const name = localStorage.getItem('LoginUser');

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
              <ExitToAppIcon className={styles.headerButton} />
              <DeleteOutlineSharpIcon className={styles.headerButton} />
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
