import styles from '../Authorization.module.scss';
import { NavLink } from 'react-router-dom';
import React from 'react';

type LinkProps = {
  linkNames: string;
};

export const LinkAuthorization = ({ linkNames }: LinkProps) => {
  return (
    <span className={styles.formText}>
      {linkNames === 'sing-in'
        ? 'Already have an account, please click '
        : "Don't have an account. Click "}
      <NavLink className={styles.formLink} to={`/${linkNames}`}>
        Here
      </NavLink>
    </span>
  );
};
