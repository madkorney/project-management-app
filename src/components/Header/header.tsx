import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { logOut, setOpenUserPage, setUserLang } from 'redux/authSlice';

import { HeaderUserButtons, HeaderUserLinks } from './HeaderButtons';
import { HeaderBurger } from './HeaderBurger/headerBurger';
import { HeaderLogo } from './HeaderLogo/headerLogo';
import { LangButton } from './LangButton/langButton';

import styles from './header.module.scss';

type PropHeader = {
  bg: string;
};

const Header = ({ bg }: PropHeader) => {
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
      i18n.changeLanguage('ru');
      setLang('ru');
      dispatch(setUserLang('ru'));
      localStorage.setItem('lang', 'ru');
    }
    if (lang === 'ru') {
      i18n.changeLanguage('en');
      setLang('en');
      dispatch(setUserLang('en'));
      localStorage.setItem('lang', 'en');
    }
  };

  useEffect(() => {
    location.pathname.includes('user-page') && dispatch(setOpenUserPage(true));
  }, [dispatch]);

  return (
    <header className={styles.header} style={{ background: bg }}>
      <div className={styles.headerContainer}>
        <HeaderLogo />
        <div className={styles.headerNavBlock}>
          <nav className={styles.headerNav}>
            <ul className={!isAuthorized ? styles.headerNav : styles.headerNavUser}>
              {!isAuthorized ? (
                <HeaderUserLinks onSignIn={goSignIn} onSignUp={goSignUp} t={t} />
              ) : (
                <HeaderUserButtons
                  openUserPage={isOpenUserPage}
                  onClickOut={goOut}
                  onClickUser={goUserProfile}
                  onGoBoards={goBoards}
                  t={t}
                />
              )}
            </ul>
          </nav>
          <LangButton langClick={handleLanguage} buttonLangText={lang} />
          <HeaderBurger
            func={{
              goSignIn,
              goSignUp,
              goOut,
              goUserProfile,
              goBoards,
            }}
            t={t}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
