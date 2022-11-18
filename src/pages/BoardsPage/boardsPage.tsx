import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useAppSelector } from 'redux/hooks';
import { useGetBoardsSetByUserIdQuery } from 'services';

import './boardsPage.scss';

const BoardsPage = () => {
  const userId = useAppSelector((store) => store.auth.user.id) as string;
  const { data } = useGetBoardsSetByUserIdQuery(userId);

  return (
    <div className="boards-container">
      {data &&
        data.map((board) => (
          <Card sx={{ width: 240 }} key={board._id}>
            <CardContent>
              <Typography variant="h5">{board.title}</Typography>
              <Typography>{board.description}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained">
                Learn More
              </Button>
            </CardActions>
          </Card>
        ))}
    </div>
  );
};

export default BoardsPage;
