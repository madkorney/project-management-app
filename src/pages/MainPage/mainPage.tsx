import { useTranslation } from 'react-i18next';

import { CardMedia, Typography } from '@mui/material';
import { Pros, Stack, Team } from 'components/Welcome';

import video from 'assets/working.webp';

import './mainPage.scss';

const MainPage = () => {
  const { t } = useTranslation();

  return (
    <section>
      <div className="main-content">
        <div>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {t('main.question')}
          </Typography>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            {t('main.answer')}
          </Typography>
        </div>
        <CardMedia component="img" image={video} sx={{ maxWidth: 600, paddingTop: 1 }} />
      </div>
      <Pros />
      <Typography>{t('main.stack')}</Typography>
      <Stack />
      <Team />
      <Typography variant="h6" sx={{ marginTop: 2, paddingBottom: 2, textAlign: 'center' }}>
        {t('main.feedback')}
      </Typography>
    </section>
  );
};

export default MainPage;
