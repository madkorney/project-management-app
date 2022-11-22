import { Button, Typography } from '@mui/material';
import { Modal } from 'components';
import BoardForm from 'components/Forms/boardForm';
import ColumnForm from 'components/Forms/columnForm';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';

import { useGetBoardByIdQuery, useGetColumnsQuery } from 'services';

import './singleBoardPage.scss';

type SingleBoardRouterPropsType = {
  boardId: string;
};

const SingleBoardPage = () => {
  const navigate = useNavigate();
  const { boardId } = useParams<SingleBoardRouterPropsType>();
  const { data: boardData } = useGetBoardByIdQuery(boardId as string);
  const { data: columnsData } = useGetColumnsQuery(boardId as string);
  const userId = useAppSelector((state) => state.auth.user.id) as string;

  useEffect(() => {
    if (boardData) {
      const assignedUsers = [boardData?.owner as string, ...(boardData?.users as string[])];

      if (!assignedUsers.includes(userId)) {
        navigate('/boards', { replace: true });
      }
    }
  });

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
