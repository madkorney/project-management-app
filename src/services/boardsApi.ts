import { HttpMethodEnum, UrlEnum } from '../constants';
import { BoardParamsType, BoardsArrayType, BoardType } from 'types';
import { baseApiSlice } from './baseApi';

export const boardsApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getBoards: build.query<BoardsArrayType, unknown>({
      query: () => UrlEnum.BOARDS,
    }),
    addBoard: build.mutation<BoardType, BoardParamsType>({
      query: (newParams) => ({
        url: UrlEnum.BOARDS,
        method: HttpMethodEnum.POST,
        body: newParams,
      }),
    }),
    getBoardById: build.query<BoardType, string>({
      query: (boardId) => `${UrlEnum.BOARDS}/${boardId}`,
    }),
    updateBoardById: build.mutation<BoardType, { boardId: string } & BoardParamsType>({
      query: ({ boardId, title, owner, users }) => ({
        url: `${UrlEnum.BOARDS}/${boardId}`,
        method: HttpMethodEnum.PUT,
        body: { title, owner, users },
      }),
    }),
    deleteBoardById: build.mutation<BoardType, string>({
      query: (boardId) => ({
        url: `${UrlEnum.BOARDS}/${boardId}`,
        method: HttpMethodEnum.DELETE,
      }),
    }),
    getBoardsSetByIds: build.query<BoardType, string[]>({
      query: (ids) => ({
        url: UrlEnum.BOARDS,
        params: { ids: ids.join(',') },
      }),
    }),
    getBoardsSetByUserId: build.query<BoardType, string>({
      query: (userId) => `${UrlEnum.BOARDS}/${userId}`,
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useAddBoardMutation,
  useGetBoardByIdQuery,
  useUpdateBoardByIdMutation,
  useDeleteBoardByIdMutation,
  useGetBoardsSetByIdsQuery,
  useGetBoardsSetByUserIdQuery,
} = boardsApiSlice;
