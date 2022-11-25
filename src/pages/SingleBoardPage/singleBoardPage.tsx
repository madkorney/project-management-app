import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useAppSelector } from 'redux/hooks';
import { useGetBoardByIdQuery, useGetColumnsQuery } from 'services';

import { Button, Typography } from '@mui/material';
import { Modal } from 'components';
import BoardForm from 'components/Forms/boardForm';
import ColumnForm from 'components/Forms/columnForm';
import BoardColumn from './column';

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
        <div className="board-about">
          <Typography variant="h4">{boardData?.title}</Typography>
          <Typography>{boardData?.description}</Typography>
        </div>
        <Modal buttonText="Edit" title="Edit board" mode="edit">
          <BoardForm mode="edit" board={boardData} />
        </Modal>
      </div>
      <div className="board-container">
        <div className="board">
          {columnsData && columnsData.map((column) => <BoardColumn {...column} key={column._id} />)}
          <Modal buttonText="Add column" title="Add column" mode="add">
            <ColumnForm boardId={boardId as string} mode="add" />
          </Modal>
        </div>
      </div>
    </section>
  );
};

export default SingleBoardPage;
