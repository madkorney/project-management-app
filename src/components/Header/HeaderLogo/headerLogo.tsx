import { Link } from 'react-router-dom';

import LOGO from 'img/logo.svg';

import styles from '../header.module.scss';

export const HeaderLogo = () => {
  return (
    <div className={styles.headerLogo}>
      <Link to="/">
        <svg className={styles.headerLogoImg}>
          <use xlinkHref={`${LOGO}#logo`} />
        </svg>
      </Link>
    </div>
  );
};
