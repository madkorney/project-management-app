import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useAppSelector } from 'redux/hooks';
import { useGetBoardsSetByUserIdQuery } from 'services';

import './boardsPage.scss';
import Modal from 'components/Modal/modal';

const BoardsPage = () => {
  const userId = useAppSelector((store) => store.auth.user.id) as string;
  const { data } = useGetBoardsSetByUserIdQuery(userId);

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
              <Button
                size="small"
                variant="contained"
                sx={{ marginRight: 'auto' }}
                aria-label="Delete board"
              >
                Open
              </Button>
              <Modal buttonText="X" title="board" mode="delete" id={board._id}>
                <p>You want to delete this board. Are you sure?</p>
              </Modal>
            </CardActions>
          </Card>
        ))}
    </div>
  );
};

export default BoardsPage;
