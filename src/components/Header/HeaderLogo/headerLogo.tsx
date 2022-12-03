import { Link } from 'react-router-dom';

import LOGO from 'img/logo.svg';

import styles from '../header.module.scss';
import { useAppDispatch } from 'redux/hooks';
import { setOpenUserPage } from 'redux/authSlice';

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
