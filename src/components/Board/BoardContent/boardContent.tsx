import { DragDropContext, DropResult } from '@hello-pangea/dnd';

import BoardColumn from './BoardColumn';
import { Modal } from 'components';
import { ColumnForm } from 'components/Forms';

import { useGetColumnsQuery, useLazyGetTasksQuery, useUpdateTasksSetMutation } from 'services';

type BoardContentProps = {
  boardId: string;
};

const BoardContent = ({ boardId }: BoardContentProps) => {
  const { data: columns } = useGetColumnsQuery(boardId);
  const [getTasks] = useLazyGetTasksQuery();
  const [updateTasksSet] = useUpdateTasksSetMutation();

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const startColumnTasks = (await getTasks({ columnId: source.droppableId, boardId }, true)).data;
    const endColumnTasks = (await getTasks({ columnId: destination.droppableId, boardId }, true))
      .data;

    if (startColumnTasks) {
      if (startColumnTasks === endColumnTasks) {
        const newTasks = startColumnTasks.slice();

        newTasks.splice(source.index, 1);
        newTasks.splice(
          destination.index,
          0,
          ...startColumnTasks.filter((task) => task._id === draggableId)
        );

        await updateTasksSet(newTasks.map((task, index) => ({ ...task, order: index })));
        return;
      }

      const newStartTasks = startColumnTasks.slice();
      newStartTasks.splice(source.index, 1);
      console.log(newStartTasks);

      if (endColumnTasks) {
        const newEndTasks = endColumnTasks.slice();
        newEndTasks.splice(
          destination.index,
          0,
          ...startColumnTasks.filter((task) => task._id === draggableId)
        );
        console.log(newEndTasks);

        updateTasksSet([
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
