import { useTranslation } from 'react-i18next';
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

type ProsType = {
  id: number;
  pro: string;
}[];

export const Pros = () => {
  const { t } = useTranslation();

  const pros: ProsType = t('pros.all', { returnObjects: true });

  return (
    <>
      <Typography sx={{ marginTop: 2 }}>{t('pros.description')}</Typography>
      <List>
        {pros.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <CheckIcon />
            </ListItemIcon>
            <ListItemText primary={item.pro} />
          </ListItem>
        ))}
      </List>
    </>
  );
};
