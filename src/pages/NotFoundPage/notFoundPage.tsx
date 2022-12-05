import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './notFoundPage.module.scss';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.page}>
      <Typography variant="h4">
        {t('errorPage.ops')}
        <span className={styles.pageSpan}>404</span>!
      </Typography>
      <Typography sx={{ fontSize: '22px', marginBottom: '10px' }}>
        {t('errorPage.notPage')}
      </Typography>
      <Typography sx={{ fontSize: '22px' }}>
        {t('errorPage.please')}
        <Link className={styles.pageLink} to="/">
          {t('errorPage.click')}
        </Link>
        {t('errorPage.errorText')}
      </Typography>
    </div>
  );
};

export default NotFoundPage;
