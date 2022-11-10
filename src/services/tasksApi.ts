import { HttpMethodEnum, UrlEnum } from '../constants';
import {
  TaskType,
  TaskCreateParamsType,
  TaskUpdateParamsType,
  TasksSetType,
  TasksSetParamsType,
} from 'types';
import { baseApiSlice } from './baseApi';

export const tasksApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<TasksSetType, { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) =>
        `${UrlEnum.BOARDS}/${boardId}/${UrlEnum.COLUMNS}/${columnId}/${UrlEnum.TASKS}`,
    }),
    addTask: build.mutation<TaskType, { boardId: string; columnId: string } & TaskCreateParamsType>(
      {
        query: ({ boardId, columnId, ...newParams }) => ({
          url: `${UrlEnum.BOARDS}/${boardId}/${UrlEnum.COLUMNS}/${columnId}/${UrlEnum.TASKS}`,
          method: HttpMethodEnum.POST,
          body: newParams,
        }),
      }
    ),
    getTaskById: build.query<TaskType, { boardId: string; columnId: string; taskId: string }>({
      query: ({ boardId, columnId, taskId }) =>
        `${UrlEnum.BOARDS}/${boardId}/${UrlEnum.COLUMNS}/${columnId}/${UrlEnum.TASKS}/${taskId}`,
    }),
    updateTaskById: build.mutation<
      TaskType,
      { boardId: string; taskId: string } & TaskUpdateParamsType
    >({
      query: ({ boardId, columnId, taskId, ...newParams }) => ({
        url: `${UrlEnum.BOARDS}/${boardId}/${UrlEnum.COLUMNS}/${columnId}/${UrlEnum.TASKS}/${taskId}`,
        method: HttpMethodEnum.PUT,
        body: { columnId, ...newParams },
      }),
    }),
    deleteTaskById: build.mutation<TaskType, { boardId: string; columnId: string; taskId: string }>(
      {
        query: ({ boardId, columnId, taskId }) => ({
          url: `${UrlEnum.BOARDS}/${boardId}/${UrlEnum.COLUMNS}/${columnId}/${UrlEnum.TASKS}/${taskId}`,
          method: HttpMethodEnum.DELETE,
        }),
      }
    ),
    getTasksSetByIdsOrUserIdOrSearch: build.query<
      TasksSetType,
      { tasksIds: string[]; userId: string; search: string }
    >({
      query: ({ tasksIds, userId, search }) => ({
        url: UrlEnum.TASKSSET,
        params: {
          ids: tasksIds.join(','),
          userId,
          search,
        },
      }),
    }),
    updateTasksSet: build.mutation<TasksSetType, TasksSetParamsType>({
      query: (newParams) => ({
        url: UrlEnum.TASKSSET,
        method: HttpMethodEnum.PATCH,
        body: newParams,
      }),
    }),
    getTasksByBoardId: build.query<TasksSetType, string>({
      query: (boardId) => `${UrlEnum.TASKSSET}/${boardId}`,
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useGetTaskByIdQuery,
  useUpdateTaskByIdMutation,
  useDeleteTaskByIdMutation,
  useGetTasksSetByIdsOrUserIdOrSearchQuery,
  useUpdateTasksSetMutation,
  useGetTasksByBoardIdQuery,
} = tasksApiSlice;
