import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import Modal from 'components/Modal/modal';
import { BoardType } from 'types';

const Board = (board: BoardType) => {
  return (
    <Card sx={{ width: 240, backgroundColor: '#b4b4b4' }}>
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
  );
};

export default Board;
