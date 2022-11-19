import { useAppSelector } from 'redux/hooks';
import { useGetBoardsSetByUserIdQuery } from 'services';

import './boardsPage.scss';
import Board from './Board/board';

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
