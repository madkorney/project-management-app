import { DragDropContext, DropResult } from '@hello-pangea/dnd';

import BoardColumn from './BoardColumn';
import { Modal } from 'components';
import { ColumnForm } from 'components/Forms';

import {
  useGetColumnsQuery,
  useLazyGetTasksByBoardIdQuery,
  useUpdateTasksSetMutation,
} from 'services';
import { isEqualArrays } from 'utils';

type BoardContentProps = {
  boardId: string;
};

const BoardContent = ({ boardId }: BoardContentProps) => {
  const { data: columns } = useGetColumnsQuery(boardId);
  const [getTasksByBoardId] = useLazyGetTasksByBoardIdQuery();
  const [updateTasksSet] = useUpdateTasksSetMutation();

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const allTasks = (await getTasksByBoardId(boardId, true)).data;

    if (allTasks) {
      const startColumnTasks = allTasks
        .slice()
        .filter((task) => task.columnId === source.droppableId)
        .sort((prevTask, curTask) => prevTask.order - curTask.order);
      const endColumnTasks = allTasks
        .slice()
        .filter((task) => task.columnId === destination.droppableId)
        .sort((prevTask, curTask) => prevTask.order - curTask.order);

      if (isEqualArrays(startColumnTasks, endColumnTasks)) {
        const newTasks = startColumnTasks.slice();
        const movedElement = newTasks.splice(source.index, 1);
        newTasks.splice(destination.index, 0, ...movedElement);

        await updateTasksSet([
          ...allTasks.filter(
            (task) => !newTasks.map((val) => val.columnId).includes(task.columnId)
          ),
          ...newTasks.map((task, index) => ({ ...task, order: index })),
        ]);
        return;
      }

      const newStartTasks = startColumnTasks.slice();
      const movedElement = newStartTasks.splice(source.index, 1);

      if (endColumnTasks) {
        const newEndTasks = endColumnTasks.slice();
        newEndTasks.splice(destination.index, 0, ...movedElement);

        await updateTasksSet([
          ...allTasks.filter(
            (task) => ![source.droppableId, destination.droppableId].includes(task.columnId)
          ),
          ...newStartTasks.map((task, index) => ({ ...task, order: index })),
          ...newEndTasks.map((task, index) => ({
            ...task,
            order: index,
            columnId: destination.droppableId,
          })),
        ]);
      }
    }
  };

  return (
    <div className="board-content">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="board">
          {columns &&
            columns
              .slice()
              .sort((prevColumn, curColumn) => prevColumn.order - curColumn.order)
              .map((column) => <BoardColumn {...column} key={column._id} />)}
          <Modal buttonText="Add column" title="Add column" mode="add">
            <ColumnForm boardId={boardId} mode="add" />
          </Modal>
        </div>
      </DragDropContext>
    </div>
  );
};

export default BoardContent;
