import { Draggable } from '@hello-pangea/dnd';

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
          <Modal buttonText={title} title="Edit task" mode="task">
            <TaskForm mode="edit" boardId={boardId} columnId={columnId} task={task} />
          </Modal>
          <Modal title="Delete task" mode="confirm" onConfirm={handleDelete}>
            <Typography>You want to delete this task. Are you sure?</Typography>
          </Modal>
          {error && <Toast message={(error as ErrorResponse).data.message} />}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
