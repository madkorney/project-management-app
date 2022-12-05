import { NavLink } from 'react-router-dom';

import styles from 'global-styles/authorization.module.scss';
import { Typography } from '@mui/material';

type LinkProps = {
  linkName: string;
};

export const LinkAuthorization = ({ linkName }: LinkProps) => {
  return (
    <Typography className={styles.formText} variant="body2">
      {linkName === 'sign-in' ? 'Already have an account? ' : "Don't have an account? "}
      <NavLink className={styles.formLink} to={`/${linkName}`}>
        Click here
      </NavLink>
    </Typography>
  );
};
