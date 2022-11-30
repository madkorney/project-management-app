import { Link } from 'react-router-dom';

import { Button, Typography } from '@mui/material';
import { BoardForm } from 'components/Forms/ModalForm';
import { Modal } from 'components';

import { BoardType } from 'types';

const BoardHeader = (board: BoardType) => (
  <div className="board-header">
    <Button variant="contained">
      <Link className="back-link" to="/boards">
        &lt; Back to boards
      </Link>
    </Button>
    <div className="edit-board-info">
      <div className="board-about">
        <Typography variant="h4" noWrap>
          {board.title}
        </Typography>
        <Typography noWrap>{board.description}</Typography>
      </div>
      <Modal buttonText="Edit" title="Edit board" mode="edit">
        <BoardForm mode="edit" board={board} />
      </Modal>
    </div>
  </div>
);

export default BoardHeader;
