import { Link } from 'react-router-dom';

import { Button, Typography } from '@mui/material';
import { BoardForm } from 'components/Forms';
import { Modal } from 'components';

import { BoardType } from 'types';

const BoardHeader = (board: BoardType) => (
  <div className="board-header">
    <Button variant="contained">
      <Link className="back-link" to="/boards">
        &lt; Back to boards
      </Link>
    </Button>
    <div className="board-about">
      <Typography variant="h4">{board.title}</Typography>
      <Typography>{board.description}</Typography>
    </div>
    <Modal buttonText="Edit" title="Edit board" mode="edit">
      <BoardForm mode="edit" board={board} />
    </Modal>
  </div>
);

export default BoardHeader;
