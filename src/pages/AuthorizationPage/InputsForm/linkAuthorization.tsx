import { NavLink } from 'react-router-dom';

import styles from '../authorization.module.scss';

type LinkProps = {
  linkNames: string;
};

export const LinkAuthorization = ({ linkNames }: LinkProps) => {
  return (
    <span className={styles.formText}>
      {linkNames === 'sign-in' ? 'Already have an account. ' : "Don't have an account. "}
      <NavLink className={styles.formLink} to={`/${linkNames}`}>
        Click Here
      </NavLink>
    </span>
  );
};
