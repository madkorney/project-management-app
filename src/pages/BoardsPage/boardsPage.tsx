import { useAppSelector } from 'redux/hooks';
import { useGetBoardsSetByUserIdQuery } from 'services';

import CardBoard from './CardBoard';

import './boardsPage.scss';
import { Loader } from 'components';

const BoardsPage = () => {
  const userId = useAppSelector((store) => store.auth.user?.id) as string;
  const { data: boards, isLoading } = useGetBoardsSetByUserIdQuery(userId);

  return (
    <>
      {isLoading && <Loader />}
      <section className="boards-container">
        {boards && boards.map((board) => <CardBoard {...board} key={board._id} />)}
      </section>
    </>
  );
};

export default BoardsPage;
