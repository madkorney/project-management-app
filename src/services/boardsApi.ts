import { HttpMethodEnum, UrlEnum } from '../constants';
import { BoardParamsType, BoardsArrayType, BoardType, UserSignUpType, UserType } from 'types';
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
    updateBoardById: build.mutation<UserType, { id: string } & UserSignUpType>({
      query: ({ id, name, login, password }) => ({
        url: `${UrlEnum.USERS}/${id}`,
        method: HttpMethodEnum.PUT,
        body: { name, login, password },
      }),
    }),
    deleteBoardById: build.mutation<UserType, string>({
      query: (id) => ({
        url: `${UrlEnum.USERS}/${id}`,
        method: HttpMethodEnum.DELETE,
      }),
    }),
    getBoardsSetByIds: build.query<UserType, string>({
      query: (id) => `${UrlEnum.USERS}/${id}`,
    }),
    getBoardsSetByUserId: build.query<UserType, string>({
      query: (id) => `${UrlEnum.USERS}/${id}`,
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
