import { Typography } from '@mui/material';
import styles from './notFoundPage.module.scss';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className={styles.page}>
      <h2 className={styles.pageTitle}>
        Ooops... <span className={styles.pageSpan}>404</span>!
      </h2>
      <Typography sx={{ fontSize: '22px', marginBottom: '10px' }}>
        This page does not exist!
      </Typography>
      <Typography sx={{ fontSize: '22px' }}>
        Please click{' '}
        {
          <Link className={styles.pageLink} to="/">
            here{' '}
          </Link>
        }
        or any button. And if you want, you can even click on the logo!
      </Typography>
    </div>
  );
};

export default NotFoundPage;
