import { baseApiSlice } from './baseApi';
import { BoardParamsType, BoardsArrayType, BoardType } from 'types';
import { REQUEST_METHODS, ENDPOINTS } from 'data/constants';

export const boardsApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getBoards: build.query<BoardsArrayType, void>({
      query: () => ENDPOINTS.BOARDS,
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Boards' as const, _id })), 'Boards']
          : ['Boards'],
    }),
    createBoard: build.mutation<BoardType, BoardParamsType>({
      query: (newParams) => ({
        url: ENDPOINTS.BOARDS,
        method: REQUEST_METHODS.POST,
        body: newParams,
      }),
      invalidatesTags: ['Boards'],
    }),
    getBoardById: build.query<BoardType, string>({
      query: (boardId) => `${ENDPOINTS.BOARDS}/${boardId}`,
      providesTags: (result, error, id) => [{ type: 'Boards', id }],
    }),
    updateBoardById: build.mutation<BoardType, BoardType>({
      query: ({ _id: boardId, ...newParams }) => ({
        url: `${ENDPOINTS.BOARDS}/${boardId}`,
        method: REQUEST_METHODS.PUT,
        body: newParams,
      }),
      invalidatesTags: ['Boards'],
    }),
    deleteBoardById: build.mutation<BoardType, string>({
      query: (boardId) => ({
        url: `${ENDPOINTS.BOARDS}/${boardId}`,
        method: REQUEST_METHODS.DELETE,
      }),
      invalidatesTags: ['Boards'],
    }),
    getBoardsSetByIds: build.query<BoardsArrayType, string[]>({
      query: (ids) => ({
        url: ENDPOINTS.BOARDSSET,
        params: { ids: ids.join(',') },
      }),
    }),
    getBoardsSetByUserId: build.query<BoardsArrayType, string>({
      query: (userId) => `${ENDPOINTS.BOARDSSET}/${userId}`,
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Boards' as const, _id })), 'Boards']
          : ['Boards'],
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
