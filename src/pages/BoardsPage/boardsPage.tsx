import { useAppSelector } from 'redux/hooks';
import { useGetBoardsSetByUserIdQuery } from 'services';

import CardBoard from './CardBoard';

import './boardsPage.scss';

const BoardsPage = () => {
  const userId = useAppSelector((store) => store.auth.user?.id) as string;
  const { data: boards } = useGetBoardsSetByUserIdQuery(userId);

  return (
    <section className="boards-container">
      {boards && boards.map((board) => <CardBoard {...board} key={board._id} />)}
    </section>
  );
};

export default BoardsPage;
