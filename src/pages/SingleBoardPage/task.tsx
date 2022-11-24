import { Modal } from 'components';
import TaskForm from 'components/Forms/taskForm';
import { TaskType } from 'types';

const Task = (task: TaskType) => {
  const handleDelete = async () => {
    console.log('yes?');
  };

  return (
    <div className="task">
      <Modal buttonText={task.title} title="Edit task">
        <TaskForm mode="edit" boardId={task.boardId} columnId={task.columnId} task={task} />
      </Modal>
      <Modal title="Delete task" mode="confirm" onConfirm={handleDelete}>
        <p>You want to delete this task. Are you sure?</p>
      </Modal>
    </div>
  );
};

export default Task;
