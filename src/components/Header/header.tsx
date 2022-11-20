import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { logOut, setOpenUserPage } from 'redux/authSlice';

import { HeaderUserButtons, HeaderUserLinks } from './HeaderButtons';

import styles from './header.module.scss';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthorized, isOpenUserPage } = useAppSelector((state) => state.auth);

  const goOut = () => {
    localStorage.removeItem('pma_token');
    dispatch(logOut());
    dispatch(setOpenUserPage(false));
    navigate('/');
  };

  const closeUserProfile = () => {
    if (isOpenUserPage) dispatch(setOpenUserPage(false));
  };

  const goUserProfile = () => {
    navigate('/user-page');
    dispatch(setOpenUserPage(true));
  };

  useEffect(() => {
    location.pathname.includes('user-page') && dispatch(setOpenUserPage(true));
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <p>Header - Nav - Profile</p>
        <div>
          <nav className={styles.headerNav}>
            <ul className={styles.headerNav}>
              <li onClick={closeUserProfile}>
                <Link to="/">main</Link>
              </li>
              <li onClick={closeUserProfile}>
                <Link to="about">about</Link>
              </li>
              {!isAuthorized && <HeaderUserLinks />}
            </ul>
          </nav>
        </div>
        {isAuthorized && (
          <HeaderUserButtons
            openUserPage={isOpenUserPage}
            onClickOut={goOut}
            onClickUser={goUserProfile}
            closeUserLink={closeUserProfile}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
