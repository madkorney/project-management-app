import { useState } from 'react';
import { useDeleteColumnByIdMutation, useDeleteTaskByIdMutation, useGetTasksQuery } from 'services';
import { ColumnType } from 'types';

import { Card, CardContent, CardActions, CardHeader } from '@mui/material';
import { Modal } from 'components';
import TaskForm from 'components/Forms/taskForm';
import ColumnForm from 'components/Forms/columnForm';
import Task from './task';

const BoardColumn = (column: ColumnType) => {
  const [deleteColumnById] = useDeleteColumnByIdMutation();
  const [deleteTaskById] = useDeleteTaskByIdMutation();
  const [isEditColumnTitle, setIsEditColumnTitle] = useState(false);

  const { data } = useGetTasksQuery({ boardId: column.boardId, columnId: column._id });

  const handleDelete = async () => {
    data &&
      Promise.all(
        data.map(async (task) => {
          await deleteTaskById({ _id: task._id, columnId: task.columnId, boardId: task.boardId });
        })
      );

    await deleteColumnById({ boardId: column.boardId, _id: column._id });
  };

  const handleClickColumnTitle = () => {
    setIsEditColumnTitle(!isEditColumnTitle);
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
        <ColumnForm
          mode="edit"
          boardId={column.boardId}
          column={column}
          onClose={handleClickColumnTitle}
        />
      )}
      <CardContent className="column-tasks">
        {data && data.map((task) => <Task {...task} key={task._id} />)}
      </CardContent>
      <CardActions>
        <Modal buttonText="Add task" title="Add task" mode="add">
          <TaskForm mode="add" boardId={column.boardId} columnId={column._id} />
        </Modal>
        <Modal title="Delete column" mode="confirm" onConfirm={handleDelete}>
          <p>You want to delete this column with all tasks in it. Are you sure?</p>
        </Modal>
      </CardActions>
    </Card>
  );
};

export default BoardColumn;
