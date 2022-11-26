import { useDeleteTaskByIdMutation } from 'services';
import { ErrorResponse, TaskType } from 'types';

import { Modal, Toast } from 'components';
import { TaskForm } from 'components/Forms';

const Task = (task: TaskType) => {
  const [deleteTask, { error }] = useDeleteTaskByIdMutation();

  const handleDelete = async () => {
    await deleteTask({
      _id: task._id,
      columnId: task.columnId,
      boardId: task.boardId,
    });
  };

  return (
    <div className="task">
      <Modal buttonText={task.title} title="Edit task" mode="task">
        <TaskForm mode="edit" boardId={task.boardId} columnId={task.columnId} task={task} />
      </Modal>
      <Modal title="Delete task" mode="confirm" onConfirm={handleDelete}>
        <p>You want to delete this task. Are you sure?</p>
      </Modal>
      {error && <Toast message={(error as ErrorResponse).data.message} />}
    </div>
  );
};

export default Task;
