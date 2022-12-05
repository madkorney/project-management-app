import { useTranslation } from 'react-i18next';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import BoardColumn from './BoardColumn';
import { Loader, Modal } from 'components';
import { ColumnForm } from 'components/Forms/ModalForm';

import {
  useGetColumnsQuery,
  useLazyGetTasksByBoardIdQuery,
  useUpdateColumnsSetMutation,
  useUpdateTasksSetMutation,
} from 'services';
import { isEqualArrays } from 'utils';

type BoardContentProps = {
  boardId: string;
};

const BoardContent = ({ boardId }: BoardContentProps) => {
  const { t } = useTranslation();
  const { data: columns, isLoading } = useGetColumnsQuery(boardId);
  const [getTasksByBoardId] = useLazyGetTasksByBoardIdQuery();
  const [updateTasksSet] = useUpdateTasksSetMutation();
  const [updateColumnsSet] = useUpdateColumnsSetMutation();

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'column') {
      if (columns) {
        const newColumns = columns.slice();
        const movedColumn = newColumns.splice(source.index, 1);
        newColumns.splice(destination.index, 0, ...movedColumn);

        await updateColumnsSet(newColumns.map((column, index) => ({ ...column, order: index })));
        return;
      }
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
        const movedTask = newTasks.splice(source.index, 1);
        newTasks.splice(destination.index, 0, ...movedTask);

        await updateTasksSet([
          ...allTasks.filter(
            (task) => !newTasks.map((val) => val.columnId).includes(task.columnId)
          ),
          ...newTasks.map((task, index) => ({ ...task, order: index })),
        ]);
        return;
      }

      const newStartTasks = startColumnTasks.slice();
      const movedTask = newStartTasks.splice(source.index, 1);

      if (endColumnTasks) {
        const newEndTasks = endColumnTasks.slice();
        newEndTasks.splice(destination.index, 0, ...movedTask);

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
    <>
      <Modal buttonText={t('add.column')} title={t('add.column')} mode="add">
        <ColumnForm boardId={boardId} mode="add" />
      </Modal>
      <div className="board-content">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId={boardId} direction="horizontal" type="column">
            {(provided) => (
              <div className="board" ref={provided.innerRef} {...provided.droppableProps}>
                {isLoading && (
                  <div style={{ margin: '0 auto' }}>
                    <Loader />
                  </div>
                )}
                {columns && columns.map((column) => <BoardColumn {...column} key={column._id} />)}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default BoardContent;
