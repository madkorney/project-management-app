import { REQUEST_METHODS, ENDPOINTS } from '../constants';
import {
  ColumnType,
  ColumnsArrayType,
  ColumnUpdateParamsType,
  ColumnsSetUpdateParamsType,
  ColumnsSetCreateParamsType,
} from 'types';
import { baseApiSlice } from './baseApi';

export const columnsApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getColumns: build.query<ColumnsArrayType, string>({
      query: (boardId) => `${ENDPOINTS.BOARDS}/${boardId}/${ENDPOINTS.COLUMNS}`,
    }),
    createColumn: build.mutation<ColumnType, { boardId: string } & ColumnUpdateParamsType>({
      query: ({ boardId, ...newParams }) => ({
        url: `${ENDPOINTS.BOARDS}/${boardId}/${ENDPOINTS.COLUMNS}`,
        method: REQUEST_METHODS.POST,
        body: newParams,
      }),
    }),
    getColumnById: build.query<ColumnType, { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) =>
        `${ENDPOINTS.BOARDS}/${boardId}/${ENDPOINTS.COLUMNS}/${columnId}`,
    }),
    updateColumnById: build.mutation<
      ColumnType,
      { boardId: string; columnId: string } & ColumnUpdateParamsType
    >({
      query: ({ boardId, columnId, ...newParams }) => ({
        url: `${ENDPOINTS.BOARDS}/${boardId}/${ENDPOINTS.COLUMNS}/${columnId}`,
        method: REQUEST_METHODS.PUT,
        body: newParams,
      }),
    }),
    deleteColumnById: build.mutation<ColumnType, { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => ({
        url: `${ENDPOINTS.BOARDS}/${boardId}/${ENDPOINTS.COLUMNS}/${columnId}`,
        method: REQUEST_METHODS.DELETE,
      }),
    }),
    getColumnsSetByIdsOrUserId: build.query<
      ColumnsArrayType,
      { columnsIds: string[]; userId: string }
    >({
      query: ({ columnsIds, userId }) => ({
        url: ENDPOINTS.COLUMNSSET,
        params: {
          ids: columnsIds.join(','),
          userId,
        },
      }),
    }),
    updateColumnsSet: build.mutation<ColumnsArrayType, ColumnsSetUpdateParamsType>({
      query: (newParams) => ({
        url: ENDPOINTS.COLUMNSSET,
        method: REQUEST_METHODS.PATCH,
        body: newParams,
      }),
    }),
    createColumnsSet: build.mutation<ColumnsArrayType, ColumnsSetCreateParamsType>({
      query: (newParams) => ({
        url: ENDPOINTS.COLUMNSSET,
        method: REQUEST_METHODS.POST,
        body: newParams,
      }),
    }),
  }),
});

export const {
  useGetColumnsQuery,
  useCreateColumnMutation,
  useGetColumnByIdQuery,
  useUpdateColumnByIdMutation,
  useDeleteColumnByIdMutation,
  useGetColumnsSetByIdsOrUserIdQuery,
  useUpdateColumnsSetMutation,
  useCreateColumnsSetMutation,
} = columnsApiSlice;
