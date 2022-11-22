import { Button, Typography } from '@mui/material';
import { Modal } from 'components';
import BoardForm from 'components/Forms/boardForm';
import ColumnForm from 'components/Forms/columnForm';
import { Link, useParams } from 'react-router-dom';

import { useGetBoardByIdQuery, useGetColumnsQuery } from 'services';

import './singleBoardPage.scss';

type SingleBoardRouterPropsType = {
  boardId: string;
};

const SingleBoardPage = () => {
  const { boardId } = useParams<SingleBoardRouterPropsType>();
  const { data: boardData } = useGetBoardByIdQuery(boardId as string);
  const { data: columnsData } = useGetColumnsQuery(boardId as string);

  return (
    <section className="single-board-page">
      <div className="board-info">
        <Button variant="contained">
          <Link className="back-link" to="/boards">
            &lt; Back to boards
          </Link>
        </Button>
        <Typography variant="h4">{boardData?.title}</Typography>
        <Modal buttonText="Edit" title="Edit board">
          <BoardForm mode="edit" boardId={boardId} />
        </Modal>
      </div>
      <div className="board-container">
        {columnsData &&
          columnsData.map((column) => (
            <div className="board-column" key={column._id}>
              {column.title}
              <Modal buttonText="+ Add task" title="Add task">
                <BoardForm mode="edit" />
              </Modal>
            </div>
          ))}
        <Modal buttonText="+ Add column" title="Add column">
          <ColumnForm boardId={boardId as string} />
        </Modal>
      </div>
    </section>
  );
};

export default SingleBoardPage;
