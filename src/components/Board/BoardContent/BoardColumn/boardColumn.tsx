import { useState } from 'react';

import {
  useDeleteColumnByIdMutation,
  useDeleteTaskByIdMutation,
  useLazyGetColumnsQuery,
  useGetTasksQuery,
  useUpdateColumnsSetMutation,
} from 'services';
import { ColumnType, ErrorResponse } from 'types';

import { Card, CardContent, CardActions, CardHeader } from '@mui/material';
import { Modal, Toast } from 'components';
import { ColumnForm, TaskForm } from 'components/Forms';
import Task from './Task';

const BoardColumn = (column: ColumnType) => {
  const { _id, boardId, order, title } = column;
  const [isEditColumnTitle, setIsEditColumnTitle] = useState(false);

  const [deleteColumnById] = useDeleteColumnByIdMutation();
  const [deleteTaskById] = useDeleteTaskByIdMutation();
  const [getColumns] = useLazyGetColumnsQuery();
  const [updateColumnsSet, { error }] = useUpdateColumnsSetMutation();
  const { data: tasks } = useGetTasksQuery({ boardId, columnId: _id });

  const handleDelete = async () => {
    tasks &&
      Promise.all(
        tasks.map(async ({ _id, columnId, boardId }) => {
          await deleteTaskById({ _id, columnId, boardId });
        })
      );

    await deleteColumnById({ boardId, _id });

    const columns = (await getColumns(boardId)).data;

    if (columns) {
      if (order < columns.length - 1) {
        const newParamsColumn = columns
          .filter((column) => column.order > order)
          .map((column) => ({ _id: column._id, order: column.order - 1 }));

        await updateColumnsSet(newParamsColumn);
      }
    }
  };

  const handleClickColumnTitle = () => {
    setIsEditColumnTitle(!isEditColumnTitle);
  };

  return (
    <Card className="board-column" sx={{ width: 240, backgroundColor: '#f4f4f4' }}>
      {!isEditColumnTitle ? (
        <CardHeader className="column-title" title={title} onClick={handleClickColumnTitle} />
      ) : (
        <ColumnForm
          mode="edit"
          boardId={boardId}
          column={column}
          onClose={handleClickColumnTitle}
        />
      )}
      <CardContent className="column-tasks">
        {tasks &&
          tasks
            .slice()
            .sort((prevTask, curTask) => prevTask.order - curTask.order)
            .map((task) => <Task {...task} key={task._id} />)}
      </CardContent>
      <CardActions className="column-actions">
        <Modal buttonText="Add task" title="Add task" mode="add">
          <TaskForm mode="add" boardId={boardId} columnId={_id} />
        </Modal>
        <Modal title="Delete column" mode="confirm" onConfirm={handleDelete}>
          <p>You want to delete this column with all tasks in it. Are you sure?</p>
        </Modal>
      </CardActions>
      {error && <Toast message={(error as ErrorResponse).data.message} />}
    </Card>
  );
};

export default BoardColumn;
