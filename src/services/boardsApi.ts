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
      query: ({ boardId, ...newParams }) => ({
        url: `${UrlEnum.BOARDS}/${boardId}`,
        method: HttpMethodEnum.PUT,
        body: newParams,
      }),
    }),
    deleteBoardById: build.mutation<BoardType, string>({
      query: (boardId) => ({
        url: `${UrlEnum.BOARDS}/${boardId}`,
        method: HttpMethodEnum.DELETE,
      }),
    }),
    getBoardsSetByIds: build.query<BoardsArrayType, string[]>({
      query: (ids) => ({
        url: UrlEnum.BOARDSSET,
        params: { ids: ids.join(',') },
      }),
    }),
    getBoardsSetByUserId: build.query<BoardsArrayType, string>({
      query: (userId) => `${UrlEnum.BOARDSSET}/${userId}`,
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
