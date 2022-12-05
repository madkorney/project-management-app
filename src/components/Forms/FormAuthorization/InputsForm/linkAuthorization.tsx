import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Typography } from '@mui/material';

import styles from '../authorization.module.scss';

type LinkProps = {
  linkName: string;
};

export const LinkAuthorization = ({ linkName }: LinkProps) => {
  const { t } = useTranslation();

  return (
    <Typography className={styles.formText} variant="body2">
      {linkName === 'sign-in' ? t('auth.registered.yes') : t('auth.registered.no')}
      <NavLink className={styles.formLink} to={`/${linkName}`}>
        {t('auth.link')}
      </NavLink>
    </Typography>
  );
};
