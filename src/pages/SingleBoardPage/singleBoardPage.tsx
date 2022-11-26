import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppSelector } from 'redux/hooks';
import { useGetBoardByIdQuery } from 'services';

import { BoardContent, BoardHeader } from 'components/Board';

import './singleBoardPage.scss';

type SingleBoardRouterProps = {
  boardId: string;
};

const SingleBoardPage = () => {
  const navigate = useNavigate();
  const { boardId } = useParams<SingleBoardRouterProps>();
  const { data: boardData } = useGetBoardByIdQuery(boardId as string);
  const userId = useAppSelector((state) => state.auth.user?.id) as string;

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
      {boardData && <BoardHeader {...boardData} />}
      {boardId && <BoardContent boardId={boardId} />}
    </section>
  );
};

export default SingleBoardPage;
