import { Link } from 'react-router-dom';

import { useAppDispatch } from 'redux/hooks';
import { setOpenUserPage } from 'redux/authSlice';

import LOGO from 'img/logo.svg';

import styles from '../header.module.scss';

export const HeaderLogo = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.headerLogo} onClick={() => dispatch(setOpenUserPage(false))}>
      <Link to="/">
        <svg className={styles.headerLogoImg}>
          <use xlinkHref={`${LOGO}#logo`} />
        </svg>
      </Link>
    </div>
  );
};
