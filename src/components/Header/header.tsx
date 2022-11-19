import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { logOut } from 'redux/authSlice';

import { useEffect } from 'react';
import { HeaderUserButtons, HeaderUserLinks } from './HeaderButtons';

import styles from './header.module.scss';
import { setOpenUserPage } from '../../redux/modalUserSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthorized } = useAppSelector((state) => state.auth);
  const { isOpenUserPage } = useAppSelector((state) => state.userSettings);

  const goOut = () => {
    localStorage.removeItem('pma_token');
    dispatch(logOut());
    navigate('/');
    dispatch(setOpenUserPage(false));
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
              <li onClick={() => dispatch(setOpenUserPage(false))}>
                <Link to="/">main</Link>
              </li>
              <li onClick={() => dispatch(setOpenUserPage(false))}>
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
          />
        )}
      </div>
    </header>
  );
};

export default Header;
