import { useAppSelector } from 'redux/hooks';
import { useGetBoardsSetByUserIdQuery } from 'services';

import CardBoard from './CardBoard';

import './boardsPage.scss';

const BoardsPage = () => {
  const userId = useAppSelector((store) => store.auth.user.id) as string;
  const { data } = useGetBoardsSetByUserIdQuery(userId);

  return (
    <div className="boards-container">
      {data && data.map((board) => <CardBoard {...board} key={board._id} />)}
    </div>
  );
};

export default BoardsPage;
