import { useState } from 'react';
import { useDeleteColumnByIdMutation, useGetTasksQuery } from 'services';
import { ColumnType } from 'types';

import { Card, CardContent, CardActions, Button, CardHeader } from '@mui/material';
import { Modal } from 'components';
import TaskForm from 'components/Forms/taskForm';
import EditColumnTitle from './editColumnTitle';

const BoardColumn = (column: ColumnType) => {
  const [deleteColumnById] = useDeleteColumnByIdMutation();
  const [isEditColumnTitle, setIsEditColumnTitle] = useState(false);

  const { data } = useGetTasksQuery({ boardId: column.boardId, columnId: column._id });

  const handleDelete = async () => {
    await deleteColumnById({ boardId: column.boardId, _id: column._id });
  };

  const handleClickColumnTitle = () => {
    setIsEditColumnTitle(!isEditColumnTitle);
  };

  const handleSubmit = async () => {
    handleClickColumnTitle();
  };

  return (
    <Card className="board-column" sx={{ width: 240, backgroundColor: '#f4f4f4' }}>
      {!isEditColumnTitle ? (
        <CardHeader
          className="column-title"
          title={column.title}
          onClick={handleClickColumnTitle}
        />
      ) : (
        <EditColumnTitle title={column.title} onSubmit={handleSubmit} />
      )}
      <CardContent className="column-tasks">
        {data && data.map((task) => <Button key={task._id}>{task.title}</Button>)}
      </CardContent>
      <CardActions>
        <Modal buttonText="+ Add task" title="Add task">
          <TaskForm boardId={column.boardId} columnId={column._id} mode="add" />
        </Modal>
        <Modal title="Delete column" mode="confirm" onConfirm={handleDelete}>
          <p>You want to delete this column. Are you sure?</p>
        </Modal>
      </CardActions>
    </Card>
  );
};

export default BoardColumn;
