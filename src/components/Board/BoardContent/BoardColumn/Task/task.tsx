import {
  useDeleteTaskByIdMutation,
  useLazyGetTasksQuery,
  useUpdateTasksSetMutation,
} from 'services';
import { ErrorResponse, TaskType } from 'types';

import { Modal, Toast } from 'components';
import { TaskForm } from 'components/Forms';

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
          .map((task) => ({ _id: task._id, order: task.order - 1, columnId }));

        await updateTasksSet(newParamsColumn);
      }
    }
  };

  return (
    <div className="task">
      <Modal buttonText={title} title="Edit task" mode="task">
        <TaskForm mode="edit" boardId={boardId} columnId={columnId} task={task} />
      </Modal>
      <Modal title="Delete task" mode="confirm" onConfirm={handleDelete}>
        <p>You want to delete this task. Are you sure?</p>
      </Modal>
      {error && <Toast message={(error as ErrorResponse).data.message} />}
    </div>
  );
};

export default Task;
