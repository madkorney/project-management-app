import { DragDropContext, DropResult } from '@hello-pangea/dnd';

import BoardColumn from './BoardColumn';
import { Modal } from 'components';
import { ColumnForm } from 'components/Forms';

import { useGetColumnsQuery } from 'services';

type BoardContentProps = {
  boardId: string;
};

const BoardContent = ({ boardId }: BoardContentProps) => {
  const { data: columns } = useGetColumnsQuery(boardId);

  const handleDragEnd = (result: DropResult) => {
    // TODO: handle onDragEnd with columns
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
