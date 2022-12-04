import { useTranslation } from 'react-i18next';

import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { TEAMMATES } from 'data/constants';

type TeamType = {
  name: string;
  did: string;
}[];

export const Team = () => {
  const { t } = useTranslation();

  const teammates: TeamType = t('team.teammates', { returnObjects: true });

  return (
    <div className="main-team">
      {TEAMMATES.map((teammate, index) => (
        <Card className="main-team-member" key={teammate.nick}>
          <CardMedia component="img" image={teammate.avatar} />
          <CardContent>
            <Typography variant="h5">{teammates[index].name}</Typography>
            <Typography>{teammates[index].did}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
