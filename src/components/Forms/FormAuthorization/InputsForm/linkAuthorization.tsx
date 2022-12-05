import { NavLink } from 'react-router-dom';

import styles from '../authorization.module.scss';

type LinkProps = {
  linkName: string;
};

export const LinkAuthorization = ({ linkName }: LinkProps) => {
  return (
    <span className={styles.formText}>
      {linkName === 'sign-in' ? 'Already have an account? ' : "Don't have an account? "}
      <NavLink className={styles.formLink} to={`/${linkName}`}>
        Click Here
      </NavLink>
    </span>
  );
};
