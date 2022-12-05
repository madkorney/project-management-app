import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  useDeleteBoardByIdMutation,
  useDeleteColumnByIdMutation,
  useDeleteTaskByIdMutation,
  useGetColumnsQuery,
  useGetTasksByBoardIdQuery,
} from 'services';
import { BoardType } from 'types';

import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Modal } from 'components';
import { useState } from 'react';

const CardBoard = (board: BoardType) => {
  const [skip, setSkip] = useState(true);
  const { t } = useTranslation();
  const [deleteBoardById] = useDeleteBoardByIdMutation();
  const [deleteColumnById] = useDeleteColumnByIdMutation();
  const [deleteTaskById] = useDeleteTaskByIdMutation();
  const { data: columns } = useGetColumnsQuery(board._id, { skip });
  const { data: tasks } = useGetTasksByBoardIdQuery(board._id, { skip });
  const navigate = useNavigate();

  const handleDelete = async () => {
    setSkip(false);

    tasks &&
      Promise.all(
        tasks.map(async ({ _id, columnId, boardId }) => {
          await deleteTaskById({ _id, columnId, boardId });
        })
      );

    columns &&
      Promise.all(
        columns.map(async ({ _id, boardId }) => {
          await deleteColumnById({ _id, boardId });
        })
      );

    await deleteBoardById(board._id);
  };

  return (
    <Card className="board-card" sx={{ width: 240, height: 184, backgroundColor: '#b4b4b4' }}>
      <CardContent sx={{ paddingBottom: 1 }}>
        <Typography variant="h5" noWrap>
          {board.title}
        </Typography>
        <Typography
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
          }}
        >
          {board.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, paddingTop: 1 }}>
        <Button
          size="medium"
          variant="contained"
          sx={{ marginRight: 'auto' }}
          aria-label={t('delete.board')}
          onClick={() => {
            navigate(`${board._id}`);
          }}
        >
          {t('open')}
        </Button>
        <Modal
          buttonText={t('delete.common')}
          title={t('delete.board')}
          mode="confirm"
          onConfirm={handleDelete}
        >
          <Typography>{t('confirmation.board')}</Typography>
        </Modal>
      </CardActions>
    </Card>
  );
};

export default CardBoard;
