import { useAppSelector } from 'redux/hooks';
import { useGetBoardsSetByUserIdQuery } from 'services';
import Board from './Board/board';

import './boardsPage.scss';

const BoardsPage = () => {
  const userId = useAppSelector((store) => store.auth.user.id) as string;
  const { data } = useGetBoardsSetByUserIdQuery(userId);

  return (
    <div className="boards-container">
      {data && data.map((board) => <Board {...board} key={board._id} />)}
    </div>
  );
};

export default BoardsPage;
