import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { TECHNOLOGIES } from 'data/constants';

import './mainPage.scss';

const MainPage = () => {
  return (
    <section className="welcome-page">
      <h1 className="main-question">
        Dont know what to do next and what your teammates responsible for?
      </h1>
      <p className="main-answer">
        With the Project Tracker you can effectively manage your projects, share with teammates,
        make a plan of your work and control all stages of your project.
      </p>
      <p>With our app you can:</p>
      <ul className="main-pros">
        <li>create boards for your projects with description</li>
        <li>create columns with any title uou want</li>
        <li>rearrange columns if necessary</li>
        <li>create tasks in each column and assign teammates to tasks</li>
        <li>rearrange tasks within one column or even between columns</li>
        <li>create unlimited number of projects, columns ans tasks</li>
        <li>edit/delete boards/columns/tasks</li>
        <li>free a lot of time to work with your projects</li>
      </ul>

      <p className="main-answer">Use Project Tracker and leave feedback!</p>

      <p>
        Our app created as a final project of course RS School React 2022 Q3 with a stack of
        technologies
      </p>
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
                <Typography sx={{ textAlign: 'center' }}>{tech.name}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
      <h3>Our team</h3>
      <div className="main-team">
        <Card className="main-team-member">
          <CardMedia component="img" image="https://avatars.githubusercontent.com/u/1611438?v=4" />
          <CardContent>
            <Typography variant="h5">Sergey</Typography>
            <Typography>Team-lead, project config</Typography>
          </CardContent>
        </Card>
        <Card className="main-team-member">
          <CardMedia component="img" image="https://avatars.githubusercontent.com/u/96052707?v=4" />
          <CardContent>
            <Typography variant="h5">Uladzimir</Typography>
            <Typography>Sign-In/Sign-Up and Profile pages, localization, styles</Typography>
          </CardContent>
        </Card>
        <Card className="main-team-member">
          <CardMedia component="img" image="https://avatars.githubusercontent.com/u/81831257?v=4" />
          <CardContent>
            <Typography variant="h5">Aliaksandr</Typography>
            <Typography>
              Welcome, Boards and Single-board pages, modal forms, dragndrop, private/public routes,
              API slices
            </Typography>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MainPage;
