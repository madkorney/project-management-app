import { REQUEST_METHODS, ENDPOINTS } from '../constants';
import { FileType, FileListType } from 'types';
import { baseApiSlice } from './baseApi';

export const filesApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getFilesByColumnIdsOrUserIdOrTaskId: build.query<
      FileListType,
      { columnsIds: string[]; userId: string; taskId: string }
    >({
      query: ({ columnsIds, userId, taskId }) => ({
        url: ENDPOINTS.FILE,
        params: {
          ids: columnsIds.join(','),
          userId,
          taskId,
        },
      }),
    }),
    TODO_uploadFile: build.mutation<FileListType, { boardId: string; taskId: string; file: File }>({
      query: ({ boardId, taskId, file }) => ({
        url: ENDPOINTS.FILE,
        method: REQUEST_METHODS.POST,
        body: { boardId, taskId, file },
      }),
    }),
    getFilesByBoardId: build.query<FileListType, string>({
      query: (boardId) => `${ENDPOINTS.FILE}/${boardId}`,
    }),
    deleteFileById: build.mutation<FileType, string>({
      query: (fileId) => `${ENDPOINTS.FILE}/${fileId}`,
    }),
  }),
});

export const {
  useGetFilesByColumnIdsOrUserIdOrTaskIdQuery,
  useDeleteFileByIdMutation,
  useGetFilesByBoardIdQuery,
} = filesApiSlice;
