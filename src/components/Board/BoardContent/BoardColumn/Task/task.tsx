import { useTranslation } from 'react-i18next';
import { Draggable } from 'react-beautiful-dnd';

import {
  useDeleteTaskByIdMutation,
  useLazyGetTasksQuery,
  useUpdateTasksSetMutation,
} from 'services';
import { ErrorResponse, TaskType } from 'types';

import { Modal, Toast } from 'components';
import { TaskForm } from 'components/Forms/ModalForm';
import { Typography } from '@mui/material';

const Task = (task: TaskType) => {
  const { _id, columnId, boardId, title, order } = task;
  const [deleteTask, { error }] = useDeleteTaskByIdMutation();
  const [updateTasksSet] = useUpdateTasksSetMutation();
  const [getTasks] = useLazyGetTasksQuery();
  const { t } = useTranslation();

  const handleDelete = async () => {
    await deleteTask({ _id, columnId, boardId });

    const tasks = (await getTasks({ columnId, boardId })).data;

    if (tasks) {
      if (order < tasks.length - 1) {
        const newParamsColumn = tasks
          .filter((task) => task.order > order)
          .map((task) => ({ ...task, order: task.order - 1 }));

        await updateTasksSet(newParamsColumn);
      }
    }
  };

  return (
    <Draggable draggableId={_id} index={order}>
      {(provided) => (
        <div
          className="task"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Modal buttonText={title} title={t('edit.task')} mode="task">
            <TaskForm mode="edit" boardId={boardId} columnId={columnId} task={task} />
          </Modal>
          <Modal title={t('delete.task')} mode="confirm" onConfirm={handleDelete}>
            <Typography>{t('confirmation.task')}</Typography>
          </Modal>
          {error && <Toast message={(error as ErrorResponse).data.message} />}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
