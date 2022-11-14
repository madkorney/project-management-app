import { REQUEST_METHODS, ENDPOINTS } from '../constants';
import { BoardParamsType, BoardsArrayType, BoardType } from 'types';
import { baseApiSlice } from './baseApi';

export const boardsApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getBoards: build.query<BoardsArrayType, void>({
      query: () => ENDPOINTS.BOARDS,
    }),
    createBoard: build.mutation<BoardType, BoardParamsType>({
      query: (newParams) => ({
        url: ENDPOINTS.BOARDS,
        method: REQUEST_METHODS.POST,
        body: newParams,
      }),
    }),
    getBoardById: build.query<BoardType, string>({
      query: (boardId) => `${ENDPOINTS.BOARDS}/${boardId}`,
    }),
    updateBoardById: build.mutation<BoardType, BoardType>({
      query: ({ _id: boardId, ...newParams }) => ({
        url: `${ENDPOINTS.BOARDS}/${boardId}`,
        method: REQUEST_METHODS.PUT,
        body: newParams,
      }),
    }),
    deleteBoardById: build.mutation<BoardType, string>({
      query: (boardId) => ({
        url: `${ENDPOINTS.BOARDS}/${boardId}`,
        method: REQUEST_METHODS.DELETE,
      }),
    }),
    getBoardsSetByIds: build.query<BoardsArrayType, string[]>({
      query: (ids) => ({
        url: ENDPOINTS.BOARDSSET,
        params: { ids: ids.join(',') },
      }),
    }),
    getBoardsSetByUserId: build.query<BoardsArrayType, string>({
      query: (userId) => `${ENDPOINTS.BOARDSSET}/${userId}`,
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useCreateBoardMutation,
  useGetBoardByIdQuery,
  useUpdateBoardByIdMutation,
  useDeleteBoardByIdMutation,
  useGetBoardsSetByIdsQuery,
  useGetBoardsSetByUserIdQuery,
} = boardsApiSlice;
