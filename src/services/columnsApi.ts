import { HttpMethodEnum, UrlEnum } from '../constants';
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
      query: (boardId) => `${UrlEnum.BOARDS}/${boardId}/${UrlEnum.COLUMNS}`,
    }),
    addColumn: build.mutation<ColumnType, { boardId: string } & ColumnUpdateParamsType>({
      query: ({ boardId, ...newParams }) => ({
        url: `${UrlEnum.BOARDS}/${boardId}/${UrlEnum.COLUMNS}`,
        method: HttpMethodEnum.POST,
        body: newParams,
      }),
    }),
    getColumnById: build.query<ColumnType, { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) =>
        `${UrlEnum.BOARDS}/${boardId}/${UrlEnum.COLUMNS}/${columnId}`,
    }),
    updateColumnById: build.mutation<
      ColumnType,
      { boardId: string; columnId: string } & ColumnUpdateParamsType
    >({
      query: ({ boardId, columnId, ...newParams }) => ({
        url: `${UrlEnum.BOARDS}/${boardId}/${UrlEnum.COLUMNS}/${columnId}`,
        method: HttpMethodEnum.PUT,
        body: newParams,
      }),
    }),
    deleteColumnById: build.mutation<ColumnType, { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => ({
        url: `${UrlEnum.BOARDS}/${boardId}/${UrlEnum.COLUMNS}/${columnId}`,
        method: HttpMethodEnum.DELETE,
      }),
    }),
    getColumnsSetByIdsOrUserId: build.query<
      ColumnsArrayType,
      { columnsIds: string[]; userId: string }
    >({
      query: ({ columnsIds, userId }) => ({
        url: UrlEnum.COLUMNSSET,
        params: {
          ids: columnsIds.join(','),
          userId,
        },
      }),
    }),
    updateColumnsSet: build.mutation<ColumnsArrayType, ColumnsSetUpdateParamsType>({
      query: (newParams) => ({
        url: UrlEnum.COLUMNSSET,
        method: HttpMethodEnum.PATCH,
        body: newParams,
      }),
    }),
    addColumnsSet: build.mutation<ColumnsArrayType, ColumnsSetCreateParamsType>({
      query: (newParams) => ({
        url: UrlEnum.COLUMNSSET,
        method: HttpMethodEnum.POST,
        body: newParams,
      }),
    }),
  }),
});

export const {
  useGetColumnsQuery,
  useAddColumnMutation,
  useGetColumnByIdQuery,
  useUpdateColumnByIdMutation,
  useDeleteColumnByIdMutation,
  useGetColumnsSetByIdsOrUserIdQuery,
  useUpdateColumnsSetMutation,
  useAddColumnsSetMutation,
} = columnsApiSlice;
