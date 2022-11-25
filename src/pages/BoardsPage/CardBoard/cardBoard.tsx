import { Link } from 'react-router-dom';

import {
  useDeleteBoardByIdMutation,
  useDeleteColumnByIdMutation,
  useDeleteTaskByIdMutation,
  useGetColumnsQuery,
  useGetTasksByBoardIdQuery,
} from 'services';
import { BoardType } from 'types';

import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Modal } from 'components';

const CardBoard = (board: BoardType) => {
  const [deleteBoardById] = useDeleteBoardByIdMutation();
  const [deleteColumnById] = useDeleteColumnByIdMutation();
  const [deleteTaskById] = useDeleteTaskByIdMutation();
  const { data: columns } = useGetColumnsQuery(board._id);
  const { data: tasks } = useGetTasksByBoardIdQuery(board._id);

  const handleDelete = async () => {
    tasks &&
      Promise.all(
        tasks.map(async ({ _id, columnId, boardId }) => {
          await deleteTaskById({ _id, columnId, boardId });
        })
      );

    columns &&
      Promise.all(
        columns.map(async ({ _id, boardId }) => {
          await deleteColumnById({ _id, boardId });
        })
      );

    await deleteBoardById(board._id);
  };

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
          <Link to={board._id}>Open</Link>
        </Button>
        <Modal buttonText="Delete" title="Delete board" mode="confirm" onConfirm={handleDelete}>
          <p>
            You want to delete this board. This will also delete all columns and all tasks in this
            board. Are you sure?
          </p>
        </Modal>
      </CardActions>
    </Card>
  );
};

export default CardBoard;
