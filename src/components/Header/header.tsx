import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { logOut } from 'redux/authSlice';

import { useEffect, useState } from 'react';
import { HeaderUserButtons } from './HeaderButtons';

import styles from './header.module.scss';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [openUserPage, setOpenUserPage] = useState(false);
  const { isAuthorized } = useAppSelector((state) => state.auth);

  const goOut = () => {
    localStorage.removeItem('pma_token');
    dispatch(logOut());
    navigate('/');
    setOpenUserPage(false);
  };

  const goUserProfile = () => {
    navigate('/user-page');
    setOpenUserPage(true);
  };

  useEffect(() => {
    location.pathname.includes('user-page') && setOpenUserPage(true);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <p>Header - Nav - Profile</p>
        <div>
          <nav className={styles.headerNav}>
            <ul className={styles.headerNav}>
              <li onClick={() => setOpenUserPage(false)}>
                <Link to="/">main</Link>
              </li>
              <li onClick={() => setOpenUserPage(false)}>
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
          <HeaderUserButtons
            openUserPage={openUserPage}
            onClickOut={goOut}
            onClickUser={goUserProfile}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
