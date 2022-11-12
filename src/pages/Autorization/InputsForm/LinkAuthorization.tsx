import styles from '../Authorization.module.scss';
import { NavLink } from 'react-router-dom';
import React from 'react';

type LinkProps = {
  linkNames: string;
};

export const LinkAuthorization = ({ linkNames }: LinkProps) => {
  return (
    <span className={styles.formText}>
      {linkNames === 'sing-in' ? 'Already have an account. ' : "Don't have an account. "}
      <NavLink className={styles.formLink} to={`/${linkNames}`}>
        Click Here
      </NavLink>
    </span>
  );
};
