import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { logOut, setOpenUserPage } from 'redux/authSlice';

import { HeaderUserButtons, HeaderUserLinks } from './HeaderButtons';
import { HeaderBurger } from './HeaderBurger/headerBurger';
import { HeaderLogo } from './HeaderLogo/headerLogo';

import styles from './header.module.scss';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');
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

  const handleLanguage = () => {
    if (lang === 'en') {
      setLang('ru');
      i18n.changeLanguage('ru');
      localStorage.setItem('lang', 'ru');
    }
    if (lang === 'ru') {
      setLang('en');
      i18n.changeLanguage('en');
      localStorage.setItem('lang', 'en');
    }
  };
  useEffect(() => {
    location.pathname.includes('user-page') && dispatch(setOpenUserPage(true));
  }, [dispatch]);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <HeaderLogo />
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
                langClick={handleLanguage}
                buttonLangText={lang}
                t={t}
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
          langClick={handleLanguage}
          buttonLangText={lang}
          t={t}
        />
      </div>
    </header>
  );
};

export default Header;
