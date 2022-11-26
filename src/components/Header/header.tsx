import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { logOut, setOpenUserPage } from 'redux/authSlice';

import { HeaderUserButtons, HeaderUserLinks } from './HeaderButtons';
import { HeaderBurger } from './HeaderBurger/headerBurger';

import styles from './header.module.scss';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthorized, isOpenUserPage } = useAppSelector((state) => state.auth);

  const goOut = () => {
    localStorage.removeItem('pma_token');
    dispatch(logOut());
    navigate('/');
  };

  const goUserProfile = () => {
    navigate('/user-page');
    dispatch(setOpenUserPage(true));
  };

  const goBoards = () => {
    navigate('/boards');
    dispatch(setOpenUserPage(false));
  };

  const goSignIn = () => {
    navigate('/sign-in');
  };

  const goSignUp = () => {
    navigate('/sign-up');
  };

  useEffect(() => {
    location.pathname.includes('user-page') && dispatch(setOpenUserPage(true));
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <p>Header - Nav - Profile</p>
        <nav className={styles.headerNav}>
          <ul className={!isAuthorized ? styles.headerNav : styles.headerNavUser}>
            {!isAuthorized ? (
              <HeaderUserLinks onSignIn={goSignIn} onSignUp={goSignUp} />
            ) : (
              <HeaderUserButtons
                openUserPage={isOpenUserPage}
                onClickOut={goOut}
                onClickUser={goUserProfile}
                onGoBoards={goBoards}
              />
            )}
          </ul>
        </nav>
        <HeaderBurger
          func={{
            goSignIn,
            goSignUp,
            goOut,
            goUserProfile,
            goBoards,
          }}
        />
      </div>
    </header>
  );
};

export default Header;
