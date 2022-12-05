import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import {
  useDeleteColumnByIdMutation,
  useDeleteTaskByIdMutation,
  useLazyGetColumnsQuery,
  useUpdateColumnsSetMutation,
  useGetTasksByBoardIdQuery,
} from 'services';
import { ColumnType, ErrorResponse } from 'types';

import { Card, CardContent, CardActions, CardHeader, Typography } from '@mui/material';
import { Modal, Toast } from 'components';
import { ColumnForm, TaskForm } from 'components/Forms/ModalForm';
import Task from './Task';

const BoardColumn = (column: ColumnType) => {
  const { _id, boardId, order, title } = column;
  const [isEditColumnTitle, setIsEditColumnTitle] = useState(false);
  const { t } = useTranslation();

  const [deleteColumnById] = useDeleteColumnByIdMutation();
  const [deleteTaskById] = useDeleteTaskByIdMutation();
  const [getColumns] = useLazyGetColumnsQuery();
  const [updateColumnsSet, { error }] = useUpdateColumnsSetMutation();
  const { data: tasks } = useGetTasksByBoardIdQuery(boardId);

  const handleDelete = async () => {
    tasks &&
      Promise.all(
        tasks
          .filter((task) => task.columnId === _id)
          .map(async ({ _id, columnId, boardId }) => {
            await deleteTaskById({ _id, columnId, boardId });
          })
      );

    await deleteColumnById({ boardId, _id });

    const columns = (await getColumns(boardId)).data;

    if (columns) {
      if (order < columns.length - 1) {
        const newParamsColumn = columns
          .filter((column) => column.order > order)
          .map((column) => ({ ...column, order: column.order - 1 }));

        await updateColumnsSet(newParamsColumn);
      }
    }
  };

  const handleClickColumnTitle = () => {
    setIsEditColumnTitle(!isEditColumnTitle);
  };

  return (
    <Draggable draggableId={_id} index={order}>
      {(provided) => (
        <Card
          className="board-column"
          sx={{ width: 240, backgroundColor: '#f4f4f4' }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {!isEditColumnTitle ? (
            <CardHeader
              className="column-title"
              disableTypography
              title={
                <Typography variant="h5" noWrap>
                  {title}
                </Typography>
              }
              onClick={handleClickColumnTitle}
            />
          ) : (
            <ColumnForm
              mode="edit"
              boardId={boardId}
              column={column}
              onClose={handleClickColumnTitle}
            />
          )}
          <Droppable droppableId={_id} type="task">
            {(provided) => (
              <CardContent
                sx={{
                  '&::-webkit-scrollbar': {
                    width: 8,
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: '#7daaec75',
                    borderRadius: 20,
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#3471879e',
                    borderRadius: 20,
                  },
                  p: '0 5px',
                  minHeight: 30,
                }}
                className="column-tasks"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks &&
                  tasks
                    .slice()
                    .filter((task) => task.columnId === _id)
                    .sort((prevTask, curTask) => prevTask.order - curTask.order)
                    .map((task) => <Task {...task} key={task._id} />)}
                {provided.placeholder}
              </CardContent>
            )}
          </Droppable>
          <CardActions className="column-actions">
            <Modal buttonText={t('add.task')} title={t('add.task')} mode="add">
              <TaskForm mode="add" boardId={boardId} columnId={_id} />
            </Modal>
            <Modal title={t('delete.column')} mode="confirm" onConfirm={handleDelete}>
              <Typography>{t('confirmation.column')}</Typography>
            </Modal>
          </CardActions>
          {error && <Toast message={(error as ErrorResponse).data.message} />}
        </Card>
      )}
    </Draggable>
  );
};

export default BoardColumn;
