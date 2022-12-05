import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import { TECHNOLOGIES } from 'data/constants';

export const Stack = () => (
  <div className="main-technology-list">
    {TECHNOLOGIES.map((tech, index) => (
      <Card key={index}>
        <CardActionArea href={tech.link}>
          <CardMedia
            component="img"
            image={tech.image}
            alt={tech.name}
            sx={{
              backgroundColor: '#ffffff',
              objectFit: 'contain',
              p: 1,
            }}
          />
          <CardContent sx={{ p: 0.5 }}>
            <Typography sx={{ textAlign: 'center', color: '#1b3c6c' }}>{tech.name}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    ))}
  </div>
);
