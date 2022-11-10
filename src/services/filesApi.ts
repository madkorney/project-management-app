import { HttpMethodEnum, UrlEnum } from '../constants';
import { FileType, FileListType } from 'types';
import { baseApiSlice } from './baseApi';

export const filesApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getFilesByColumnIdsOrUserIdOrTaskId: build.query<
      FileListType,
      { columnsIds: string[]; userId: string; taskId: string }
    >({
      query: ({ columnsIds, userId, taskId }) => ({
        url: UrlEnum.FILE,
        params: {
          ids: columnsIds.join(','),
          userId,
          taskId,
        },
      }),
    }),
    TODO_uploadFile: build.mutation<FileListType, { boardId: string; taskId: string; file: File }>({
      query: ({ boardId, taskId, file }) => ({
        url: UrlEnum.FILE,
        method: HttpMethodEnum.POST,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: { boardId, taskId, file },
      }),
    }),
    getFilesByBoardId: build.query<FileListType, string>({
      query: (boardId) => `${UrlEnum.FILE}/${boardId}`,
    }),
    deleteFileById: build.mutation<FileType, string>({
      query: (fileId) => `${UrlEnum.FILE}/${fileId}`,
    }),
  }),
});

export const {
  useGetFilesByColumnIdsOrUserIdOrTaskIdQuery,
  useDeleteFileByIdMutation,
  useGetFilesByBoardIdQuery,
} = filesApiSlice;
