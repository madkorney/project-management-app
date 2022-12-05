import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button, Typography } from '@mui/material';
import { BoardForm } from 'components/Forms/ModalForm';
import { Modal } from 'components';

import { BoardType } from 'types';

const BoardHeader = (board: BoardType) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="board-header">
      <Button
        variant="contained"
        onClick={() => {
          navigate('/boards');
        }}
        sx={{ minWidth: 'fit-content' }}
      >
        &lt; {t('backLink')}
      </Button>
      <div className="edit-board-info">
        <div className="board-about">
          <Typography variant="h4" noWrap>
            {board.title}
          </Typography>
          <Typography noWrap>{board.description}</Typography>
        </div>
        <Modal buttonText={t('edit.common')} title={t('edit.board')} mode="edit">
          <BoardForm mode="edit" board={board} />
        </Modal>
      </div>
    </div>
  );
};

export default BoardHeader;
