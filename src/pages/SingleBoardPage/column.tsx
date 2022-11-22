import { useDeleteColumnByIdMutation } from 'services';
import { ColumnType } from 'types';

import { Card, CardContent, Typography, CardActions } from '@mui/material';
import { Modal } from 'components';
import BoardForm from 'components/Forms/boardForm';

const BoardColumn = (column: ColumnType) => {
  const [deleteColumnById] = useDeleteColumnByIdMutation();

  const handleDelete = async () => {
    await deleteColumnById({ boardId: column.boardId, _id: column._id });
  };

  return (
    <Card className="board-column" sx={{ width: 240, backgroundColor: '#f4f4f4' }}>
      <CardContent>
        <Typography variant="h6">{column.title}</Typography>
      </CardContent>
      <CardActions>
        <Modal buttonText="+ Add task" title="Add task">
          <BoardForm mode="edit" />
        </Modal>
        <Modal buttonText="Delete" title="Delete column" mode="confirm" onConfirm={handleDelete}>
          <p>You want to delete this column. Are you sure?</p>
        </Modal>
      </CardActions>
    </Card>
  );
};

export default BoardColumn;
