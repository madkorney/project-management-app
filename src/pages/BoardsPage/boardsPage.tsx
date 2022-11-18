import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useAppSelector } from 'redux/hooks';
import { useGetBoardsSetByUserIdQuery } from 'services';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import './boardsPage.scss';

const BoardsPage = () => {
  const userId = useAppSelector((store) => store.auth.user.id) as string;
  const { data } = useGetBoardsSetByUserIdQuery(userId);

  const handleDeleteClick = (event: React.MouseEvent) => {
    console.log(event.target);
  };

  return (
    <div className="boards-container">
      {data &&
        data.map((board) => (
          <Card sx={{ width: 240, backgroundColor: '#b4b4b4' }} key={board._id}>
            <CardContent>
              <Typography variant="h5">{board.title}</Typography>
              <Typography>{board.description}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained">
                Open
              </Button>
              <DeleteForeverOutlinedIcon
                id={board._id}
                onClick={handleDeleteClick}
                fontSize="large"
                sx={{ marginLeft: 'auto' }}
              />
            </CardActions>
          </Card>
        ))}
    </div>
  );
};

export default BoardsPage;
