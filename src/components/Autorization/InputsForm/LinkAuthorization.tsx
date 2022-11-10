import styles from '../Authorization.module.scss';
import { NavLink } from 'react-router-dom';
import React from 'react';

type LinkProps = {
  linkNames: string;
};

export const LinkAuthorization = ({ linkNames }: LinkProps) => {
  return (
    <span className={styles.formText}>
      If you have an account, please click{' '}
      <NavLink className={styles.formLink} to={`/${linkNames}`}>
        Here
      </NavLink>
    </span>
  );
};
